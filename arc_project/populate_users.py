import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','arc_project.settings')

import django
django.setup()

from arc_app.models import UserProfile, Contract, Session, ContractMeeting
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
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

#Create a User and UserProfile models based on a user info and
#save User and UserProfile into the database.
def create_user_db(user_db, size):
	print("Creating User and UserProfile... ")
	for i in range(size):
		username = user_db['username'][i]
		first_name = user_db['first_name'][i]
		last_name = user_db['last_name'][i]
		password = user_db['password'][i]
		email = user_db['email'][i].lower()
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

#Create a contract for each tutor and tutee
#
def create_contract_db(tutor_fn, tutor_ln, tutee_fn, tutee_ln):
	print("Create Contract... ")
	size = len(tutor_fn)
	class_name_prefix = "CS"
	subject = "Computer Science"
	professor_prefix = "Dr. "
	for i in range(size):
		tutor_first_name = tutor_fn[i]
		tutor_last_name = tutor_ln[i]
		tutee_first_name = tutee_fn[i]
		tutee_last_name = tutee_ln[i]
		tutor = UserProfile.objects.get(first_name=tutor_first_name,
								last_name=tutor_last_name)
		tutee = UserProfile.objects.get(first_name=tutee_first_name,
								last_name=tutee_last_name)
		class_name = class_name_prefix + str(i)
		professor_name = professor_prefix + chr(ord('A') + i)
		contract = Contract(tutor=tutor, tutee=tutee,
							class_name=class_name,
							subject=subject,
							professor_name=professor_name)
		print("Create a Contract between {0} {1} for class: {2}".format(tutor_first_name,
																		tutee_first_name,
																		class_name))
		contract.save()


#Generate the contract meeting for each Contract
def create_contract_meeting():
	print("Create Contract Meeting...")
	no_meeting_per_contract = 2
	contracts = Contract.objects.all()

	for i in range(len(contracts)):
		contract = contracts[i]
		for j in range(no_meeting_per_contract):
<<<<<<< HEAD
			date = datetime.now()
=======
			date = 'Monday'
>>>>>>> ebabc8dad884f4be32afa3893f06f75a3815ac21
			start = datetime.now()
			end = datetime.now()
			location = "Olin " + str(i)
			contract_meeting = ContractMeeting(contract=contract,
												date=date,
												start=start,
												end=end,
												location=location)
			print("Create a Contract Meeting at {0} on {1} from {2} to {3}".format(location,
																			date,
																			start,
																			end))
			contract_meeting.save()

#Generate the Session for each Contract
def create_session():
	print("Create Session...")
	no_session_per_contract = 2
	contracts = Contract.objects.all()

	for i in range(len(contracts)):
		contract = contracts[i]
		for j in range(no_session_per_contract):
			date = datetime.now()
			start = datetime.now()
			end = datetime.now()
			summary = "Today we learn about something"
			session = Session(contract=contract,
								date=date,
								start=start,
								end=end,
								summary=summary)
			print("Create a Session on {0} from {1} to {2}".format(date,
																	start,
																	end))
			session.save()

#Populate the database with our 5 tutor and 5 tutee
def populate():
	tutor_first_name = ["Hiep", "Khanh", "Khue", "Meg", "Quang"]
	tutor_last_name = ["Phan", "Tran", "Le", "Jaffy", "Nguyen"]
	size = len(tutor_first_name)
	tutee_first_name = ["John", "Yuri", "Wang", "Sam", "Jake"]
	tutee_last_name = ["Doe", "Kuro", "Shei", "Smith", "Perata"]

	try:
		tutor_db = generate_user_info(tutor_first_name, tutor_last_name, True, False)
		create_user_db(tutor_db, size)
	except:
		print("already have tutor with similar name")

	try:
		tutee_db = generate_user_info(tutee_first_name, tutee_last_name, False, True)
		create_user_db(tutee_db, size)
	except:
		print("already have tutee with similar name")

	print("================================================")
	create_contract_db(tutor_first_name, tutor_last_name, \
						tutee_first_name, tutee_last_name)
	print("================================================")
	create_contract_meeting()
	print("================================================")
	create_session()

if __name__=='__main__':
	print("Starting to populate")
	populate()
