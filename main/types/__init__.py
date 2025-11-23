from pydantic import BaseModel, GetJsonSchemaHandler, Field, ConfigDict
from pydantic.json_schema import JsonSchemaValue
from typing import Optional, Literal
import re


class FourDigitNumber(str):
    """A string that must always be 4 digits"""

    @classmethod
    def __get_pydantic_core_schema__(cls, source, handler):
        # runtime validation
        def validate(value):
            if not isinstance(value, str):
                value = str(value)
            if not re.fullmatch(r"\d{4}", value):
                raise ValueError("Must contain exactly 4 digits")
            return cls(value)

        return {
            "type": "string",
            "minLength": 4,
            "maxLength": 4,
            "pattern": r"^\d{4}$",
            "validators": [validate],
        }

    @classmethod
    def __get_pydantic_json_schema__(
        cls, core_schema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        # JSON schema for OpenAPI/NextJS
        return {
            "type": "string",
            "pattern": r"^\d{4}$",
            "description": "A 4-digit numeric string",
            "example": "0423",
        }

class TableFilters(BaseModel):
    gn: str
    page: int = 1
    rows: int = 50
    sidx: Optional[str] = None
    sord: str = "asc"
    search: bool = False
    filters: Optional[str] = None

    # Allow extra fields
    model_config = ConfigDict(extra="allow")