from django.urls import path

from .views import (
    api_cancelled_appointment,
    api_create_appointment,
    api_finished_appointment,
    api_list_appointments,
    api_list_technicians,
    api_show_appointments,
)


urlpatterns = [
    path('services/', api_list_appointments, name='api_list_appointments'),
    path('services/<int:pk>/', api_show_appointments, name='api_show_appointments'),
    path('services/finished/', api_finished_appointment, name='api_finished_appointment'),
    path('services/cancelled', api_cancelled_appointment, name='api_cancelled_appointment'),
    path('services/new', api_create_appointment, name='api_create_appointment'), 
    path('technicians/', api_list_technicians, name='api_list_technicians'),
]