import socketio
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import config


app = FastAPI(debug=True)
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)
asgi = socketio.ASGIApp(sio)

@sio.event
def connect(sid, environ):
    print("connected to front end", sid)

@sio.event
async def message(sid, data):
    print("message ", data)
    await sio.emit('reply', 'Hello World')
    # await sio.emit('reply', room=sid)

@sio.event
def disconnect(sid):
    print('disconnected from front end', sid)

@app.get('/hello')
async def hello():
    return {'hello': 'world'}

@app.get('/ping')
async def ping():
    return {'ping': 'pong'}

app.mount('/ws', asgi)

if __name__ == '__main__':
    uvicorn.run('app:app', host=config.HOST, port=config.PORT, reload=True)