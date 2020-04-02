from django.urls import path

from musicApp.views import HomePageView, search, ArtistDetailView, ArtistListView, EventDetailView, GenreListView, \
    SongDetailView, TopChartListView, NewReleaseListView, ClassicListView, AlbumListView, PlaylistListView, \
    AlbumDetailView, init_songs, get_playlist_songs, get_genre_songs, get_singer_songs

app_name = "musicApp"
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('playlist/<str:playlist_name>/', HomePageView.as_view(), name='home_with_playlist'),
    path('artist/<int:pk>/', ArtistDetailView.as_view(), name='artist_detail'),
    path('event/<int:pk>/', EventDetailView.as_view(), name='event_detail'),
    path('song/<int:pk>/', SongDetailView.as_view(), name='song_detail'),
    path('album/<int:pk>/', AlbumDetailView.as_view(), name='album_detail'),
    path('artists/', ArtistListView.as_view(), name='artists'),
    path('genres/', GenreListView.as_view(), name='genres'),
    path('songs/top_chart/', TopChartListView.as_view(), name='songs_top_chart'),
    path('songs/new_release/', NewReleaseListView.as_view(), name='songs_new_release'),
    path('songs/classic/', ClassicListView.as_view(), name='songs_classic'),
    path('albums/', AlbumListView.as_view(), name='albums'),
    path('playlists/', PlaylistListView.as_view(), name='playlists'),
    path('ajax/search/', search, name='search'),
    path('ajax/init_songs/', init_songs, name='init_songs'),
    path('ajax/get_playlist_songs/', get_playlist_songs, name='get_playlist_songs'),
    path('ajax/get_genre_songs/', get_genre_songs, name='get_genre_songs'),
    path('ajax/get_singer_songs/', get_singer_songs, name='get_singer_songs'),
]
