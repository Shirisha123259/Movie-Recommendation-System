
from pydantic import BaseModel, Field

class MovieRequest(BaseModel):
    movie_title: str
    limit: int = Field(default=5, ge=1, le=20)
