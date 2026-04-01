from django.db import models
from users.models import User

class Payment(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)

    amount = models.IntegerField()

    status = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)