from django.urls import path

from pages.views import portfolio

urlpatterns = [path("", portfolio.index, name="index")]
