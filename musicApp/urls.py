from django.urls import path

from musicApp.views import HomePageView, search, ArtistDetailView, ArtistListView, EventDetailView, GenreListView

app_name = "musicApp"
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('playlist/<str:playlist_name>/', HomePageView.as_view(), name='home_with_playlist'),
    path('artist/<int:pk>/', ArtistDetailView.as_view(), name='artist_detail'),
    path('event/<int:pk>/', EventDetailView.as_view(), name='event_detail'),
    path('artists/', ArtistListView.as_view(), name='artists'),
    path('genres/', GenreListView.as_view(), name='genres'),
    path('ajax/search/', search, name='search'),
]
