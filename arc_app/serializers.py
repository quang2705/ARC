from rest_framework import serializers
from arc_app.models import UserProfile, Contract
from arc_app.models import Session, ContractMeeting, Subject

from django.contrib.auth.models import User

#TODO: need testing
class MiniSessionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Session
		fields = ('id', 'url')

class MiniContractMeetingSerializer(serializers.ModelSerializer):
	class Meta:
		model = ContractMeeting
		fields = ('id', 'url')

class MiniUserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('id', 'url', 'email', 'first_name', 'last_name', 'phone', 'd_number')

class MiniContractSerializer(serializers.ModelSerializer):
	tutee = MiniUserProfileSerializer(many=False, read_only=True)
	class Meta:
		model = Contract
		fields = ('id', 'url', 'class_name', 'tutee')

class MiniSubjectSerializer(serializers.ModelSerializer):
	headtutor = MiniUserProfileSerializer(many=False, read_only=True)
	class Meta:
		model = Subject
		fields = ('id', 'subject_name', 'headtutor')

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	tutor_contracts = MiniContractSerializer(many=True, read_only=True)
	tutee_contracts = MiniContractSerializer(many=True, read_only=True)
	class Meta:
		model = UserProfile
		fields = ('url','id', 'user', 'tutor_contracts',
			'tutee_contracts','first_name', 'last_name',
			'email','d_number','phone', 'is_tutor',
			'is_tutee', 'is_admin', 'is_headtutor')

class ContractSerializer(serializers.HyperlinkedModelSerializer):
	sessions = MiniSessionSerializer(many=True, read_only=True)
	contract_meetings = MiniContractMeetingSerializer(many=True, read_only=True)
	tutor = MiniUserProfileSerializer(many=False, read_only=True)
	tutee = MiniUserProfileSerializer(many=False, read_only=True)
	subject = MiniSubjectSerializer(many=False, read_only=True)
	class Meta:
		model = Contract
		fields = ('url', 'id', 'tutor', 'tutee','sessions',
			'contract_meetings', 'class_name', 'subject', 'professor_name',
			'is_verified', 'is_waiting')

class UserSerializer(serializers.HyperlinkedModelSerializer):
	userprofiles = MiniUserProfileSerializer(many=False, read_only=True)
	class Meta:
		model = User
		fields = ('url', 'id', 'userprofiles', 'first_name', 'last_name', 'email')

class SessionSerializer(serializers.HyperlinkedModelSerializer):
	contract = MiniContractSerializer(many=False, read_only=True)
	class Meta:
		model = Session
		fields = ('url', 'id', 'contract', 'date', 'start', 'end', 'summary', 'is_verified', 'is_waiting')

class ContractMeetingSerializer(serializers.HyperlinkedModelSerializer):
	contract = MiniContractSerializer(many=False, read_only=True)
	class Meta:
		model = ContractMeeting
		fields = ('url','id', 'contract', 'date', 'start', 'end', 'location')

class SubjectSerializer(serializers.ModelSerializer):
	contracts = MiniContractSerializer(many=True, read_only=True)
	class Meta:
		model = Subject
		fields = ('id', 'subject_name', 'contracts', 'headtutor')
