import json

from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


def sign_up(request):
    email = request.POST.get('email', None)
    password = request.POST.get('password', None)
    response = {}

    if User.objects.filter(username=email).exists():
        response['status'] = 'error'
        response['msg'] = 'user already exist.'
        return JsonResponse(json.dumps(response), safe=False)
    else:
        User.objects.create_user(email, email, password)
        response['status'] = 'ok'
        response['msg'] = 'user created'
        return JsonResponse(json.dumps(response), safe=False)
