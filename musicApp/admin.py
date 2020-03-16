from django.contrib import admin

from musicApp.models import Music, Singer, Genre, Album, Playlist

admin.site.register(Music)
admin.site.register(Singer)
admin.site.register(Genre)
admin.site.register(Album)
admin.site.register(Playlist)
