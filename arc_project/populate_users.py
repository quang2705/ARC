import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','arc_project.settings')

import django
django.setup()

from arc_app.models import UserProfile
from django.contrib.auth.models import User

#Generate user based on a list of first_name and last_name 
#specify whether this list of users is tutor or tutee
def generate_user_info(first_name, last_name, is_tutor=False, is_tutee=False): 
	username = []
	password = []
	email = []
	for i in range(len(first_name)): 
		username.append(first_name[i] + last_name[i])
		password.append(last_name[i] +"@123")
		email.append(last_name[i]+"_"+first_name[i][0] +"1" +"@denison.edu")

	user_db = {"first_name": first_name, 
				"last_name": last_name, 
				"username": username, 
				"password": password, 
				"email": email,
				"is_tutor": is_tutor,
				"is_tutee": is_tutee
				}
	return user_db

#Populate the database with our 5 tutor and 5 tutee
def populate(): 
	tutor_first_name = ["Hiep", "Khanh", "Khue", "Meg", "Quang"]
	tutor_last_name = ["Phan", "Tran", "Le", "Jaffy", "Nguyen"]
	size = len(tutor_first_name)
	tutor_db = generate_user_info(tutor_first_name, tutor_last_name, True, False)
	create_user_db(tutor_db, size)

	tutee_first_name = ["John", "Yuri", "Wang", "Sam", "Jake"]
	tutee_last_name = ["Doe", "Kuro", "Shei", "Smith", "Perata"]
	tutee_db = generate_user_info(tutee_first_name, tutee_last_name, False, True)
	create_user_db(tutee_db, size)
	
#Create a User and UserProfile models based on a user info and 
#save User and UserProfile into the database. 
def create_user_db(user_db, size): 
	for i in range(size): 
		username = user_db['username'][i]
		first_name = user_db['first_name'][i]
		last_name = user_db['last_name'][i]
		password = user_db['password'][i]
		email = user_db['email'][i]
		is_tutor = user_db['is_tutor']
		is_tutee = user_db['is_tutee']

		user = User.objects.create_user(username=username, 
											first_name=first_name, 
											last_name=last_name, 
											password=password,
											email=email)

		user_profile = UserProfile(user=user,
									first_name=first_name, 
									last_name=last_name, 
									email=email, 
									is_tutor=is_tutor, 
									is_tutee=is_tutee)

		print("Creating user {0} {1}".format(username, email))
		user.save()
		user_profile.save()

if __name__=='__main__': 
	print("Starting to populate")
	populate()