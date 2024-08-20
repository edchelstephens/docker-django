from django.urls import path

from pages.views import portfolio
from pages.views import pruuv

urlpatterns = [
    path("", pruuv.PruuvView.as_view(), name="index"),
    path("dev", portfolio.PortFolioView.as_view(), name="portfolio"),
]
