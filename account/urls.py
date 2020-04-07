from django.urls import path

from account.views import sign_up, sign_in, log_out, add_history, add_favorite, change_profile

app_name = "account"
urlpatterns = [
    path('register/', sign_up, name='sign_up'),
    path('login/', sign_in, name='sign_in'),
    path('logout/', log_out, name='log_out'),
    path('change_profile/', change_profile, name='change_profile'),
    path('ajax/add_history/', add_history, name='add_history'),
    path('ajax/add_favorite/', add_favorite, name='add_favorite'),
]
