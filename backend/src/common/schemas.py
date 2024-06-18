from pydantic import BaseModel


class ErrorSchema(BaseModel):
    message: str
