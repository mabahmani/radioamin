import json

from django.db.models import Avg
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView, DetailView, ListView

from account.models import MusicAppAccount
from musicApp.models import Music, Event, MusicPlay, Singer, Playlist, Genre, Album


class HomePageView(TemplateView):
    template_name = "musicApp/home.html"

    @staticmethod
    def get_trending():
        music_avg = {}
        recent_music = Music.objects.all().order_by('-pub_date')[:30]

        for music in recent_music:
            music_avg[music.pk] = MusicPlay.objects.filter(music=music).aggregate(Avg('plays'))

        # music_avg = sorted(music_avg.items(), key=lambda item: item[1])[:7]

        trending_music = list()
        sorted_music_avg = sorted(music_avg)
        for pk in sorted_music_avg:
            trending_music.append(Music.objects.get(pk=pk))

        return trending_music

    @staticmethod
    def get_classics():
        classic = list()
        try:
            classicGenre = Genre.objects.get(name='Classic')
            classic = Music.objects.filter(genre=classicGenre)
            return classic
        except Genre.DoesNotExist:
            return classic

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        context['events'] = Event.objects.all().order_by('due_time')[:3]
        context['trending'] = self.get_trending()[:7]
        context['recent_music'] = Music.objects.all().order_by('-pub_date')[:7]
        context['all_time'] = Music.objects.all().order_by('-plays')[:7]
        context['new_release'] = Music.objects.all().order_by('-pub_date')[:12]
        context['featured_artists'] = Singer.objects.filter(featured=True)[:12]
        context['playlists'] = Playlist.objects.all()[:12]
        context['classics'] = self.get_classics()[:12]
        context['albums'] = Album.objects.all()[:12]
        context['genres'] = Genre.objects.all()[:12]
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]

        if self.request.user.is_authenticated:
            musicAppUser = MusicAppAccount.objects.get(user__email=self.request.user.email)
            context['favorites'] = musicAppUser.favorite.all()
            context['music_app_user'] = musicAppUser
        return context


def init_songs(request):
    if request.is_ajax():
        musics = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        songs_list = list()
        for song in musics:
            songJson = {'name': song.name, 'artist': song.singer.name, 'album': song.album.name, 'url': song.song.url,
                        'cover_art_url': song.cover.url}
            songs_list.append(songJson)
        return JsonResponse(songs_list, safe=False)


def get_playlist_songs(request):
    if request.is_ajax():
        playlist_name = request.GET.get('playlist', None)
        musics = Music.objects.filter(playlist__name=playlist_name).order_by('-pub_date')[:12]
        songs_list = list()
        for song in musics:
            songJson = {'name': song.name, 'artist': song.singer.name, 'album': song.album.name, 'url': song.song.url,
                        'cover_art_url': song.cover.url}
            songs_list.append(songJson)
        return JsonResponse(songs_list, safe=False)


def get_genre_songs(request):
    if request.is_ajax():
        genre_name = request.GET.get('genre', None)
        musics = Music.objects.filter(genre__name=genre_name).order_by('-pub_date')[:12]
        songs_list = list()
        for song in musics:
            songJson = {'name': song.name, 'artist': song.singer.name, 'album': song.album.name, 'url': song.song.url,
                        'cover_art_url': song.cover.url}
            songs_list.append(songJson)
        return JsonResponse(songs_list, safe=False)


def get_singer_songs(request):
    if request.is_ajax():
        singer_name = request.GET.get('singer', None)
        musics = Music.objects.filter(singer__name=singer_name).order_by('-pub_date')
        songs_list = list()
        for song in musics:
            songJson = {'name': song.name, 'artist': song.singer.name, 'album': song.album.name, 'url': song.song.url,
                        'cover_art_url': song.cover.url}
            songs_list.append(songJson)
        return JsonResponse(songs_list, safe=False)


