from uuid import uuid4

from fastapi import APIRouter

from app.api.models.receipts import ParsedReceiptItem, ReceiptParseRequest
from app.api.models.receipts import ReceiptParseResponse
from app.configs.settings import get_settings
from app.services.receipt_parser import parse_receipt_image


router = APIRouter(prefix="/receipts", tags=["receipts"])


@router.post("/parse", response_model=ReceiptParseResponse)
async def parse_receipt(
    request: ReceiptParseRequest,
) -> ReceiptParseResponse:
    receipt = parse_receipt_image(get_settings(), request.image_url)

    return ReceiptParseResponse(
        receipt_id=uuid4(),
        items=[
            ParsedReceiptItem(name=item.name, price=item.price)
            for item in receipt.items
        ],
        subtotal=receipt.subtotal,
        total=receipt.total,
    )
