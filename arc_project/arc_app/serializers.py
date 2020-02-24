from rest_framework import serializers
from arc_app.models import UserProfile, Contract, Session, ContractMeeting
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('url','id', 'user', 'first_name', 'last_name', 'email',
			'd_number', 'phone', 'is_tutor', 'is_tutee', 'is_admin')

class ContractSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contract
        fields = ('url', 'id', 'tutor', 'tutee', 'class_name', 
        			'subject', 'professor_name')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id','first_name', 'last_name', 'email')

class SessionSerializer(serializers.HyperlinkedModelSerializer): 
	class Meta: 
		model = Session
		fields = ('url', 'id', 'contract', 'date', 'start', 'end', 'summary')

class ContractMeetingSerializer(serializers.HyperlinkedModelSerializer): 
	class Meta: 
		model = ContractMeeting
		fields = ('url','id', 'contract', 'date', 'start', 'end', 'location')

		
