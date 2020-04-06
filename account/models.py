from django.contrib.auth.models import User
from django.db import models


def user_directory_path(instance, filename):
    return '{0}/{1}/{2}'.format('user', instance.user.email, filename)


class MusicAppAccount(models.Model):
    PLAN_BASIC = 1
    PLAN_PRIME = 2
    plan_choices = [
        (PLAN_BASIC, 'basic'),
        (PLAN_PRIME, 'prime'),
    ]

    STREAM_QUALITY_320 = 320
    STREAM_QUALITY_128 = 128
    stream_quality_choices = [
        (STREAM_QUALITY_320, '320kb'),
        (STREAM_QUALITY_128, '128kb'),
    ]

    user = models.OneToOneField(User, on_delete=models.PROTECT)
    display_name = models.CharField(max_length=25)
    location = models.CharField(max_length=25)
    about = models.TextField()
    avatar = models.ImageField(upload_to=user_directory_path)
    created_date = models.DateTimeField(auto_now_add=True)
    plan = models.PositiveIntegerField(choices=plan_choices, default=1)
    plan_expire = models.DateTimeField(blank=True, null=True)
    setting_get_email = models.BooleanField(default=True)
    setting_get_sms = models.BooleanField(default=False)
    setting_normalize_volume = models.BooleanField(default=True)
    setting_stream_quality = models.PositiveIntegerField(choices=stream_quality_choices, default=320)
    setting_theme_night_mode = models.BooleanField(default=False)
    favorite = models.ManyToManyField('musicApp.Music', blank=True)
    history = models.ManyToManyField('musicApp.Music', related_name='user_history', blank=True)
