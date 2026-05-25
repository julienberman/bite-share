from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel


class BillConsumerRequest(BaseModel):
    id: UUID
    name: str


class BillItemRequest(BaseModel):
    id: UUID
    name: str
    price: Decimal
    consumer_ids: list[UUID]


class BillSplitRequest(BaseModel):
    consumers: list[BillConsumerRequest]
    items: list[BillItemRequest]
    total: Decimal


class BillSplitPerson(BaseModel):
    consumer_id: UUID
    name: str
    amount: Decimal


class BillSplitResponse(BaseModel):
    splits: list[BillSplitPerson]
