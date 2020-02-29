from django.shortcuts import render
from django.contrib.auth.models import User
from arc_app.models import UserProfile, Contract
from arc_app.models import Session, ContractMeeting
from arc_app.serializers import UserSerializer, UserProfileSerializer, ContractSerializer
from arc_app.serializers import SessionSerializer, ContractMeetingSerializer
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.reverse import reverse
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

    @action(methods=['get'], detail=True)
    def get_contracts(self, request, pk=None):
    	user = self.get_object()
    	serializer = UserProfileSerializer(user, many=False, context={'request':request})
    	print("SERIALIZER DATA ", serializer.data)
    	contracts = {
    	'as_tutor': serializer.data['tutor_contracts'],
    	'as_tutee': serializer.data['tutee_contracts']
    	}
    	return Response(contracts)

    def get_queryset(self): 
    	user= self.request.user
    	return UserProfile.objects.filter(user = user)

class UserViewSet(viewsets.ReadOnlyModelViewSet): 
    #This viewset automatically provide 'list' and 'detail' action
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContractViewSet(viewsets.ModelViewSet): 
    #This viewset automatically provides 'list', 'create', 'retrieve', 
    #'update', and 'destroy' actions 
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    #query contract based on the tutor of the contract and 
    #any parameter that is added onto the url 
    def get_queryset(self): 
    	#get all the params from the url 
    	class_name = self.request.query_params.get('class_name', None)
    	subject = self.request.query_params.get('subject', None)
    	professor_name = self.request.query_params.get('professor_name', None)
    	tutor_name = self.request.query_params.get('tutor_name', None)

    	userprofile = self.request.user.userprofiles
    	contracts = Contract.objects.all()

    	#if the params is not Null, query it
    	if class_name is not None: 
    		contracts = contracts.filter(class_name = class_name)
    	if subject is not None: 
    		contracts = contracts.filter(subject = subject)
    	if professor_name is not None: 
    		contracts = contracts.filter(professor_name = professor_name)
    	if tutor_name is not None: 
    		contracts = contracts.filter(tutor_name = tutor_name)
    	    	
    	#query by location if possible 
    	location = self.request.query_params.get('location', None)
    	if location != None: 
    		contracts = contracts.filter(location=location)
    	#query the contracts based on the user loging in
    	return contracts.filter(tutor = userprofile)

class ContractMeetingViewSet(viewsets.ModelViewSet): 
    queryset = ContractMeeting.objects.all()
    serializer_class = ContractMeetingSerializer
    permisson_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self): 
    	#get all contracts that contract meetings is belong to
    	#based on user that is currently log in
    	userprofile = self.request.user.userprofiles
    	contracts = Contract.objects.filter(tutor = userprofile)
    	
    	#create a query variable that allow us to query all the 
    	#contract meeting of that user
    	query = Q(contract= contracts[0])
    	for i in range(1,len(contracts)): 
    		query.add(Q(contact = contracts[i]), Q.OR)

    	contract_meetings = ContractMeeting.objects.all()
    	return contract_meetings.filter(query)


class SessionViewSet(viewsets.ModelViewSet): 
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permisson_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
    	#get all contracts that sessions is belong to
    	#based on user that is currently log in
    	userprofile = self.request.user.userprofiles
    	contracts = Contract.objects.filter(tutor = userprofile)

    	#create a query variable that allow us to query all the 
    	#sessions of that user
    	query = Q(contract= contracts[0])
    	for i in range(1,len(contracts)): 
    		query.add(Q(contact = contracts[i]), Q.OR)

    	sessions = Session.objects.all()
    	return sessions.filter(query)

@api_view(['GET'])
#view function that return userprofile based on first_name and last_name
def query_userprofile(request, first_name, last_name):
	if (request.method == 'GET'):
		userprofile = UserProfile.objects.get(first_name=first_name, last_name=last_name)
		serializer = UserProfileSerializer(userprofile, many=False, context={'request': request})
		return Response(serializer.data)

