from django.shortcuts import render
from arc_app.models import UserProfile, Contract
from arc_app.serializers import UserSerializer, UserProfileSerializer, ContractSerializer
from arc_app.serializers import SessionSerializer, ContractMeetingSerializer
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'userprofiles': reverse('userprofile-list', request=request, format=format),
        'users': reverse('user-list', request=request, format=format),
        'contracts': reverse('contract-list', request=request, format=format)
    })

class UserProfileListCreate(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContractListCreate(generics.ListCreateAPIView): 
	queryset = Contract.objects.all()
	serializer_class = ContractSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContractDetail(generics.RetrieveUpdateDestroyAPIView): 
	queryset = Contract.objects.all()
	serializer_class = ContractSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]





