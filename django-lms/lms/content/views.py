from django.shortcuts import render

def content_home(request):
    return render(request, 'content/home.html')