def get_album_songs(request):
    if request.is_ajax():
        album_name = request.GET.get('album', None)
        musics = Music.objects.filter(album__name=album_name).order_by('-pub_date')
        songs_list = list()
        for song in musics:
            songJson = {'name': song.name, 'artist': song.singer.name, 'album': song.album.name, 'url': song.song.url,
                        'cover_art_url': song.cover.url}
            songs_list.append(songJson)
        return JsonResponse(songs_list, safe=False)


def search(request):
    data = {}
    artists = list()
    tracks = list()
    albums = list()
    if request.is_ajax():
        search_query = str(request.GET.get('search', None)).lower()
        if search_query == '':
            artists_queryset = Singer.objects.all().order_by('-pk')[:6]
            tracks_queryset = Music.objects.all().order_by('-pk')[:3]
            albums_queryset = Album.objects.all().order_by('-pk')[:3]
            print("list is empty")
        else:
            artists_queryset = Singer.objects.filter(name__contains=search_query)
            tracks_queryset = Music.objects.filter(name__contains=search_query)
            albums_queryset = Album.objects.filter(name__contains=search_query)

        for artist in artists_queryset:
            artist_dict = {'name': artist.name, 'cover': artist.cover.url}
            artists.append(artist_dict)

        for music in tracks_queryset:
            music_dict = {'name': music.name, 'singer': music.singer.name, 'cover': music.cover.url}
            tracks.append(music_dict)

        for album in albums_queryset:
            album_dict = {'name': album.name, 'cover': album.cover.url}
            albums.append(album_dict)

        data = {'artists': artists, 'tracks': tracks, 'albums': albums}

    return JsonResponse(data, safe=False)


def increment_music_play(request):
    if request.is_ajax():
        music_name = request.GET.get('music_name', None)
        singer_name = request.GET.get('singer_name', None)
        music = Music.objects.get(name=music_name, singer__name=singer_name)
        music.plays += 1
        music.save()
        return JsonResponse({'msg': 'success'}, safe=False)


class ArtistDetailView(DetailView):
    model = Singer

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tracks'] = Music.objects.filter(singer=self.object).order_by('-pub_date')[:12]
        context['albums'] = Album.objects.filter(singer=self.object).order_by('-pub_date')[:12]
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class ArtistListView(ListView):
    model = Singer

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class EventDetailView(DetailView):
    model = Event

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class GenreListView(ListView):
    model = Genre

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class SongDetailView(DetailView):
    model = Music

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['album_songs'] = Music.objects.filter(album=self.object.album)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class AlbumDetailView(DetailView):
    model = Album

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class TopChartListView(ListView):
    queryset = Music.objects.filter(top_chart=True).order_by('-pub_date')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class NewReleaseListView(ListView):
    queryset = Music.objects.all().order_by('-pub_date')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class ClassicListView(ListView):
    queryset = Music.objects.filter(genre__name='Classic')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class FreeMusicListView(ListView):
    queryset = Music.objects.filter(premium=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class AlbumListView(ListView):
    model = Album

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class PlaylistListView(ListView):
    model = Playlist

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class HistoryListView(ListView):

    def get_queryset(self):
        musicAppUser = MusicAppAccount.objects.get(user__email=self.request.user.email)
        return musicAppUser.history.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class FavoriteListView(ListView):

    def get_queryset(self):
        musicAppUser = MusicAppAccount.objects.get(user__email=self.request.user.email)
        return musicAppUser.favorite.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class SettingTemplateView(TemplateView):
    template_name = "musicApp/setting.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        return context

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class PlanTemplateView(TemplateView):
    template_name = "musicApp/plan.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context


class ProfileTemplateView(TemplateView):
    template_name = "musicApp/profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['music_app_user'] = MusicAppAccount.objects.get(user__email=self.request.user.email)
        context['search_artist_init'] = Singer.objects.all().order_by('-pk')[:6]
        context['search_music_init'] = Music.objects.all().order_by('-pk')[:3]
        context['search_album_init'] = Album.objects.all().order_by('-pk')[:3]
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        return context
