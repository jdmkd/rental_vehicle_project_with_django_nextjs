from rest_framework import serializers
from .models import business_user, buss_vehicle

class BusinessUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = business_user
        fields = ['buss_fname', 'buss_lname', 'buss_emailid','buss_phonenum','buss_created_at','buss_updProfile_photo']  # Include the relevant fields from the business_user model

class BussVehicleSerializer(serializers.ModelSerializer):
    buss_vehicle_owner_email = serializers.CharField(source='buss_vehicle_owner.buss_emailid', read_only=True)
    discounted_rent = serializers.SerializerMethodField()
    
    class Meta:
        model = buss_vehicle
        fields = '__all__'

    def get_discounted_rent(self, obj):
        return obj.calculate_discounted_rent()