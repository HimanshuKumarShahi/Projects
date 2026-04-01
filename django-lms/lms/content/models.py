from django.db import models
from courses.models import Course
from cloudinary.models import CloudinaryField

CONTENT_TYPE = (
    ('pdf', 'PDF'),
    ('video', 'Video'),
    ('book', 'Book'),
)

class Content(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE)
    file = CloudinaryField('file')
    uploaded_by = models.ForeignKey('users.User', on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.course.name})"