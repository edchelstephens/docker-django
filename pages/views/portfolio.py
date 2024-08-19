from django.views.generic import TemplateView, View
from django.http import HttpResponse


class PortFolioView(TemplateView):
    """Portfolio view."""

    template_name = "pages/portfolio.html"
