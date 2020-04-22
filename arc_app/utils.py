from arc_app.models import UserProfile
from django.db.models import Q

from rest_framework.response import Response

#python class
import base64

#create a user profile for user if user doesn't have any user profile
def create_userprofile(user):
	try:
		userprofile = user.userprofiles
	except:
		userprofile = UserProfile(user=user,
								first_name=user.first_name,
								last_name=user.last_name,
								email=user.email)
		userprofile.save()
		user.userprofiles = userprofile

#check to see if there is a required parameters for creating
#a database object
def check_for_key(request_data, key_list):
	for key in key_list:
		try:
			val = request_data[key]
		except KeyError:
			return Response('You dont have the params `{0}`'.format(key))

#This function return a Q objects that represents the exact filtering query
#of the query parameters
def setup_query(request_params, key_list):
	query = None
	for key in key_list:
		val = request_params.get(key, None)
		if (val != None):
			if val == 'true':
				val = 'True'
			if val == 'false':
				val = 'False'
			q_object = Q(**{"%s__exact" % key : val})
			if (query):
				query = query & q_object
			else:
				query = q_object
	return query

def encode_val(text, MASTER_KEY):
	return base64.b64encode(text.encode('utf-8')).decode('utf-8')

def decode_val(cipher_text, MASTER_KEY):
	return base64.b64decode(cipher_text.encode('utf-8')).decode('utf-8')
