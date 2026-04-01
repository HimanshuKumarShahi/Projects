from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(email):

    send_mail(
        "Welcome to LMS",
        "Welcome to our learning platform.",
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False
    )