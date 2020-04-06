from django.urls import path

from account.views import sign_up, sign_in

app_name = "account"
urlpatterns = [
    path('register/', sign_up, name='sign_up'),
    path('login/', sign_in, name='sign_in'),
]
