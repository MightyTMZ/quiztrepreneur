import time
from .models import PageView
from django.utils.deprecation import MiddlewareMixin

class AnalyticsMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.method == "GET":
            user = request.user if request.user.is_authenticated else None
            ip_address = request.META.get('REMOTE_ADDR')
            user_agent = request.META.get('HTTP_USER_AGENT', '')

            # Store the page view
            PageView.objects.create(
                user=user,
                page_url=request.path,
                ip_address=ip_address,
                user_agent=user_agent
            )

    def process_response(self, request, response):
        return response
