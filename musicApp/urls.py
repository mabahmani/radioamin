from django.urls import path

from musicApp.views import HomePageView, search

app_name = "musicApp"
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('<str:playlist_name>/', HomePageView.as_view(), name='home_with_playlist'),
    path('ajax/search/', search, name='search'),
]
