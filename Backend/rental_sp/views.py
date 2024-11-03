import csv
import os
import pandas as pd
from openpyxl import Workbook
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

from io import BytesIO
import uuid
import json
from pyexpat.errors import messages

from django.template.loader import render_to_string
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
import os
from django.conf import settings

from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes


from .models import buss_vehicle, business_user
from .serializers import BussVehicleSerializer

# Create your views here.


@api_view(['GET'])
def list_buss_vehicles(request):
    vehicles = buss_vehicle.objects.all()
    serializer = BussVehicleSerializer(vehicles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_buss_vehicle_data(request):
    try:
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # Filter get_vehicle_data based on provided dates
        get_vehicle_data = buss_vehicle.objects.all()

        if start_date:
            parsed_start_date = parse_datetime(start_date)
            if not parsed_start_date:
                raise ValidationError("Invalid start date format.")
            get_vehicle_data = get_vehicle_data.filter(buss_vehicle_registered_at__gte=parsed_start_date)

        if end_date:
            parsed_end_date = parse_datetime(end_date)
            if not parsed_end_date:
                raise ValidationError("Invalid end date format.")
            get_vehicle_data = get_vehicle_data.filter(buss_vehicle_registered_at__lte=parsed_end_date)

        serializer = BussVehicleSerializer(get_vehicle_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": "An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





@api_view(['GET'])
def export_vehicle_report_in_pdf(request):
    # Get filtered vehicle data using the get_buss_vehicle_data logic
    response_data = get_buss_vehicle_data(request._request)

    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    if response_data.status_code != status.HTTP_200_OK:
        return JsonResponse({"error": "Failed to fetch vehicle data"}, status=response_data.status_code)

    vehicle_data = response_data.data

    # Create PDF buffer
    buffer = BytesIO()
    
    # Use landscape mode if the table is large
    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter), rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=18)
    elements = []

    # Add Logo (Optional)
    logo_path = os.path.join(settings.MEDIA_ROOT, 'reports/vehicle_Reports_Icon/profile-user.png')
    if os.path.exists(logo_path):
        logo = Image(logo_path, width=1 * inch, height=1 * inch)
        elements.append(logo)
    elements.append(Spacer(1, 12))

    # Title and description
    styles = getSampleStyleSheet()
    title = Paragraph("Company Vehicle Report", styles['Title'])
    elements.append(title)

    elements.append(Spacer(1, 12))
    current_datetime = datetime.now().strftime("%B %d, %Y, %I:%M:%S %p")  # e.g., "October 15, 2024, 07:16:17 PM"
    generated_on = Paragraph(f"Generated on: {current_datetime}", styles['Normal'])
    elements.append(generated_on)
    elements.append(Spacer(1, 10))

    description_style = ParagraphStyle(
        'DescriptionStyle',
        parent=styles['Normal'],
        spaceBefore=12,
        spaceAfter=12,
    )
    description = Paragraph(
        "This report contains detailed information on the vehicles listed in the system, including the company, model, color, and rental details.",
        styles['Normal']
    )
    elements.append(description)
    # Filter date information
    filterdate_style = ParagraphStyle(
            'FilterdateStyle',
            parent=styles['Normal'],
            spaceBefore=12,
            spaceAfter=12,
            fontSize=10,
    )
    
    if start_date or end_date:
        if start_date and end_date:
            filterdate = Paragraph(f"All the registered vehicles between - {start_date} to - {end_date}", filterdate_style)
        elif start_date:
            filterdate = Paragraph(f"All the registered vehicles from - {start_date} to - {current_datetime}", filterdate_style)
        elif end_date:
            filterdate = Paragraph(f"All the registered vehicles till - {end_date}", filterdate_style)
    else:
        filterdate = Paragraph(f"All the registered vehicles till - {current_datetime}", filterdate_style)

    elements.append(filterdate)
    
    elements.append(Spacer(1, 20))

    # Table data preparation
    data = [
        ['Vehicle ID', 'Vehicle Owner', 'Company', 'Model', 'Color', 'Type', 'Location', 'Rent Per Day', 'Discounted Rent']
    ]

    # Populate table data
    if not vehicle_data:
        elements.append(Paragraph("No vehicles found for the selected date range.", styles['Normal']))
    else:
        for vehicle in vehicle_data:
            discounted_rent = vehicle.get('discounted_rent', 'N/A')  # Adjust field based on your serializer
            data.append([
                vehicle.get('id'),
                vehicle.get('buss_vehicle_owner_email'),  # Get owner email if available
                vehicle.get('buss_vehicle_company_name'),
                vehicle.get('buss_vehicle_model'),
                vehicle.get('buss_vehicle_color'),
                vehicle.get('buss_vehicle_type'),
                vehicle.get('buss_vehicle_location'),
                vehicle.get('buss_rent_per_day'),  # Format price as currency
                discounted_rent,  # Format discounted rent as currency
            ])

    # Adjust column widths dynamically
    # col_widths = [0.9 * inch, 2 * inch, 1.5 * inch, 1.2 * inch, 1 * inch, 1.2 * inch, 1.5 * inch, 1.2 * inch, 1.2 * inch]

    # # Create the table
    # table = Table(data, colWidths=col_widths)
    table = Table(data)

    # Style the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f2f2f2')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor("#323232")),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('TOPPADDING', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('LEFTPADDING', (0, 0), (-1, 0), 15),
        ('RIGHTPADDING', (0, 0), (-1, 0), 15),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.HexColor('#f2f4f7')]),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
        ('ALIGN', (0, 1), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 1), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#d1d1d1')),
    ])

    table.setStyle(style)

    # Add table to the document
    elements.append(Spacer(1, 10))
    elements.append(KeepTogether(table))
    elements.append(Spacer(1, 20))

    
    # Build the PDF
    doc.build(elements)

    # Get the PDF content
    pdf = buffer.getvalue()
    buffer.close()

    # Return the PDF as a response
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="vehicle_report.pdf"'

    return response







