import json

from django.db.models import Avg
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView, DetailView, ListView

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

    @staticmethod
    def get_init_playlist(playlist_name):
        if playlist_name == 'top_chart':
            return Music.objects.filter(top_chart=True).order_by('-pub_date')[:12]
        else:
            return Music.objects.filter(playlist__name=playlist_name)

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
        if 'playlist_name' in self.kwargs:
            context['current_playlist'] = self.get_init_playlist(self.kwargs['playlist_name'])
        else:
            context['current_playlist'] = self.get_init_playlist('top_chart')
        return context


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


class ArtistDetailView(DetailView):
    model = Singer

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tracks'] = Music.objects.filter(singer=self.object).order_by('-pub_date')[:12]
        context['albums'] = Album.objects.filter(singer=self.object).order_by('-pub_date')[:12]
        return context


class ArtistListView(ListView):
    model = Singer


class EventDetailView(DetailView):
    model = Event


class GenreListView(ListView):
    model = Genre


class SongDetailView(DetailView):
    model = Music

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['album_songs'] = Music.objects.filter(album=self.object.album)
        return context


class AlbumDetailView(DetailView):
    model = Album


class TopChartListView(ListView):
    queryset = Music.objects.filter(top_chart=True).order_by('-pub_date')


class NewReleaseListView(ListView):
    queryset = Music.objects.all().order_by('-pub_date')


class ClassicListView(ListView):
    queryset = classic = Music.objects.filter(genre__name='Classic')


class AlbumListView(ListView):
    model = Album


class PlaylistListView(ListView):
    model = Playlist
