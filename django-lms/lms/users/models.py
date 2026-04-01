from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField

ROLE_CHOICES = (
    ('student', 'Student'),
    ('teacher', 'Teacher'),
    ('admin', 'Admin'),
)

class User(AbstractUser):
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15, unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    profile_image = CloudinaryField('image', blank=True, null=True)

    def save(self, *args, **kwargs):
        # Prevent regular registration as admin
        if self.role == 'admin' and not self.pk:
            from django.core.exceptions import ValidationError
            raise ValidationError("Admin must be created by superuser only.")
        super().save(*args, **kwargs)