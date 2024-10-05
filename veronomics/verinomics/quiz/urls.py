from django.urls import path
from . import views

urlpatterns = [
    path("questions/list-all/", views.QuestionList.as_view(), name="question-list"), 
    path("questions/search-by-category/", views.CategorySearch.as_view(), name="question-by-category"), 
    path("questions/pick-one-random/", views.RandomQuestionView.as_view(), name="random-question"),
    path("categories/", views.ListOfCategories.as_view(), name="list-of-categories"),
    path("questions/difficulty/", views.DifficultySearch.as_view(), name="search-by-difficulty")
]