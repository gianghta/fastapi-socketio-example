from . import sio


@sio.event
def connect(sid, environ):
    print("connected to front end", sid)

@sio.on('message')
async def broadcast(sid, data: str):
    print(f'sender-{sid}: ', data)
    await sio.emit('response', data)

@sio.event
def disconnect(sid):
    print('disconnected from front end', sid)