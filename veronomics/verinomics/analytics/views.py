from django.shortcuts import render
from .models import *
from django.db.models import Count
from django.views import View
from django.http import JsonResponse


def page_stats(request):
    # Query for total number of page views
    total_views = PageView.objects.count()

    # Query for page views grouped by page URL
    views_per_page = PageView.objects.values('page_url').annotate(view_count=Count('id')).order_by('-view_count')

    # Query for page views grouped by user
    views_per_user = PageView.objects.values('user__username').annotate(user_view_count=Count('id')).order_by('-user_view_count')

    context = {
        'total_views': total_views,
        'views_per_page': views_per_page,
        'views_per_user': views_per_user,
    }

    return render(request, 'page_views.html', context)


'''class IncrementLikesView(View):
    def get(self, request, *args, **kwargs):
        counter, created = Likes.objects.get_or_create(id=1)  # the only view counter that we have
        counter.number_of_likes += 1 
        counter.save()  # Save the updated record

        return JsonResponse({'count': counter.count})'''
    

class IncrementViewsView(View):
    def get(self, request, *args, **kwargs):
        counter, created = Views.objects.get_or_create(id=1)  # the only view counter that we have
        counter.number_of_views += 1 
        counter.save()  # Save the updated record

        return JsonResponse({'count': counter.count})