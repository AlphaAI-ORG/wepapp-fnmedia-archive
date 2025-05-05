from django.conf import settings
from django.http import Http404
from django.http import JsonResponse
from doculistapp.models import Document
from django.views.decorators.http import require_GET


@require_GET
def document_list(request):
    """
    DB에 저장된 문서 메타 데이터 목록 조회 뷰
    """
    docs = Document.objects.all().values("id", "title", "file_path")

    result = []
    for doc in docs:
        result.append(
            {
                "id": doc["id"],
                "title": doc["title"],
                "url": settings.MEDIA_URL + doc["file_path"],
            }
        )
    return JsonResponse(result, safe=False)


@require_GET
def document_detail(request, pk):
    """
    DB에 저장된 특정 문서의 메타 데이터 조회 뷰
    """
    try:
        doc = Document.objects.get(pk=pk)
    except Document.DoesNotExist:
        raise Http404("Document not found")

    return JsonResponse(
        {
            "id": doc.id,
            "title": doc.title,
            "url": settings.MEDIA_URL + doc.file_path,
        }
    )
