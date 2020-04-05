# Generated by Django 3.0.4 on 2020-04-05 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('musicApp', '0009_auto_20200326_1908'),
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='musicappaccount',
            name='favorite',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='musicApp.Music'),
        ),
        migrations.AlterField(
            model_name='musicappaccount',
            name='history',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_history', to='musicApp.Music'),
        ),
    ]