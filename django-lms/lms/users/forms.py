from django import forms
from .models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'mobile', 'password1', 'password2', 'role']

    def clean_role(self):
        role = self.cleaned_data.get('role')
        if role in ['admin', 'teacher']:
            raise forms.ValidationError("You cannot register as admin or teacher.")
        return role

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'profile_image']