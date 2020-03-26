from django.db.models import Avg
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView

from musicApp.models import Music, Event, MusicPlay


class HomePageView(TemplateView):
    template_name = "musicApp/home.html"

    @staticmethod
    def get_trending():
        music_avg = {}
        recent_music = Music.objects.all().order_by('-pub_date')[:30]

        for music in recent_music:
            music_avg[music.pk] = MusicPlay.objects.filter(music=music).aggregate(Avg('plays'))

        music_avg = sorted(music_avg.items(), key=lambda item: item[1])[:7]

        trending_music = list()
        for pk in music_avg:
            trending_music.append(Music.objects.get(pk=pk[0]))

        return trending_music

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')
        context['events'] = Event.objects.all().order_by('due_time')[:3]
        context['trending'] = self.get_trending()
        context['recent_music'] = Music.objects.all().order_by('-pub_date')[:7]
        context['all_time'] = Music.objects.all().order_by('-plays')[:7]
        context['new_release'] = Music.objects.all().order_by('-pub_date')[:12]
        return context
