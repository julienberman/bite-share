from dataclasses import dataclass, field
from datetime import datetime, timezone
from decimal import Decimal, ROUND_DOWN
from uuid import UUID, uuid4

CENT = Decimal("0.01")


@dataclass(frozen=True, slots=True)
class Person:
    name: str
    email: str | None = None
    phone: str | None = None
    venmo: str | None = None
    id: UUID = field(default_factory=uuid4)


@dataclass(frozen=True, slots=True)
class Item:
    name: str
    price: Decimal
    consumer_ids: frozenset[UUID]
    id: UUID = field(default_factory=uuid4)


@dataclass(slots=True)
class Bill:
    consumers: list[Person]
    items: list[Item]
    total: Decimal
    id: UUID = field(default_factory=uuid4)
    created_at: datetime = field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    @property
    def subtotal(self) -> Decimal:
        return sum((item.price for item in self.items), Decimal("0.00"))

    def split(self) -> dict[UUID, Decimal]:
        multiplier = self.total / self.subtotal
        shares = {consumer.id: Decimal("0.00") for consumer in self.consumers}
        for item in self.items:
            item_share = (
                multiplier * item.price / Decimal(len(item.consumer_ids))
            )
            for consumer_id in item.consumer_ids:
                shares[consumer_id] += item_share

        return self.round(shares)

    def round(self, shares: dict[UUID, Decimal]) -> dict[UUID, Decimal]:
        rounded_shares: dict[UUID, Decimal] = {}
        total_rounded_down = Decimal("0.00")
        for consumer_id, share in shares.items():
            rounded_share = share.quantize(CENT, rounding=ROUND_DOWN)
            rounded_shares[consumer_id] = rounded_share
            total_rounded_down += rounded_share

        remainder = self.total - total_rounded_down
        pennies = int(remainder / CENT)

        consumer_ids_by_remainder = sorted(
            shares,
            key=lambda consumer_id: (
                -(shares[consumer_id] - rounded_shares[consumer_id]),
                str(consumer_id),
            ),
        )

        for consumer_id in consumer_ids_by_remainder[:pennies]:
            rounded_shares[consumer_id] += CENT

        return rounded_shares
