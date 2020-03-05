from django.contrib.auth.models import User
from arc_app.models import UserProfile, Contract
from arc_app.models import Session, ContractMeeting
from arc_app.serializers import UserSerializer, UserProfileSerializer, ContractSerializer
from arc_app.serializers import SessionSerializer, ContractMeetingSerializer
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from django.db.models import Q


class UserProfileViewSet(viewsets.ModelViewSet):
	#This viewset automatically provides 'list', 'create', 'retrieve',
	#'update', and 'destroy' actions
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer
	#Basic permission, allows  all permission if authenticated otherwise
	#user can only have 'read' operation
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		user= self.request.user
		if not user.is_authenticated:
			return []

		return UserProfile.objects.filter(user = user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
	#This viewset automatically provide 'list' and 'detail' action
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		user= self.request.user
		if not user.is_authenticated:
			return []
		#get the params from url and filter it with
		#the users objects
		first_name = self.request.query_params.get('first_name', None)
		last_name = self.request.query_params.get('last_name', None)
		email = self.request.query_params.get('email', None)
		users = self.queryset

		if first_name is not None:
			users = users.filter(first_name=first_name)
		if last_name is not None:
			users = users.filter(last_name=last_name)
		if email is not None:
			users = users.filter(email=email)

		return users

class ContractViewSet(viewsets.ModelViewSet):
	#This viewset automatically provides 'list', 'create', 'retrieve',
	#'update', and 'destroy' actions
	queryset = Contract.objects.all()
	serializer_class = ContractSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def create(self, request):
		try:
			tutor_email = request.data['tutor_email']
			tutee_first_name = request.data['tutee_first_name']
			tutee_last_name = request.data['tutee_last_name']
			tutee_email = request.data['tutee_email']
			tutee_phone = request.data['tutee_phone']
			tutee_dnumber = request.data['tutee_dnumber']
			class_name = request.data['class_name']
			professor_name = request.data['professor_name']
			subject = request.data['subject']
		except:
			print(request.data)
			return Response("missing parameter")

		try:
			print("tutor email ", tutor_email)
			tutor = UserProfile.objects.get(email=tutor_email)
			#TODO: check to see if the tutor is the user sending
			#the request and if he is a tutor
			try:
				tutee = UserProfile.objects.get(email=tutee_email)
			except:
				print("no tutee exist, create new tutee")
				#incase there is not tutee with this name in the database
				tutee = UserProfile(first_name=tutee_first_name,
									last_name=tutee_last_name,
									email=tutee_email,
									phone=tutee_phone,
									d_number=tutee_dnumber,
									is_tutee=True)
				print(tutee)
				tutee.save()
				print("tutee", tutee)
		except Exception as e:
			print(e)
			return Response("Your information about tutor or tutee is not correct, check the parameter again")
		contract = Contract(tutor=tutor, tutee=tutee,
							class_name=class_name, subject=subject,
							professor_name=professor_name)
		contract.save()
		contract_serializer = ContractSerializer(contract, many=False, context={'request':request})
		return Response(contract_serializer.data)

	#query contract based on the tutor of the contract and
	#any parameter that is added onto the url
	def get_queryset(self):
		user= self.request.user
		if not user.is_authenticated:
			return []

		#get all the params from the url
		class_name = self.request.query_params.get('class_name', None)
		subject = self.request.query_params.get('subject', None)
		professor_name = self.request.query_params.get('professor_name', None)
		tutee_email = self.request.query_params.get('tutee_email', None)

		userprofile = user.userprofiles
		contracts = self.queryset


		#if the params is not Null, query it
		if class_name is not None:
			contracts = contracts.filter(class_name = class_name)
		if subject is not None:
			contracts = contracts.filter(subject = subject)
		if professor_name is not None:
			contracts = contracts.filter(professor_name = professor_name)
		if tutee_email is not None:
			tutee = UserProfile.objects.get(email=tutee_email)
			contracts = contracts.filter(tutee = tutee)


		#query the contracts based on the user loging in
		#right now only show contract if user is a tutor, does not show
		#contract when the user is a tutee
		return contracts.filter(tutor = userprofile)

	#Return all the sessions of the current contract
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

	#Return all the contracts meeting of the current contract
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

class ContractMeetingViewSet(viewsets.ModelViewSet):
	queryset = ContractMeeting.objects.all()
	serializer_class = ContractMeetingSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	#filter contract meeting based on the user
	def get_queryset(self):
		user = self.request.user
		if not user.is_authenticated:
			return []

		#get all contracts that contract meetings is belong to
		#based on user that is currently log in
		userprofile = user.userprofiles
		contracts = Contract.objects.filter(tutor = userprofile)

		#create a query variable that allow us to query all the
		#contract meeting of that user
		query = Q(contract= contracts[0])
		for i in range(1,len(contracts)):
			query.add(Q(contact = contracts[i]), Q.OR)

		contract_meetings = self.queryset
		#query by location if possible

		location = self.request.query_params.get('location', None)
		if location is not None:
			contract_meetings = contract_meetings.filter(location=location)

		return contract_meetings.filter(query)


class SessionViewSet(viewsets.ModelViewSet):
	queryset = Session.objects.all()
	serializer_class = SessionSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	#filter session based on users
	def get_queryset(self):
		user = self.request.user
		if not user.is_authenticated:
			return []

		#get all contracts that sessions is belong to
		#based on user that is currently log in
		userprofile = self.request.user.userprofiles
		contracts = Contract.objects.filter(tutor = userprofile)

		#create a query variable that allow us to query all the
		#sessions of that user
		query = Q(contract= contracts[0])
		for i in range(1,len(contracts)):
			query.add(Q(contract = contracts[i]), Q.OR)

		sessions = self.queryset
		return sessions.filter(query)
