#Django class
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render

#custom Database, Serializer Permission and Utilities class
from arc_app.models import UserProfile, Contract, Session, ContractMeeting, Subject
from arc_app.serializers import UserSerializer, UserProfileSerializer, ContractSerializer
from arc_app.serializers import SessionSerializer, ContractMeetingSerializer, SubjectSerializer
from arc_app.permissions import IsTutorOrIsAdminAndHeadTutorReadOnly
from arc_app.utils import create_userprofile, check_for_key, setup_query, encode_val, decode_val
#Rest framework class
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action, authentication_classes, permission_classes, api_view
from rest_framework.response import Response
from rest_framework import viewsets


class UserProfileViewSet(viewsets.ModelViewSet):
	#This viewset automatically provides 'list', 'create', 'retrieve',
	#'update', and 'destroy' actions
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer
	#Basic permission, allows  all permission if authenticated otherwise
	#user can only have 'read' operation
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		create_userprofile(user)
		if user.userprofiles.is_admin:
			userprofiles = UserProfile.objects.all()
			query = setup_query(self.request.query_params, ['first_name', 'last_name', 'email', 'is_tutor'])
			if query is not None:
				userprofiles = userprofiles.filter(query)
			return userprofiles
		else:
			return UserProfile.objects.filter(user=user)

	#get sessions only show the sessions that belongs to the contracts that
	#the user is a tutor of
	@action(methods=['get'], detail=True)
	def get_sessions(self, request, pk=None):
		userprofile = UserProfile.objects.get(pk=pk)
		#if the user is staff return nothing
		if (userprofile.is_tutor or userprofile.is_headtutor):
			#get the contracts of this tutor
			contracts = userprofile.tutor_contracts.all()

			query = Q(id = -1)
			for contract in contracts:
				for session in contract.sessions.all():
					query |= Q(id= session.id)

			sessions = Session.objects.filter(query)

			#filter date by lte: less than or equal, gte: greater than or equal
			#lt: less than, gt: greater than
			operators = ['lte', 'lt', 'gte', 'gt']
			for operator in operators:
				date = self.request.query_params.get('date[{}]'.format(operator), None)
				if date is not None:
					sessions = sessions.filter(**{'date__{}'.format(operator):date})

			return Response(SessionSerializer(sessions, many=True, context={'request': request}).data)

	#get contracts only show the contracts that the user is a tutor of
	@action(methods=['get'], detail=True)
	def get_contracts(self, request, pk=None):
		userprofile = UserProfile.objects.get(pk=pk)
		#if the user is staff return nothing
		if (userprofile.is_tutor or userprofile.is_headtutor):
			#get the contracts of this tuktor
			contracts = userprofile.tutor_contracts.all()
			return Response(ContractSerializer(contracts, many=True, context={'request': request}).data)

	@action(methods=['get'], detail=False)
	def get_current_userprofile(self, request):
		user = self.request.user
		create_userprofile(user)
		return Response(UserProfileSerializer(user.userprofiles, context={'request':request}).data)

	@action(methods=['get'], detail=False)
	def current_position(self, request):
		user = self.request.user
		create_userprofile(user)
		position = []
		if (user.userprofiles.is_tutee):
			position.append('tutee')
		if (user.userprofiles.is_tutor):
			position.append('tutor')
		if (user.userprofiles.is_headtutor):
			position.append('headtutor')
		if (user.userprofiles.is_admin):
			position.append('admin')
		return Response(position)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
	#This viewset automatically provide 'list' and 'detail' action
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		create_userprofile(user)
		if user.userprofiles.is_admin:
			#get the params from url and filter it with
			#the users objects
			users = self.queryset
			query = setup_query(self.request.query_params, ['first_name', 'last_name', 'email'])
			if query is not None:
				users = users.filter(query)
			return users
		else:
			return User.objects.filter(username=user.username)


