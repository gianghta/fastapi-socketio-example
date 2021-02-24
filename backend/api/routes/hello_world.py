from fastapi import APIRouter


router = APIRouter()

@router.get('/hello')
async def hello():
    return {'hello': 'world'}

@router.get('/ping')
async def ping():
    return {'ping': 'pong'}