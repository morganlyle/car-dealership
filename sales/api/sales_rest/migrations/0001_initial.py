# Generated by Django 4.0.3 on 2022-06-17 23:29

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutoMobileInventoryVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vehicle_vin', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=200)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='SaleRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sale_price', models.PositiveIntegerField()),
                ('automobile', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='sales_rest.automobileinventoryvo')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='sales_rest.customer')),
            ],
        ),
        migrations.CreateModel(
            name='SalesRep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('employee_id', models.PositiveIntegerField(unique=True)),
                ('salesmade', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sales_rest.salerecord')),
            ],
        ),
        migrations.AddField(
            model_name='salerecord',
            name='sales_rep',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='sales_rest.salesrep'),
        ),
    ]