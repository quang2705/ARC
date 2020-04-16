from arc_app.models import UserProfile

from rest_framework.response import Response

#python class
from Crypto.Cipher import AES
import base64

#create a user profile for user if user doesn't have any user profile
def create_userprofile(user):
	try:
		userprofile = user.userprofiles
	except:
		userprofile = UserProfile(user=user,
								first_name=user.first_name,
								last_name=user.last_name,
								email=user.email,
								is_tutor=True,
								is_tutee=False)
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
    enc_secret = AES.new(MASTER_KEY[:32])
    tag_string = (str(text) + (AES.block_size - len(str(text)) % AES.block_size) * "\0")
    cipher_text = base64.b64encode(enc_secret.encrypt(tag_string))
    return cipher_text

def decode_val(cipher_text, MASTER_KEY):
    dec_secret = AES.new(MASTER_KEY[:32])
    raw_decrypted = dec_secret.decrypt(base64.b64decode(cipher_text))
    text = raw_decrypted.decode().rstrip("\0")
    return text
