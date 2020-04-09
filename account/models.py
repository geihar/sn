from django.db import models
from django.conf import settings
from PIL import Image


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)

    def __str__(self):
        return f'Profile for user {self.user.username}'

    def save(self):
        super().save()
        photo = Image.open(self.photo.path)

        if photo.height > 128 or photo.width > 128:
            resize = (128, 128)
            photo.thumbnail(resize)
            photo.save(self.photo.path)
