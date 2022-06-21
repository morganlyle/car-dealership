from django.urls import path
from .views import (
    api_list_customers,
    api__list_salesrep,
    api_salesrep_detail,
    api_automobileVO,
    api_salesmade,
    

)
urlpatterns = [
    path("customers/", api_list_customers, name="customer-list"),
    path("customers/new/", api_list_customers, name="customer-new"),
    path("sales-reps/", api__list_salesrep, name="sales-rep-list"),
    path("sales/", api_salesmade, name="sales-made"),
    path("sales-reps/<int:employee_id>", api_salesrep_detail, name="sale-rep-detail"),
    path("cars/", api_automobileVO, name="car-inventory")

]