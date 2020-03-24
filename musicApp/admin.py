from django.contrib import admin

from musicApp.models import Music, Singer, Genre, Album, Playlist, Event, MusicPlay


class MusicAdmin(admin.ModelAdmin):
    search_fields = ['name']
    filter_horizontal = ('genre', )
    autocomplete_fields = ('singer', )


class SingerAdmin(admin.ModelAdmin):
    search_fields = ['name']


admin.site.register(Music, MusicAdmin)
admin.site.register(Singer, SingerAdmin)
admin.site.register(Genre)
admin.site.register(Album)
admin.site.register(Playlist)
admin.site.register(Event)
admin.site.register(MusicPlay)