#/contracts/
class ContractViewSet(viewsets.ModelViewSet):
	#This viewset automatically provides 'list', 'create', 'retrieve',
	#'update', and 'destroy' actions
	queryset = Contract.objects.all()
	serializer_class = ContractSerializer
	permission_classes = [IsAuthenticated, IsTutorOrIsAdminAndHeadTutorReadOnly]

	def destroy(self, request, pk=None):
		super().destroy(request, pk)
		return Response({'status': 200, 'id': pk})

	def create(self, request):
		key_list = ['tutor_email', 'tutee_first_name', 'tutee_last_name', 'tutee_email', \
					'tutee_phone', 'tutee_dnumber', 'class_name', 'professor_name', 'subject']
		check_for_key(request.data, key_list)

		try:
			tutor = UserProfile.objects.get(email=request.data['tutor_email'])
			#TODO: check to see if the tutor is the user sending
			#the request and if he is a tutor
			try:
				tutee = UserProfile.objects.get(email=request.data['tutee_email'])
			except:
				#incase there is not tutee with this name in the database
				tutee = UserProfile(first_name=request.data['tutee_first_name'],
									last_name=request.data['tutee_last_name'],
									email=request.data['tutee_email'],
									phone=request.data['tutee_phone'],
									d_number=request.data['tutee_dnumber'],
									is_tutee=True)
				tutee.save()
		except Exception as e:
			return Response("Your information about tutor or tutee is not correct, check the parameter again")
		subject = Subject.objects.get(subject_name=request.data['subject'])
		contract = Contract(tutor=tutor, tutee=tutee,
							class_name=request.data['class_name'],
							subject=subject,
							professor_name=request.data['professor_name'])
		contract.save()
		contract_serializer = ContractSerializer(contract, many=False, context={'request':request})
		return Response(contract_serializer.data)

	#query contract based on the tutor of the contract and
	#any parameter that is added onto the url
	def get_queryset(self):
		user = self.request.user
		create_userprofile(user)
		userprofile = user.userprofiles

		if userprofile.is_admin:
			contracts = self.queryset
		elif userprofile.is_tutor or userprofile.is_headtutor:
			position = self.request.query_params.get('position', None)
			#query the contracts based on the user loging in
			#show the contracts belong to tutor if 'position' is None or is 'tutor'
			#show all contracts if position is 'headtutor'
			if (userprofile.is_tutor and (position is None or position == 'tutor')):
				contracts = userprofile.tutor_contracts.all()
			elif userprofile.is_headtutor and position == 'headtutor':
				#only get the contracts from department of the headtutor
				contracts = self.queryset
				subjects = userprofile.subjects.all()

				query = Q(subject= -1)
				for subject in subjects:
					query |= Q(subject = subject)

				contracts = contracts.filter(query)


		#get all the params from the url
		subject = self.request.query_params.get('subject', None)
		tutee_email = self.request.query_params.get('tutee_email', None)

		#if the params is not Null, query it
		if subject is not None:
			subject = Subject.objects.get(subject_name=subject)
			contracts = contracts.filter(subject = subject)
		if tutee_email is not None:
			tutee = UserProfile.objects.get(email=tutee_email)
			contracts = contracts.filter(tutee = tutee)

		query = setup_query(self.request.query_params, ['class_name', 'professor_name'])
		if query is not None :
			contracts = contracts.filter(query)
		return contracts

	def update(self, request, pk=None):
		key_list = ['tutee_first_name', 'tutee_last_name', 'tutee_email', \
					'tutee_phone', 'tutee_dnumber', 'class_name', 'professor_name', 'subject']
		check_for_key(request.data, key_list)

		contract = Contract.objects.get(pk=pk);
		contract.tutee.first_name = request.data['tutee_first_name']
		contract.tutee.last_name = request.data['tutee_last_name']
		contract.tutee.email = request.data['tutee_email']
		contract.tutee.phone = request.data['tutee_phone']
		contract.tutee.d_number = request.data['tutee_dnumber']
		contract.class_name = request.data['class_name']
		contract.professor_name = request.data['professor_name']

		newSubject = Subject.objects.get(subject_name=request.data['subject'])
		contract.subject = newSubject

		contract.save()
		contract.tutee.save()

		return Response(ContractSerializer(contract, context={ 'request': request }).data)

	#Return all the sessions of the current contract
	#/contracts/<pk>/get_sesions/
	@action(methods=['get'], detail=True)
	def get_sessions(self, request, pk=None):
		#get the contract and the sessions that belong to this contract
		contract = self.get_object()
		serializer = ContractSerializer(contract, many=False, context={'request':request})
		sessions = serializer.data['sessions']
		sessions_all = Session.objects.all()

		#query the sessions based on the id
		query = Q(id = sessions[0]['id'])
		for i in range (1, len(sessions)):
			session_id = sessions[i]['id']
			query.add(Q(id=session_id), Q.OR)

		#return the query of the sessions
		contract_sessions = sessions_all.filter(query)
		contract_sessions_serializer = SessionSerializer(contract_sessions, many=True , context={'request':request})

		return Response(contract_sessions_serializer.data)

	#Return all the contracts meetings of the current contract
	@action(methods=['get'], detail=True)
	def get_contractmeetings(self, request, pk=None):
		#get the contract and the contract meetings belong to this contract
		contract = self.get_object()
		serializer = ContractSerializer(contract, many=False, context={'request':request})
		cmeetings = serializer.data['contract_meetings']
		cmeetings_all = ContractMeeting.objects.all()

		#query the contract meetings based on the id
		query = Q(id = cmeetings[0]['id'])
		for i in range (1, len(cmeetings)):
			session_id = cmeetings[i]['id']
			query.add(Q(id=session_id), Q.OR)

		#return the query of the contract meetings
		contract_cmeetings = cmeetings_all.filter(query)
		contract_cmeetings_serializer = ContractMeetingSerializer(contract_cmeetings, many=True , context={'request':request})

		return Response(contract_cmeetings_serializer.data)

