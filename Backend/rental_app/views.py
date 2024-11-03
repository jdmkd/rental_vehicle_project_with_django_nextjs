import csv
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer, Image
from reportlab.pdfgen import canvas

from io import BytesIO
import uuid
import json
from pyexpat.errors import messages
from datetime import datetime

from django.contrib.sessions.models import Session
from django.template.loader import render_to_string
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from .serializers import UserSerializer, UserRegistrationSerializer, ContactusSerializer, FeedbackSerializer, UserVerificationSerializer, LoginSerializer
from .models import usertable, contactus, feedback

# Create your views here.
@api_view(['GET','POST'])
@csrf_exempt
def UserdetailView(request):
    queryset = usertable.objects.all()
    serializer_class = UserRegistrationSerializer(queryset, many=True)
    return JsonResponse(serializer_class.data, safe=False)

@api_view(['GET','POST'])
@csrf_exempt
def ContactusView(request):
    if request.method == 'GET':
        queryset = contactus.objects.all()  # Get all contactus records
        serializer = ContactusSerializer(queryset, many=True)  # Serialize the queryset
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)  # Parse incoming JSON data
        serializer = ContactusSerializer(data=data)  # Initialize serializer with parsed data
        
        if serializer.is_valid():
            serializer.save()  # Save the validated data
            return JsonResponse(serializer.data, status=201)  # Return the saved data
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'POST'])
@csrf_exempt
def FeedbackView(request):
    if request.method == 'GET':
        feedback_data = feedback.objects.all()  # Fetch all feedback records
        serializer = FeedbackSerializer(feedback_data, many=True)  # Serialize the queryset
        return JsonResponse(serializer.data, safe=False)  # Return serialized data

    elif request.method == 'POST':
        data = JSONParser().parse(request)  # Parse the incoming JSON data
        serializer = FeedbackSerializer(data=data)  # Initialize serializer with parsed data
        
        if serializer.is_valid():
            serializer.save()  # Save the valid feedback data
            return JsonResponse(serializer.data, status=201)  # Return the saved data
        return JsonResponse(serializer.errors, status=400)
    


