# livestream_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OverlayViewSet

router = DefaultRouter()
router.register(r'overlays', OverlayViewSet, basename='overlay')
urlpatterns = [
    path('api/', include(router.urls)),
]