# @api_view(['GET'])
# def export_vehicle_report_in_pdf(request):
#     # Get filtered vehicle data using the get_buss_vehicle_data logic
#     # Pass the original DRF request object for API functionality
#     response_data = get_buss_vehicle_data(request._request)
#     print("response_data ::",response_data)
#     if response_data.status_code != status.HTTP_200_OK:
#         print("Error :: Failed to fetch vehicle data xx")
#         return JsonResponse({"error": "Failed to fetch vehicle data"}, status=response_data.status_code)

#     vehicle_data = response_data.data
#     print("vehicle_data ::",vehicle_data)
#     # Now generate the PDF (this part needs the standard Django HttpRequest object)
#     buffer = BytesIO()
#     doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=18)
#     elements = []

#     # Add Logo
#     logo_path = os.path.join(settings.MEDIA_ROOT, 'reports/vehicle_Reports_Icon/pencil_drawing_and_sketches.jpg')
#     if os.path.exists(logo_path):
#         logo = Image(logo_path, width=1.5 * inch, height=1.5 * inch)
#         elements.append(logo)

#     elements.append(Spacer(1, 12))

#     # Title
#     styles = getSampleStyleSheet()
#     title = Paragraph("Company Vehicle Report", styles['Title'])
#     elements.append(title)

#     elements.append(Spacer(1, 12))

#     description = Paragraph(
#         "This report contains detailed information on the vehicles listed in the system, including the company, model, color, and rental details.",
#         styles['Normal']
#     )
#     elements.append(description)

#     elements.append(Spacer(1, 20))

#     # Table data preparation
#     data = [
#         ['Vehicle ID', 'Vehicle Owner', 'Company', 'Model', 'Color', 'Type', 'Location', 'Rent Per Day', 'Discounted Rent']
#     ]

#     # Check if vehicle data is found
#     if not vehicle_data:
#         elements.append(Paragraph("No vehicles found for the selected date range.", styles['Normal']))
#     else:
#         for vehicle in vehicle_data:
#             discounted_rent = vehicle.get('discounted_rent', 'N/A')  # Adjust field based on your serializer
#             data.append([
#                 vehicle.get('buss_vehicle_id'),
#                 vehicle.get('buss_vehicle_owner'),
#                 vehicle.get('buss_vehicle_company_name'),
#                 vehicle.get('buss_vehicle_model'),
#                 vehicle.get('buss_vehicle_color'),
#                 vehicle.get('buss_vehicle_type'),
#                 vehicle.get('buss_vehicle_location'),
#                 vehicle.get('buss_rent_per_day'),  # Format price as currency
#                 discounted_rent,  # Format discounted rent as currency
#             ])

