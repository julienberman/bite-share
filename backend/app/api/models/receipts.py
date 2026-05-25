from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel


class ReceiptParseRequest(BaseModel):
    image_url: str


class ParsedReceiptItem(BaseModel):
    name: str
    price: Decimal


class ReceiptParseResponse(BaseModel):
    receipt_id: UUID
    items: list[ParsedReceiptItem]
    subtotal: Decimal | None = None
    total: Decimal | None = None
