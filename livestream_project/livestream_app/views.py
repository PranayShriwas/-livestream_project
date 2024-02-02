# livestream_app/views.py
from rest_framework import viewsets
from .models import Overlay
from .serializers import OverlaySerializer

class OverlayViewSet(viewsets.ModelViewSet):
    queryset = Overlay.objects.all()
    serializer_class = OverlaySerializer
