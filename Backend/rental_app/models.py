from django.utils.safestring import mark_safe
from django.utils import timezone
import uuid
from django.db import models
from rental_sp.models import buss_vehicle
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.validators import RegexValidator
# Create your models here.


class usertable(models.Model):
    fname = models.CharField(max_length=20)
    lname = models.CharField(max_length=20)
    emailid = models.CharField(max_length=40)
    password = models.CharField(max_length=150)
    phonenum = models.CharField(
        max_length=13, 
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{10,13}$',  # Allows optional '+' and ensures a length between 9 and 13 digits
                message='Phone number must be entered in the format: "+999999999999". Up to 13 digits allowed.'
            )
        ]
    )
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(default=timezone.now)

    def update_last_login(self):
        self.last_login = timezone.now()
        self.save()

    auth_token = models.CharField(max_length=100, null=True)
    
    password_reset_token = models.CharField(max_length=100, null=True)
    password_reset_token_expiration_time = models.DateTimeField(null=True)
    def is_password_reset_token_expired(self):
        return timezone.now() > self.password_reset_token_expiration_time
    
    is_verified = models.BooleanField(default=False)

    # licence_no = models.CharField(max_length=50)
    # address = models.TextField()
    updProfile_photo = models.ImageField(
        blank=True, null=True, upload_to="UserProfileImg/"
    )  # , default='profile_img/925667.jpg'

    def updProfile_image(self):
        if self.pk:
            obj = usertable.objects.get(pk=self.pk)
            # print("This is obj ::",obj)
            if obj.updProfile_photo:
                return mark_safe(
                    '<img src="{}" width="100" />'.format(self.updProfile_photo.url)
                )
        else:
            return ""

    updProfile_image.allow_tags = True

    role = models.CharField(max_length=30)
    status = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.emailid}'


class booking_table(models.Model):
    vehicle_id = models.ForeignKey(buss_vehicle, on_delete=models.CASCADE)
    # vehicle_table
    login_id = models.ForeignKey(usertable, on_delete=models.CASCADE)
    from_duration = models.DateField(blank=False, null=False)
    from_to = models.DateField(blank=False, null=False)
    amount = models.CharField(max_length=30)
    booking_date = models.DateTimeField(auto_now_add=True)
    paystatus = models.BooleanField(default=False)
    
    is_cancelled = models.BooleanField(default=False)
    cancelled_at = models.DateTimeField(blank=True, null=True)

    def __int__(self):
        return f'{self.vehicle_id} {self.booking_date}'


class feedback(models.Model):
    # l_id = models.ForeignKey(usertable, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30, null=True)
    ratings = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comments = models.CharField(max_length=350)

    def __str__(self):
        return f'{self.name}'


class contactus(models.Model):
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    phone = models.CharField(
        max_length=13, 
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{10,13}$',  # Allows optional '+' and ensures a length between 9 and 13 digits
                message='Phone number must be entered in the format: "+999999999999". Up to 13 digits allowed.'
            )
        ]
    )
    message = models.CharField(max_length=350)
    contact_date = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return f'{self.name}'
