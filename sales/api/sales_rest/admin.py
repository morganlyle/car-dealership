from django.contrib import admin
from .models import (
    SaleRecord,
    SalesRep, 
    Customer, 
    AutoMobileInventoryVO
    )
# Register your models here.


@admin.register(SaleRecord)
class SaleRecordAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesRep)
class SalesRepAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(AutoMobileInventoryVO)
class AutoMobileInventoryVOAdmin(admin.ModelAdmin):
    pass