#/contractmeetings/
class ContractMeetingViewSet(viewsets.ModelViewSet):
	queryset = ContractMeeting.objects.all()
	serializer_class = ContractMeetingSerializer
	permission_classes = [IsAuthenticated, IsTutorOrIsAdminAndHeadTutorReadOnly]

	def create(self, request):
		#Get all the required parameters for the POST request
		#contract_id, date, start, end, location
		key_list = ['contract_id', 'week_day', 'start', 'end', 'location']
		check_for_key(request.data, key_list)
		#get the contract that this meeting is associated to
		try:
			contract = Contract.objects.get(pk=request.data['contract_id'])
		except:
			return Response('You dont have contract with this id')

		#create a new contract and save to the database
		contract_meeting = ContractMeeting(contract=contract,
											date=request.data['week_day'],
											start=request.data['start'],
											end=request.data['end'],
											location=request.data['location'])
		contract_meeting.save()
		return Response(ContractMeetingSerializer(contract_meeting, context={'request': request}).data)

	#filter contract meeting based on the user
	def get_queryset(self):
		user = self.request.user
		create_userprofile(user)
		userprofile = user.userprofiles
		if userprofile.is_admin:
			contracts = Contract.objects.all()
		elif userprofile.is_tutor or userprofile.is_headtutor:
			position = self.request.query_params.get('position', None)
			if (userprofile.is_tutor and (position is None or position == 'tutor')):
				contracts = userprofile.tutor_contracts.all()
			elif (userprofile.is_headtutor and position == 'headtutor'):
				#only get the contracts from department of the headtutor
				contracts = Contract.objects.all()
				subjects = userprofile.subjects.all()

				query = Q(subject= -1)
				for subject in subjects:
					query |= Q(subject = subject)

				contracts = contracts.filter(query)
		#get all contracts if the user request as a headtutor
		# otherwise get only the owned contracts if the user request as a tutor
		contract_meetings = [cmeeting for contract in contracts for cmeeting in contract.contract_meetings.all()]

		location = self.request.query_params.get('location', None)
		query = Q(id = -1)
		for cmeeting in contract_meetings:
			query |= Q(id = cmeeting.id)

		if location is not None:
			query |= Q(location = location)
		return ContractMeeting.objects.filter(query)



