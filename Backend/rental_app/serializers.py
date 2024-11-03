from rest_framework import serializers
import uuid
from django.contrib.auth.hashers import make_password
from .models import usertable, contactus, feedback

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = usertable
        fields = ['fname', 'lname', 'emailid', 'phonenum','created_at', 'updProfile_photo']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = usertable
        fields = ['fname', 'lname', 'emailid', 'password', 'phonenum']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['auth_token'] = str(uuid.uuid4())  # Generate a new auth token
        validated_data['role'] = '2'  
        validated_data['status'] = '1'  
        user = usertable(**validated_data)
        user.save()
        return user

    def validate(self, data):
        if usertable.objects.filter(fname=data['fname']).exists():
            raise serializers.ValidationError("Username already taken. Please use a different username.")
        if usertable.objects.filter(emailid=data['emailid']).exists():
            raise serializers.ValidationError("User with this email already exists.")
        if data['password'] == "":
            raise serializers.ValidationError("Password field cannot be empty.")
        return data
    

class UserVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = usertable
        fields = ['auth_token', 'is_verified']
        read_only_fields = ['auth_token']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)




class ContactusSerializer(serializers.ModelSerializer):
    class Meta:
        model = contactus
        fields = '__all__'

# class ContactusSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     name = serializers.CharField(required=True, allow_blank=False, max_length=100)
#     email = serializers.CharField(required=True, allow_blank=False, max_length=100)
#     phone = serializers.CharField(required=True, allow_blank=False, max_length=13)
#     message = serializers.CharField(required=True, allow_blank=False, max_length=500)

#     def create(self, validated_data):
#         """
#         Create and return a new `Snippet` instance, given the validated data.
#         """
#         return contactus.objects.create(**validated_data)
    
#     def update(self, instance, validated_data):
#         """
#         Update and return an existing `Snippet` instance, given the validated data.
#         """
#         instance.name = validated_data.get('name', instance.name)
#         instance.email = validated_data.get('email', instance.enail)
#         instance.phone = validated_data.get('phone', instance.phone)
#         instance.message = validated_data.get('message', instance.message)
#         instance.save()
#         return instance

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = feedback
        fields = '__all__'

