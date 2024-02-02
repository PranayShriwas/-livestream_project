# livestream_app/serializers.py
from rest_framework import serializers
from .models import Overlay

class OverlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Overlay
        fields = ['id', 'content', 'position_x', 'position_y', 'size']
