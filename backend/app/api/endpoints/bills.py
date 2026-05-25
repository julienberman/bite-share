from fastapi import APIRouter

from app.api.models.bills import BillSplitPerson, BillSplitRequest
from app.api.models.bills import BillSplitResponse
from app.data.entities import Bill, Item, Person


router = APIRouter(prefix="/bills", tags=["bills"])


@router.post("/split", response_model=BillSplitResponse)
async def split_bill(request: BillSplitRequest) -> BillSplitResponse:
    bill = Bill(
        consumers=[
            Person(id=consumer.id, name=consumer.name)
            for consumer in request.consumers
        ],
        items=[
            Item(
                id=item.id,
                name=item.name,
                price=item.price,
                consumer_ids=frozenset(item.consumer_ids),
            )
            for item in request.items
        ],
        total=request.total,
    )
    shares = bill.split()

    return BillSplitResponse(
        splits=[
            BillSplitPerson(
                consumer_id=consumer.id,
                name=consumer.name,
                amount=shares[consumer.id],
            )
            for consumer in bill.consumers
        ]
    )
