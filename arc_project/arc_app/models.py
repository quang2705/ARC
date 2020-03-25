from django.db import models
from django.contrib.auth.models import User
from  django.contrib.auth.models import BaseUserManager

#TODO: Gives contrains for all the CharField and IntegerField
#TODO: Write test for database on contrain and relationship

class UserProfile(models.Model):
	user = models.OneToOneField(User,
								unique=True,
								on_delete=models.CASCADE,
								related_name='userprofiles',
								null=True)

	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	d_number = models.CharField(max_length=100)
	phone = models.CharField(max_length=100)
	is_tutor = models.BooleanField(default=False)
	is_tutee = models.BooleanField(default=False)
	is_admin = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return (self.user.username)

class Subject(models.Model):
	subject_name = models.CharField(max_length=100)
	def __str__(self):
		return ("Subject " + self.subject_name)

class Contract(models.Model):
	#Contract has a many to one relation with tutor
	#Contract has a many to one relation with tutee
	#on_delete=models.CASCADE is cascade delete, if user is delete,
	#contract will delete automatically
	tutor = models.ForeignKey(UserProfile,
								on_delete=models.CASCADE,
								related_name='tutor_contracts')
	tutee = models.ForeignKey(UserProfile,
							on_delete=models.CASCADE,
							related_name='tutee_contracts')
	subject = models.ForeignKey(Subject,
								on_delete=models.CASCADE,
								related_name='contracts')
	class_name = models.CharField(max_length=100)
	professor_name = models.CharField(max_length=100)
	is_verified = models.BooleanField(default=False)
	is_waiting = models.BooleanField(default=False)

	def __str__(self):
		return ("Contract "+ str(self.id))

class Session(models.Model):
	#Session has a many to one relationship with Contract
	#on_delete=models.CASCADE is cascade delete, if Contract is delete,
	#Session will delete automatically
	contract = models.ForeignKey(Contract,
								on_delete=models.CASCADE,
								related_name='sessions')
	date = models.DateField()
	start = models.TimeField()
	end = models.TimeField()
	summary = models.TextField()
	is_verified = models.BooleanField(default=False)
	is_waiting = models.BooleanField(default=False)

	def __str__(self):
		return ("Session "+ str(self.id))

class ContractMeeting(models.Model):
	#ContractMeeting has a many to one relationship with Contract
	#on_delete=models.CASCADE is cascade delete, if Contract is delete,
	#ContractMeeting will delete automatically
	contract = models.ForeignKey(Contract,
								on_delete=models.CASCADE,
								related_name='contract_meetings')
	date = models.CharField(max_length=100)
	start = models.TimeField()
	end = models.TimeField()
	location = models.CharField(max_length=100)

	def __str__(self):
		return ("Contract Meeting "+ str(self.id))
