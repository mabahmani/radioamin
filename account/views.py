from django.http import HttpResponse
from django.shortcuts import render


def sign_up(request):
    email = request.POST.get('email', None)
    password = request.POST.get('password', None)

    return HttpResponse(email + password)
