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


@require_GET
def mock_document_detail(request, pk):
    """
    ID가 1인 하드코딩 mock 문서 하나만 반환하는 테스트용 뷰
    """
    if int(pk) != 3:
        raise Http404("Mock document not found")

    return JsonResponse(
        {
            "id": 3,
            "title": "1998 Letter",
            "url": "documents/letter.pdf",
            "content": """To the Shareholders of
Berkshire Hathaway Inc.:

The fiscal year ended October 2, 1966 resulted in net earnings of $679206 as compared to
net earnings of $125586 for the prior year. These net earnings do not reflect any nonrecurring
losses incurred on the disposal of assets due to the permanent closing of the King Philip Plants
A and E in Fall River, Massachusetts, as such losses have been charged to a reserve previously
established for such purpose.

Because of loss carryovers, no federal income taxes were payable by the Corporation with
respect to either of these years; however, to prevent any misleading interpretation of future
earnings when loss carryovers shall not be available, the Corporation has included in
computing net earnings for 1966 and 1965 a charge substantially equal to the federal income
taxes that would have been payable with respect to results of operations during each of these
years.

The Corporation is continuing to operate King Philip Plant D in Warren, Rhode Island, and
the Hathaway Synthetic, Box Loom and Home Fabrics Divisions in New Bedford,
Massachusetts.

The growth of our Home Fabrics Division over the past few years is, in large part, due to our development of both new products and new markets. We have been exploring other opportunities to broaden our product line further.

During 1966 raw material, stock in process and cloth inventories were decreased by $1,411,967
and bank loans of $2,500,000 were paid off. Also, during the year the Corporation purchased
120,231 of its own shares, leaving a total of 1,017,547 shares outstanding at the end of the
fiscal year.

The Corporation made a substantial reduction in its overhead costs during the fiscal year just
ended. Approximately $811,812 was invested by the Corporation during the year in the
purchase of new machinery in a continuing effort to reduce costs and to improve quality. This
program will continue during the current fiscal year.

A major portion of the machinery at King Philip Plant E Division has been sold. We expect to
dispose of the remaining portion of this plant during the current fiscal year. This will complete
the liquidation of our unprofitable plants. The proposed sale of the King Philip E Division will
make it necessary to provide storage for raw cotton and grey cloth for the King Philip D
Division at the Hathaway Division Plant G (former Langshaw Mill). Plans are under way to
accomplish this within the current fiscal year.

After more than fifty years of service, Mr. Seabury Stanton resigned as a director and as
President and Mr. Kenneth V. Chace was elected to succeed him. At the same time, Mr. John
K. Stanton resigned as a director and as Treasurer and Clerk. Mr. Harold V. Banks was elected
to succeed him as Treasurer and Clerk.

All divisions of the Corporation currently have substantial backlogs of unfilled orders and we
presently anticipate that operations for the coming year will continue to be profitable.

We wish to express our thanks to all the employees of the Corporation whose loyal cooperation
and efforts have helped to make this year successful.""",
        }
    )
