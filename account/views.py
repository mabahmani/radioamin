import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

from account.models import MusicAppAccount
from musicApp.models import Music


def sign_up(request):
    if request.POST and request.is_ajax():
        email = request.POST.get('email', None)
        password = request.POST.get('password', None)
        response = {}

        if User.objects.filter(username=email).exists():
            response['status'] = 'error'
            response['msg'] = 'user already exist.'
            return JsonResponse(response, safe=False)
        else:
            new_user = User.objects.create_user(email, email, password)
            MusicAppAccount.objects.create(user=new_user)
            response['status'] = 'ok'
            response['msg'] = 'user created'

            user = authenticate(username=email, password=password)
            if user is not None:
                login(request, user)

            return JsonResponse(response, safe=False)


def sign_in(request):
    if request.POST and request.is_ajax():
        email = request.POST.get('email', None)
        password = request.POST.get('password', None)
        response = {}

        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            response['status'] = 'ok'
            response['msg'] = 'user created'
            return JsonResponse(response, safe=False)

        else:
            response['status'] = 'error'
            response['msg'] = 'username or password is incorrect.'
            return JsonResponse(response, safe=False)


def log_out(request):
    logout(request)
    return redirect('/')


def add_history(request):
    if request.is_ajax():
        if request.user.is_authenticated:
            musicAppUser = MusicAppAccount.objects.get(user__email=request.user.email)
            music_name = request.GET.get('music_name', None)
            singer_name = request.GET.get('singer_name', None)
            music = Music.objects.get(name=music_name, singer__name=singer_name)
            musicAppUser.history.add(music)
            musicAppUser.save()
        return JsonResponse({'msg': 'success'}, safe=False)


def add_favorite(request):
    if request.is_ajax():
        if request.user.is_authenticated:
            musicAppUser = MusicAppAccount.objects.get(user__email=request.user.email)
            music_name = request.GET.get('music_name', None)
            singer_name = request.GET.get('singer_name', None)
            music = Music.objects.get(name=music_name, singer__name=singer_name)
            musicAppUser.favorite.add(music)
            musicAppUser.save()
        return JsonResponse({'msg': 'success'}, safe=False)


def change_profile(request):
    if request.POST:
        musicAppUser = MusicAppAccount.objects.get(user__email=request.user.email)
        avatar = request.FILES.get('avatar_file')
        firstName = request.POST.get('firstName')
        lastName = request.POST.get('lastName')
        displayName = request.POST.get('displayName')
        userType = request.POST.get('userType')
        location = request.POST.get('location')
        about = request.POST.get('about')

        if avatar is not None:
            musicAppUser.avatar = avatar
        musicAppUser.user.first_name = firstName
        musicAppUser.user.last_name = lastName
        musicAppUser.display_name = displayName
        musicAppUser.location = location
        musicAppUser.about = about
        musicAppUser.save()
        musicAppUser.user.save()
        return redirect('musicApp:profile')
