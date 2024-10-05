from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class PageView(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    page_url = models.CharField(max_length=200)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.page_url} viewed at {self.timestamp} by {self.user}'
    


class Likes(models.Model):
    number_of_likes = models.IntegerField(default=0)

class Views(models.Model):
    number_of_views = models.IntegerField(default=0)




