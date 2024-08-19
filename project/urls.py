from django.urls import path

from pages.views import portfolio

urlpatterns = [path("", portfolio.PortFolioView.as_view(), name="index")]
