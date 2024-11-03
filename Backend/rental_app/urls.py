from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework import viewsets
from .views import UserdetailView, ContactusView, FeedbackView, UserRegistrationView, VerifyAccountView, check_loginx, export_user_report_in_csv, export_user_report_in_pdf, get_user_report, login_view, check_login


# router = DefaultRouter()
# router.register(r'contactus', views.contactus.as_view())


urlpatterns = [

    path("userdetail", UserdetailView, name="userdetail"),
    path("contactus", ContactusView, name="contactus"),
    path("feedback", FeedbackView, name="feedback"),
    path("accounts/check-login", check_login, name="check-login"),
    path("accounts/check-loginx", check_loginx, name="check-loginx"),
    path("accounts/register", UserRegistrationView.as_view(), name="register"),
    path("accounts/login", login_view, name="login"),
    path('accounts/verify/<str:auth_token>/', VerifyAccountView.as_view(), name='account-verify'),
    
    

    path('api/get/user-report/', get_user_report, name='get_user_report'),
    # http://127.0.0.1:8000/api/get/user-report/?start_date=2024-10-11&end_date=2024-10-14
    path('api/export/user-report/in/pdf/', export_user_report_in_pdf, name='export_user_report_in_pdf'),
    # http://127.0.0.1:8000/api/export/user-report/in/pdf/?start_date=2024-10-11&end_date=2024-10-14
    path('api/export/user-report/in/csv/', export_user_report_in_csv, name='export_user_report_in_csv'),
    # http://127.0.0.1:8000/api/export/user-report/in/csv/?start_date=2024-10-11&end_date=2024-10-14



]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
