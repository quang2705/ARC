import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','arc_project.settings')

import django
django.setup()

from arc_app.models import UserProfile, Contract, Session, ContractMeeting, Subject
import datetime

def create_contract(userprofile):
	print("Creating contract for user: ", userprofile.email)
	num_contracts = 2
	num_meetings_per_contract = 2
	class_name_prefix = "CS"
	subject_name = "Computer Science"
	professor_prefix = "Dr. "

	#create contract base on the number of contract
	for i in range(num_contracts):
		tutee = UserProfile.objects.get(pk=1)
		class_name = class_name_prefix + str(i)
		professor_name = professor_prefix + chr(ord('A') + i)
		subject = Subject.objects.get(subject_name = subject_name)
		contract = Contract(tutor=userprofile, tutee=tutee,
							class_name=class_name,
							subject=subject,
							professor_name=professor_name)
		contract.save()
		print("Create a Contract between {0} {1} for class: {2} of prof {3}".format(userprofile.email,
																		tutee.email,
																		class_name,
																		professor_name))
		for j in range (num_meetings_per_contract):
			print("Creating a contract meeting for user: ", userprofile.email)
			date = 'Monday'
			start = datetime.time((j+1)*4,30)
			end = datetime.time((j+1)*6,0)
			location = 'Olin' + str(j)
			contract_meeting = ContractMeeting(contract=contract,
												date = date,
												start = start,
												end=end,
												location=location)
			contract_meeting.save()
			print("Create a Contract Meeting at {0} on {1} from {2} to {3}".format(location, date, start, end))

def create_session(userprofile):
	print("Creating Session for user: ", userprofile.email)
	no_session_per_contract = 2
	contracts = Contract.objects.filter(tutor = userprofile)
	for i in range (len(contracts)):
		contract = contracts[i]
		for j in range(no_session_per_contract):
			date = datetime.date.today()
			start = datetime.time((j+1)*4, 30)
			end = datetime.time((j+1)*6, 0)
			summary = "Today we learn how to do something else"
			session = Session(contract=contract,
								date=date,
								start=start,
								end=end,
								summary=summary)
			session.save()
			print("Create a Session on {0} from {1} to {2}".format(date, start, end))

def main():
	user_email = input("Type your Denison email here: ")
	print(user_email)
	userprofile = UserProfile.objects.get(email = user_email)
	userprofile.is_tutor = True
	create_contract(userprofile)
	create_session(userprofile)
	return 0

main()