#         # Adjust column widths for readability
#         table = Table(data, colWidths=[0.9 * inch, 1.8 * inch, 1.5 * inch, 1.2 * inch, 1 * inch, 1.2 * inch, 1.5 * inch, 1.2 * inch, 1.2 * inch])

#         # Style the table
#         style = TableStyle([
#             ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2E3B55')),
#             ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
#             ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
#             ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
#             ('FONTSIZE', (0, 0), (-1, 0), 12),
#             ('BOTTOMPADDING', (0, 0), (-1, 0), 14),
#             ('BACKGROUND', (0, 1), (-1, -1), colors.white),
#             ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.HexColor('#f2f4f7')]),
#             ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
#             ('ALIGN', (0, 1), (-1, -1), 'CENTER'),
#             ('VALIGN', (0, 1), (-1, -1), 'MIDDLE'),
#             ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#d1d1d1')),
#             ('LEFTPADDING', (0, 0), (-1, -1), 10),
#             ('RIGHTPADDING', (0, 0), (-1, -1), 10),
#             ('TOPPADDING', (0, 1), (-1, -1), 8),
#             ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
#             ('WORDWRAP', (0, 1), (-1, -1), 'CJK'),
#             ('FONTSIZE', (0, 1), (-1, -1), 10),
#             ('ALIGN', (1, 1), (1, -1), 'LEFT'),
#             ('ALIGN', (2, 1), (2, -1), 'LEFT'),
#         ])

#         table.setStyle(style)

#         # Ensure the table splits properly across pages
#         elements.append(KeepTogether(table))

#     # Build the PDF
#     doc.build(elements)

#     # Get the PDF content
#     pdf = buffer.getvalue()
#     buffer.close()

#     # Return the PDF as a response
#     response = HttpResponse(pdf, content_type='application/pdf')
#     response['Content-Disposition'] = 'attachment; filename="vehicle_report.pdf"'

#     return response




@api_view(['GET'])
def export_vehicle_report_in_excel(request):
    # Get filtered vehicle data using the get_buss_vehicle_data logic
    response_data = get_buss_vehicle_data(request._request)

    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    # Initialize query for vehicles
    vehicles = response_data.data

    current_datetime = datetime.now().strftime("%B %d, %Y, %I:%M:%S %p")  # e.g., "October 15, 2024, 07:16:17 PM"

    # Create an Excel workbook
    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Vehicle Report"

    # Add generated date at the top of the sheet
    sheet.append([f"Generated on: {current_datetime}"])
    
    # Leave a blank row for better readability
    sheet.append([])

    # Filter vehicles based on the date range if provided
    if start_date or end_date:
        if start_date and end_date:
            sheet.append([f"All the registered vehicles between - {start_date} to - {end_date}"])
        elif start_date:
            sheet.append([f"All the registered vehicles from - {start_date} to - {current_datetime}"])
        elif end_date:
            sheet.append([f"All the registered vehicles till - {end_date}"])
    else:
        sheet.append([f"All the registered vehicles till - {current_datetime}"])
    
    # Leave another blank row for separation
    sheet.append([])

    # Add headers
    headers = ['Vehicle ID', 'Vehicle Owner', 'Company', 'Model', 'Color', 'Type', 'Location', 'Rent Per Day', 'Discounted Rent']
    sheet.append(headers)

    # Add vehicle data
    for vehicle in vehicles:
        discounted_rent = vehicle.get('discounted_rent', 'N/A')  # Assuming you have this method
        sheet.append([
                vehicle.get('id'),
                vehicle.get('buss_vehicle_owner_email'),  # Get owner email if available
                vehicle.get('buss_vehicle_company_name'),
                vehicle.get('buss_vehicle_model'),
                vehicle.get('buss_vehicle_color'),
                vehicle.get('buss_vehicle_type'),
                vehicle.get('buss_vehicle_location'),
                vehicle.get('buss_rent_per_day'),  # Format price as currency
                discounted_rent,  # Format discounted rent as currency
        ])

    # Create an HTTP response with the Excel file
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="vehicle_report.xlsx"'
    workbook.save(response)

    return response