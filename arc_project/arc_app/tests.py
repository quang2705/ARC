from django.test import TestCase

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from django.contrib.auth.models import User
from arc_app.models import UserProfile, Contract, Session, ContractMeeting, Subject
from arc_app.views import UserProfileViewSet

# Create your tests here.

class UserProfileMethodTests(APITestCase):
    #test to make sure that userprofile email must not be left empty
    def test_email_is_not_empty(self):
        userprofile = UserProfile(first_name="Quang",
                                    last_name="Nguyen",
                                    email="nguyen_q1@denison.edu",
                                    d_number="D01760117",
                                    phone="7404050190",
                                    is_tutor=True,
                                    is_tutee=False,
                                    is_admin=False)

        userprofile.save()
        self.assertEqual(userprofile.email != "", True)

    #test to make sure that userprofile identity is either tutor, tutee or
    #admin
    def test_userprofile_identity(self):
        userprofile = UserProfile(first_name="Quang",
                                    last_name="Nguyen",
                                    email="nguyen_q1@denison.edu",
                                    d_number="D01760117",
                                    phone="7404050190",
                                    is_tutor=True,
                                    is_tutee=False,
                                    is_admin=False)
        userprofile.save()
        identity = (userprofile.is_tutor == True) or (userprofile.is_tutee == True) or (userprofile.is_admin == True)
        self.assertEqual(identity, True)


class UserProfileViewSetTest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
                    username='nguyen_q1',
                    email='nguyen_q1@denison.edu')

    #test get from api/userprofile
    def test_userprofiles_get(self):
        request = self.factory.get('./api/userprofiles/')

        force_authenticate(request, user=self.user)

        request.user = self.user

        response = UserProfileViewSet.as_view({'get':'list'})(request)
        response.render()
        print(response.content)
