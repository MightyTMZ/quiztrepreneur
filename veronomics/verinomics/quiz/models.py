from django.db import models
from ckeditor.fields import RichTextField


class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title


class Question(models.Model):

    QUESTION_DIFFICULTY = [
        ('E', "Easy"),
        ('M', "Medium"),
        ('H', "Hard"),
    ]


    category = models.ManyToManyField(Category)
    question_source = models.CharField(max_length=255)
    question_text = RichTextField()
    explanation = RichTextField()
    difficulty = models.CharField(max_length=1, choices=QUESTION_DIFFICULTY, default="M")

    def __str__(self) -> str:
        return f"{self.id} - {self.question_source}"


class Option(models.Model):
    option_text = RichTextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    correct = models.BooleanField(default=False)