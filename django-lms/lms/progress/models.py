from django.db import models
from users.models import User

class Progress(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)

    course = models.CharField(max_length=200)

    completed = models.IntegerField(default=0)

    total = models.IntegerField(default=100)