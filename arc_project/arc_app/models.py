from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE)
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	email = models.EmailField()
	d_number = models.CharField(max_length=100)
	phone = models.CharField(max_length=100)
	is_tutor = models.BooleanField(default=False)
	is_tutee = models.BooleanField(default=False)
	is_admin = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self): 
		return (self.first_name + " " + self.last_name)
