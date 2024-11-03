
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import export_vehicle_report_in_pdf, export_vehicle_report_in_excel, get_buss_vehicle_data, list_buss_vehicles

urlpatterns = [
    # path("", views.buss_index, name="buss_index"),
    # 
    path('api/get/all/vehicle/data/', list_buss_vehicles, name='buss-vehicles'),
    path('api/get/vehicle-report/', get_buss_vehicle_data, name='buss-vehicles'),
    # http://127.0.0.1:8000/rental_sp/api/get/vehicle-report/?start_date=2024-09-01&end_date=2024-10-16
    path('api/export/vehicle-report/in/pdf/', export_vehicle_report_in_pdf,name='export_vehicle_report_in_pdf'),
    # 127.0.0.1:8000/rental_sp/api/export/vehicle-report/in/pdf/?start_date=2024-09-01&end_date=2024-10-14
    path('api/export/vehicle-report/in/xlsx/', export_vehicle_report_in_excel,name='export_vehicle_report_in_excel'),
    # 
    # path('api/export/user-report/in/pdf/', export_user_report_in_pdf, name='export_user_report_in_pdf'),
    # # http://127.0.0.1:8000/api/export/user-report/in/pdf/?start_date=2024-10-11&end_date=2024-10-14
    # export_vehicle_report_in_pdf
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
