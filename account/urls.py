from django.urls import path

from account.views import sign_up, sign_in, log_out, add_history

app_name = "account"
urlpatterns = [
    path('register/', sign_up, name='sign_up'),
    path('login/', sign_in, name='sign_in'),
    path('logout/', log_out, name='log_out'),
    path('ajax/add_history/', add_history, name='add_history'),
]
