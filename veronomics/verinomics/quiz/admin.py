from django.contrib import admin
from .models import *


admin.site.register(Category)

class OptionInline(admin.StackedInline):
    model = Option
    extra = 5


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):

    inlines = [OptionInline]