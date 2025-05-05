from django.db import models


class Document(models.Model):
    """
    Document Meta Data ORM (Object-Relational Mapping)
    """

    # 문서 제목
    title = models.CharField(max_length=255)
    # 문서 경로
    file_path = models.CharField(max_length=512)
    # 업로드 시간
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Document: {self.title}"