#/sessions/
class SessionViewSet(viewsets.ModelViewSet):
	queryset = Session.objects.all()
	serializer_class = SessionSerializer
	permission_classes = [IsAuthenticated, IsTutorOrIsAdminAndHeadTutorReadOnly]

	def destroy(self, request, pk=None):
		super().destroy(request, pk)
		return Response({'status': 200, 'id': pk})

	#create our own action in handling post request
	#handling POST request /sessions/
	def create(self, request):
		#Get all the required parameter for the POST request
		#contract_id, date, start, end, summary
		key_list = ['contract_id', 'date', 'start', 'end', 'summary']
		check_for_key(request.data, key_list)
		#get the contract that this session is associated to
		try:
			contract = Contract.objects.get(pk=request.data['contract_id'])
		except:
			return Response("you dont have a contract with this id")

		#create and save the session into the database
		session = Session(contract=contract,
						date=request.data['date'],
						start=request.data['start'],
						end=request.data['end'],
						summary=request.data['summary'])
		session.save()
		return Response(SessionSerializer(session, context={'request': request}).data)

	#filter session based on users
	#Note: get_queryset should return a queryset
	#/sessions/
	def get_queryset(self):
		user = self.request.user
		create_userprofile(user)
		userprofile = user.userprofiles
		if userprofile.is_admin:
			contracts = Contract.objects.all()
		elif userprofile.is_tutor or userprofile.is_headtutor:
			position = self.request.query_params.get('position', None)
			if (userprofile.is_tutor and (position is None or position == 'tutor')):
				contracts = userprofile.tutor_contracts.all()
			elif userprofile.is_headtutor and position == 'headtutor':
				#only get the contracts from department of the headtutor
				contracts = Contract.objects.all()

				subjects = userprofile.subjects.all()

				query = Q(subject= -1)
				for subject in subjects:
					query |= Q(subject = subject)

				contracts = contracts.filter(query)

		query = Q(id = -1)
		for contract in contracts:
			for session in contract.sessions.all():
				query |= Q(id= session.id)

		sessions = Session.objects.filter(query)

		#filter date by lte: less than or equal, gte: greater than or equal
		#lt: less than, gt: greater than
		operators = ['lte', 'lt', 'gte', 'gt']
		for operator in operators:
			date = self.request.query_params.get('date[{}]'.format(operator), None)
			if date is not None:
				sessions = sessions.filter(**{'date__{}'.format(operator):date})
		return sessions;

	@action(methods=['put'], detail=True)
	def verify(self, request, pk=None):
		try:
			session = Session.objects.get(pk=pk)
			session.is_verified = True
			session.save()
			return Response({"status": 200})
		except:
			return Response({"status": 400})

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Subject.objects.all()
	serializer_class = SubjectSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return self.queryset

	@action(methods=['get'], detail=True)
	def get_sessions(self, request, pk=None):
		subject = Subject.objects.get(pk=pk)

		#get all the sessions of this subject
		query = Q(id = -1)
		for contract in subject.contracts.all():
			for session in contract.sessions.all():
				query |= Q(id = session.id)

		sessions = Session.objects.filter(query)

		#filter date by lte: less than or equal, gte: greater than or equal
		#lt: less than, gt: greater than
		operators = ['lte', 'lt', 'gte', 'gt']
		for operator in operators:
			date = request.query_params.get('date[{}]'.format(operator), None)
			if date is not None:
				sessions = sessions.filter(**{'date__{}'.format(operator):date})

		return Response(SessionSerializer(sessions, many = True, context={'request': request}).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def encode (request):
	MASTER_KEY="Th1s-1is-@-R3lly-L0ng-M@ster_key-used-to-de%code$ stu##"
	try:
		my_string = request.GET['encode_string']
	except:
		return JsonResponse({"status": 400})

	cipher_text = encode_val(my_string, MASTER_KEY)
	return JsonResponse({"encrypted_string": cipher_text})


def verify(request):
	try:
		value = request.GET['secret']
	except:

		return render(request, 'frontend/tutee_verify.html', context = {"status":400})
	MASTER_KEY="Th1s-1is-@-R3lly-L0ng-M@ster_key-used-to-de%code$ stu##"
	pk = int(decode_val(value, MASTER_KEY))
	session = Session.objects.get(pk=pk)
	session.is_verified = True
	session.save()

	return render(request, 'frontend/tutee_verify.html', context = {"status":200})
