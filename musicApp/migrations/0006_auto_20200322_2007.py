# Generated by Django 3.0.4 on 2020-03-22 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0005_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='phone',
            field=models.CharField(max_length=20),
        ),
    ]