class UserRegistrationView(APIView):
    def post(self, request):
        # Check if the user is already logged in
        if request.session.get("log_id"):
            return Response({"message": "Already logged in."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            send_mail_after_registration(user.emailid, user.auth_token)  # Call your mail function here
            return Response({"message": "Registration successful. Verification email sent."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response({"message": "Please use POST to register."}, status=status.HTTP_200_OK)


def send_mail_after_registration(email, auth_token):
    try:
        subject = "Your account needs to be verified."
        message = f"Please click on this link to verify your account: http://127.0.0.1:3000/accounts/verify/{auth_token}"
        #htmltemp = f"""
        #                     <!DOCTYPE html>
        #                     <html>
        #                     <head>
        #                         <style>
        #                             .button:hover {{
        #                                 background-color: #0056b3;
        #                             }}
        #                         </style>
        #                     </head>
        #                     <body>
        #                         <strong>Reset Password</strong></br>
        #                         <p>A password change has been requested for your account. If this was you, please use the link below to reset your password. It will expire after 1 hour.</p></br>
        #                         <a href='http://127.0.0.1:3000/accounts/verify/{auth_token}'
        #                             style='display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; text-align: center;'
        #                             class="button"
        #                             >

        #                             Reset Password
        #                         </a>
        #                         </br>
        #                         <p>If you have trouble with the button, you can also copy and paste the following link into your browser:</p>
        #                         <p><a href='http://127.0.0.1:3000/accounts/verify/{auth_token}'>http://127.0.0.1:3000/accounts/verify/{auth_token}</a></p>
        #                     </body>
        #                     </html>
        #                 """
        send_from = settings.EMAIL_HOST_USER
        recipient_list = [email]

        send_mail(
            subject,
            message,
            send_from,
            recipient_list,
            fail_silently=True,
        )
        print("Email sent successfully!")
    except Exception as e:
        print("Error occurred while sending email:", e)
        return False

    return True


class VerifyAccountView(APIView):
    def get(self, request, auth_token):
        try:
            # Get user by auth_token
            user = usertable.objects.filter(auth_token=auth_token).first()

            if user:
                # Check if the user is already verified
                if user.is_verified:
                    return Response({"message": "Your account is already verified."}, status=status.HTTP_200_OK)

                # Update verification status
                user.is_verified = True
                user.save()

                # Serialize the user and return success response
                serializer = UserVerificationSerializer(user)
                return Response({
                    "message": "Your account has been verified successfully.",
                    "user": serializer.data
                }, status=status.HTTP_200_OK)
            else:
                # If the token is invalid or not found
                return Response({"error": "Invalid verification link or token."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Handle unexpected errors
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def check_loginx(request):
    if request.session.get("log_id"):
        return Response({"isLoggedIn": True, "message": "You are already logged in."})
    else:
        return Response({"isLoggedIn": False, "message": "Please log in."}, status=403)



# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def check_login(request):
    try:
        print("request.session.session_key ::",request.session.session_key)
        access_token = request.session.get("access_token")
        print("request.session.items() ::",request.session.items())
        print("access_token ::",access_token)

        user = request.user  # The user is automatically set by the JWTAuthentication
        print("user :::",user)
        if not user.is_authenticated:
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)

        user_data = UserSerializer(user).data
        
        print("check_login --- user:", user)
        print("check_login --- user_data:", user_data)

        # Return a response indicating the user is logged in
        return Response({
            "message": "You are already logged in.",
            "isLoggedIn": True,
            "userdata": user_data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print("check_login --- Something went wrong:", str(e))
        return Response({"error": "Something went wrong."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
def login_view(request):
    try:
        # Check if the user is already logged in by checking the session
        if request.session.get("log_id"):
            print("already loggedIn")
            return Response({
                "message": "You are already logged in.",
                "isLoggedIn": True,
            }, status=status.HTTP_200_OK)
    except Exception as e:
        print("Exception: not logged in:", e)
    
    print("Current session log_user:", request.session.get("log_user"))

    # Validate the serializer
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    # Attempt to retrieve the user by email
    try:
        user = usertable.objects.get(emailid=email)
    except usertable.DoesNotExist:
        return Response({"error": "Account does not exist."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the account is verified
    if not user.is_verified:
        return Response({"error": "Please verify your account."}, status=status.HTTP_403_FORBIDDEN)

    # Verify the password
    if not check_password(password, user.password):
        return Response({"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

    # Generate JWT tokens (access and refresh)
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    # Store user session along with tokens
    response = set_user_session(request, user, access_token, refresh_token)

    # Serialize user data
    user_data = UserSerializer(user).data

    # Include the tokens in the response along with user data
    response.data.update({
        "userdata": user_data,
        "access_token": access_token,
        "refresh_token": refresh_token,
    })

    return response  # Response now includes session cookie handling


def set_user_session(request, user, access_token, refresh_token):
    """Helper function to set user-related session variables."""
    
    # Ensure session key is created if it doesn't exist
    if not request.session.session_key:
        request.session.create()

    print("Session Key:", request.session.session_key)

    # Store user information in the session (avoid sensitive data)
    request.session["log_user"] = user.emailid  # Store email or username
    request.session["log_id"] = user.id  # Store user ID
    request.session["access_token"] = access_token  # Store access token in session
    request.session["refresh_token"] = refresh_token  # Store refresh token in session
    request.session.modified = True  # Mark the session as modified

    # Update the user's last login time
    user.update_last_login()

    # Debugging: Print session data (remove in production)
    print("Session data after setting user session:", dict(request.session.items()))

    # Optionally set secure cookies for tokens and user data
    response = Response({"message": "Login successful"}, status=status.HTTP_200_OK)

    # Note: Ensure you are serving over HTTPS to use secure cookies
    response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='None')
    response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='None')
    response.set_cookie('user_data', user.emailid, httponly=True, secure=True, samesite='None')

    return response




@api_view(['POST'])
def logout_view(request):
    # del request # Logs out the user and clears the session

    response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    response.delete_cookie('user_data')
    return response

# GET User reports

@api_view(['GET'])
def get_user_report(request):
    # Retrieve query parameters for filtering
    try:
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # Filter users based on provided dates
        users = usertable.objects.all()

        if start_date:
            parsed_start_date = parse_datetime(start_date)
            if not parsed_start_date:
                raise ValidationError("Invalid start date format.")
            users = users.filter(created_at__gte=parsed_start_date)

        if end_date:
            parsed_end_date = parse_datetime(end_date)
            if not parsed_end_date:
                raise ValidationError("Invalid end date format.")
            users = users.filter(created_at__lte=parsed_end_date)

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def export_user_report_in_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="user_report.csv"'

    writer = csv.writer(response)
    writer.writerow(['First Name', 'Last Name', 'Email', 'Phone Number', 'Created At'])

    # Retrieve query parameters for filtering
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    # Filter users based on provided dates
    users = usertable.objects.all()

    if start_date:
        parsed_start_date = parse_datetime(start_date)
        if parsed_start_date:
            users = users.filter(created_at__gte=parsed_start_date)

    if end_date:
        parsed_end_date = parse_datetime(end_date)
        if parsed_end_date:
            users = users.filter(created_at__lte=parsed_end_date)

    # Write rows to CSV
    for user in users.values_list('fname', 'lname', 'emailid', 'phonenum', 'created_at'):
        writer.writerow(user)

    return response  # Return the CSV response directly


@api_view(['GET'])
def export_user_report_in_pdf(request):
    try:
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        users = usertable.objects.all()

        if start_date:
            parsed_start_date = parse_datetime(start_date)
            if not parsed_start_date:
                raise ValidationError("Invalid start date format.")
            parsed_start_date = timezone.make_aware(parsed_start_date)  # Make timezone-aware
            users = users.filter(created_at__gte=parsed_start_date)

        if end_date:
            parsed_end_date = parse_datetime(end_date)
            if not parsed_end_date:
                raise ValidationError("Invalid end date format.")
            parsed_end_date = timezone.make_aware(parsed_end_date)  # Make timezone-aware
            users = users.filter(created_at__lte=parsed_end_date)

        # Create PDF response
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        elements = []

        # Add Logo
        logo_path = "media/reports/users/profile-user.png"  # Specify the path to your logo
        logo = Image(logo_path, width=0.5 * inch, height=0.5 * inch)
        elements.append(logo)
        elements.append(Spacer(1, 12))  # Add some space below the logo
        
        # Title
        styles = getSampleStyleSheet()
        title = Paragraph("User Report", styles['Title'])
        elements.append(title)
        elements.append(Spacer(1, 20))

        current_datetime = datetime.now().strftime("%B %d, %Y, %I:%M:%S %p")  # e.g., "October 15, 2024, 07:16:17 PM"
        generated_on = Paragraph(f"Generated on: {current_datetime}", styles['Normal'])
        elements.append(generated_on)


        description_style = ParagraphStyle(
            'DescriptionStyle',
            parent=styles['Normal'],
            spaceBefore=12,
            spaceAfter=12,
        )
        description = Paragraph("This report contains user data filtered by registration date.", description_style)
        elements.append(description)

        # Filter date information
        filterdate_style = ParagraphStyle(
            'FilterdateStyle',
            parent=styles['Normal'],
            spaceBefore=12,
            spaceAfter=12,
            fontSize=10,
        )
        filterdate = Paragraph(f"From - {start_date} To - {end_date}", filterdate_style)
        elements.append(filterdate)



        # Table data preparation
        data = [['First Name', 'Last Name', 'Email', 'Phone Number', 'Created At']]  # Table headers

        # Add user data to the table
        for user in users:
            data.append([user.fname, user.lname, user.emailid, user.phonenum, str(user.created_at.date())])

        # Create the table
        table = Table(data)

        # Style the table
        style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.Color(242/255, 242/255, 242/255)),  # Header background color
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.Color(50/255, 50/255, 50/255)),      # Header text color
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Center align all cells
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),  # Vertically align all cells in the middle
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),  # Header font
            ('BOTTOMPADDING', (0, 0), (-1, 0), 6),  # Padding for header row
            ('BACKGROUND', (0, 1), (-1, -1), colors.white),  # Body background color
            ('GRID', (0, 0), (-1, -1), 1, colors.lightgrey),  # Grid lines for the table
        ])

        table.setStyle(style)
        elements.append(Spacer(1, 12))  # Spacer for better layout
        elements.append(table)
        elements.append(Spacer(1, 20))  # Spacer after the table




        # Add concluding statement
        conclusion_style = ParagraphStyle(
            'ConclusionStyle',
            parent=styles['Normal'],
            spaceBefore=12,
            spaceAfter=12,
        )
        conclusion = Paragraph("Thank you for reviewing this report. For any further inquiries, please contact us.", conclusion_style)
        elements.append(conclusion)

        # Build the PDF
        doc.build(elements)

        # Get PDF from the buffer
        pdf = buffer.getvalue()
        buffer.close()

        # Create HTTP response with PDF
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="user_report.pdf"'

        return response

    except ValidationError as e:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)  # Return HTTP 400 for validation errors

    except Exception as e:
        return HttpResponse("An error occurred.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def user_report(request):
    users = usertable.objects.all()  # Retrieve all users
    return render(request, 'user_report.html', {'users': users})



