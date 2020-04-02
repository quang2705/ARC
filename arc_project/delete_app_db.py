import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','arc_project.settings')

import django
django.setup()

from arc_app.models import UserProfile, Contract, Session, ContractMeeting, Subject

def delete_app_db():
    print("Deleting UserProfile")
    UserProfile.objects.all().delete()
    print("Deleting Contract")
    Contract.objects.all().delete()
    print("Deleting Session")
    Session.objects.all().delete()
    print("Deleting ContractMeeting")
    ContractMeeting.objects.all().delete()
    print("Deleting Subject")
    Subject.objects.all().delete()

def create_subject():
	print("Creating subject...")
	subject_name_list = ['Astronomy', 'Biology', 'Chemistry', 'Communication',\
						'Computer Science', 'Data Analytics', 'Economics', \
						'French', 'German', 'Global Commerce', 'Health Education and Sport Studies', \
						'Japanese', 'Music', 'Philosophy', 'Physics', 'Psychology', \
						'Queer Studies', 'Spanish']

	for subject_name in subject_name_list:
		subject = Subject(subject_name=subject_name)
		subject.save()
		print("Create a Subject name : ", subject_name)
def main():
    delete_app_db()
    create_subject()
    return 0

main()
