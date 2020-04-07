from django.urls import path

from musicApp.views import HomePageView, search, ArtistDetailView, ArtistListView, EventDetailView, GenreListView, \
    SongDetailView, TopChartListView, NewReleaseListView, ClassicListView, AlbumListView, PlaylistListView, \
    AlbumDetailView, init_songs, get_playlist_songs, get_genre_songs, get_singer_songs, get_album_songs, \
    FreeMusicListView, increment_music_play, HistoryListView, FavoriteListView, SettingDetailView

app_name = "musicApp"
urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
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
    path('songs/free', FreeMusicListView.as_view(), name='songs_free'),
    path('playlists/', PlaylistListView.as_view(), name='playlists'),
    path('favorites/', FavoriteListView.as_view(), name='favorites'),
    path('history/', HistoryListView.as_view(), name='history'),
    path('setting/', SettingDetailView.as_view(), name='setting'),
    path('ajax/search/', search, name='search'),
    path('ajax/init_songs/', init_songs, name='init_songs'),
    path('ajax/get_playlist_songs/', get_playlist_songs, name='get_playlist_songs'),
    path('ajax/get_genre_songs/', get_genre_songs, name='get_genre_songs'),
    path('ajax/get_singer_songs/', get_singer_songs, name='get_singer_songs'),
    path('ajax/get_album_songs/', get_album_songs, name='get_album_songs'),
    path('ajax/increment_plays/', increment_music_play, name='increment_plays'),
]
