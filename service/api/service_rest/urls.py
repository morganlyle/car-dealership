from django.urls import path

from .views import (
    api_list_appointments,
    api_list_technicians,
    api_show_appointments,
)


urlpatterns = [
    path('services/', api_list_appointments, name='api_list_appointments'),
    path('services/<int:pk>/', api_show_appointments, name='api_show_appointments'),
    path('technicians/', api_list_technicians, name='api_list_technicians'),
]