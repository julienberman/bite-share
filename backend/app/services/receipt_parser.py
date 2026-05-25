from decimal import Decimal

from openai import OpenAI
from pydantic import BaseModel

from app.configs.settings import Settings


class ExtractedReceiptItem(BaseModel):
    name: str
    price: Decimal


class ExtractedReceipt(BaseModel):
    items: list[ExtractedReceiptItem]
    subtotal: Decimal | None = None
    total: Decimal | None = None


def parse_receipt_image(
    settings: Settings,
    image_url: str,
) -> ExtractedReceipt:
    client = OpenAI(api_key=settings.openai_api_key)
    completion = client.chat.completions.parse(
        model=settings.openai_model,
        messages=[
            {
                "role": "system",
                "content": (
                    "Extract receipt line items and prices. Return only food, "
                    "drink, merchandise, or service line items. Do not include "
                    "tax, tip, fees, discounts, or payment lines as items."
                ),
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Read this receipt image. Extract item names, item "
                            "prices, subtotal if visible, and total if visible."
                        ),
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": image_url},
                    },
                ],
            },
        ],
        response_format=ExtractedReceipt,
    )
    parsed = completion.choices[0].message.parsed
    if parsed is None:
        raise ValueError("Receipt could not be parsed")

    return parsed
