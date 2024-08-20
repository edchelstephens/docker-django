from django.views.generic import TemplateView


class PortFolioView(TemplateView):
    """Portfolio view."""

    template_name = "pages/portfolio.html"
