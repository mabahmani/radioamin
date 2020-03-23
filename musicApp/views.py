from django.shortcuts import render
from django.views.generic import TemplateView

from musicApp.models import Music, Event


class HomePageView(TemplateView):
    template_name = "musicApp/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['top_chart'] = Music.objects.filter(top_chart=True).order_by('-pub_date')
        context['events'] = Event.objects.all().order_by('due_time')[:3]
        return context
