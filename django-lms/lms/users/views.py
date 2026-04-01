from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import UserRegisterForm, UserUpdateForm
from notifications.email_service import send_welcome_email
from django.contrib.auth.decorators import login_required

def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard', username=request.user.username)
    form = UserRegisterForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('login')
    return render(request, 'register.html', {'form': form})


def login_view(request):

    if request.method == "POST":

        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return redirect("dashboard", username=user.username)

    return render(request, "login.html")



@login_required
def dashboard_view(request, username):
    if request.user.username != username:
        return redirect('dashboard', username=request.user.username)
    return render(request, 'dashboard.html')


def logout_view(request):
    logout(request)
    return redirect("home")

@login_required
def settings_view(request):
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('dashboard', username=request.user.username)
    else:
        form = UserUpdateForm(instance=request.user)
    return render(request, 'settings.html', {'form': form})

def home_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard', username=request.user.username)
    return render(request, 'home.html')