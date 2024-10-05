from django.shortcuts import render
from rest_framework import generics
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models.functions import Random
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import *
from .serializers import *


#All the questions
class QuestionList(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['category__title','question_text', 'question_source', 'options__option_text']


# Allows people to search for questions under a specific category
class CategorySearch(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['category__title']


# http://127.0.0.1:8000/quiz/questions/difficulty/?search=e --> Easy questions
# http://127.0.0.1:8000/quiz/questions/difficulty/?search=m --> Medium questions
# http://127.0.0.1:8000/quiz/questions/difficulty/?search=h --> Hard questions

class DifficultySearch(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['difficulty']


class ListOfCategories(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = SimpleCategorySerializer
    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class RandomQuestionView(APIView):
    def get(self, request, *args, **kwargs):
        random_question = Question.objects.order_by(Random()).first()
            
        if random_question:
            serializer = QuestionSerializer(random_question)
            return Response(serializer.data)
        else:
            return Response({"message": "No questions available"}, status=404)