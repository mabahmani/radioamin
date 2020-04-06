from django.urls import path

from account.views import sign_up

app_name = "account"
urlpatterns = [
    path('register/', sign_up, name='sign_up'),
]
