from django.shortcuts import render
from django.contrib.auth.models import User
from arc_app.models import UserProfile, Contract
from arc_app.models import Session, ContractMeeting
from arc_app.serializers import UserSerializer, UserProfileSerializer, ContractSerializer
from arc_app.serializers import SessionSerializer, ContractMeetingSerializer
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets

class UserProfileViewSet(viewsets.ModelViewSet): 
    #This viewset automatically provides 'list', 'create', 'retrieve', 
    #'update', and 'destroy' actions
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    #Basic permission, allows  all permission if authenticated otherwise
    #user can only have 'read' operation
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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

class ContractMeetingViewSet(viewsets.ModelViewSet): 
    queryset = ContractMeeting.objects.all()
    serializer_class = ContractMeetingSerializer
    permisson_classes = [permissions.IsAuthenticatedOrReadOnly]


class SessionViewSet(viewsets.ModelViewSet): 
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permisson_classes = [permissions.IsAuthenticatedOrReadOnly]




