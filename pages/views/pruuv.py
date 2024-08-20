from django.views.generic import TemplateView, View
from django.http import HttpResponse


class PruuvView(TemplateView):
    """Pruuv view."""

    template_name = "pages/pruuv.html"
