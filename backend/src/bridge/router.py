from fastapi import APIRouter

router = APIRouter(prefix="/bridge", tags=["Bridge"])


@router.post("/")
async def create_bridge():
    ...
