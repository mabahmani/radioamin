from django.db.models import Avg
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView

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
        return context
