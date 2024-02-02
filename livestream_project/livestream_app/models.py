from django.db import models

class Overlay(models.Model):
    content = models.CharField(max_length=255)
    position_x = models.IntegerField()
    position_y = models.IntegerField()
    size = models.IntegerField()
    
    def __str__(self) -> str:
        return self.content