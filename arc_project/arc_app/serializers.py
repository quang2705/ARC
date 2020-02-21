from rest_framework import serializers
from arc_app.models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'first_name', 'last_name', 'email',
       			'd_number', 'phone', 'is_tutor', 'is_tutee', 'is_admin')