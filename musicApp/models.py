from django.db import models
from datetime import timedelta, date


def music_directory_path(instance, filename):
    return '{0}/{1}/{2}/{3}'.format(instance.singer, instance.album.name, instance.name, filename)


def album_directory_path(instance, filename):
    return '{0}/{1}/{2}'.format(instance.singer, instance.name, filename)


def playlist_directory_path(instance, filename):
    return '{0}/{1}/{2}'.format('playlist', instance.name, filename)


def singer_directory_path(instance, filename):
    return '{0}/{1}'.format(instance.name, filename)


def event_directory_path(instance, filename):
    return '{0}/{1}/{2}'.format('event', instance.name, filename)


class Music(models.Model):
    name = models.CharField(max_length=50, null=False, default='Unnamed')
    singer = models.ForeignKey('Singer', on_delete=models.CASCADE, null=False)
    genre = models.ManyToManyField('Genre')
    album = models.ForeignKey('Album', on_delete=models.CASCADE)
    pub_date = models.DateField(auto_now_add=True)
    plays = models.PositiveIntegerField(default=0)
    lyrics = models.TextField(null=True, blank=True)
    music = models.CharField(max_length=50, null=True, blank=True)
    song_writer = models.CharField(max_length=50, null=True, blank=True)
    arrangement = models.CharField(max_length=50, null=True, blank=True)
    mix_mastering = models.CharField(max_length=50, null=True, blank=True)
    cover_art = models.CharField(max_length=50, null=True, blank=True)
    top_chart = models.BooleanField(default=False)
    premium = models.BooleanField(default=False)
    song = models.FileField(upload_to=music_directory_path)
    cover = models.ImageField(upload_to=music_directory_path, blank=True)

    def __str__(self):
        return self.name


class MusicPlay(models.Model):
    music = models.ForeignKey('Music', on_delete=models.CASCADE)
    datePlay = models.DateField()
    plays = models.PositiveIntegerField(default=0)

    @staticmethod
    def increment_play(music, date_today):
        try:
            mPlay = MusicPlay.objects.get(datePlay=date_today - timedelta(days=7), music=music)
            mPlay.datePlay = date_today
            mPlay.plays += 1
            mPlay.save()

        except MusicPlay.DoesNotExist:
            try:
                mPlay = MusicPlay.objects.get(datePlay=date_today, music=music)
                mPlay.plays += 1
                mPlay.save()
            except MusicPlay.DoesNotExist:
                mPlay = MusicPlay(music=music, datePlay=date_today, plays=1)
                mPlay.save()

    def __str__(self):
        return '{0}/{1}/{2}'.format(self.music, self.datePlay, self.plays)


class Genre(models.Model):
    name = models.CharField(max_length=50, null=False, default='Unnamed')

    def __str__(self):
        return self.name


class Singer(models.Model):
    name = models.CharField(max_length=50, null=False, default='Unknown')
    biography = models.TextField(null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    follows = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    cover = models.ImageField(upload_to=singer_directory_path, blank=True)

    def __str__(self):
        return self.name


class Album(models.Model):
    name = models.CharField(max_length=50, null=False, default='Unnamed')
    pub_date = models.DateField(null=True, blank=True)
    singer = models.ForeignKey('Singer', on_delete=models.CASCADE)
    cover = models.ImageField(upload_to=album_directory_path, blank=True)

    def __str__(self):
        return '{0} / {1}'.format(self.singer, self.name)


class Playlist(models.Model):
    name = models.CharField(max_length=50, null=False, default='Unnamed')
    cover = models.ImageField(upload_to=playlist_directory_path, blank=True, null=False)
    songs = models.ManyToManyField('Music')

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=50, null=False, default='Unnamed')
    info = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=False)
    email = models.EmailField(null=True, blank=True)
    due_time = models.DateTimeField()
    image = models.ImageField(upload_to=event_directory_path, blank=True)
    background_image = models.ImageField(upload_to=event_directory_path, blank=True)

    def __str__(self):
        return self.name
