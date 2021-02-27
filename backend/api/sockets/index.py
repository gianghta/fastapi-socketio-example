from . import sio


@sio.event
def connect(sid, environ):
    print(f"{sid } is connected.")

@sio.on('message')
async def broadcast(sid, data: object):
    print(f'sender-{sid}: ', data)
    await sio.emit('response', data)

@sio.on('online')
@sio.on('offline')
async def broadcast_status(sid, data: object):
    print(f'status {data["presence"]}')
    await sio.emit('status', data)

@sio.event
def disconnect(sid):
    print('disconnected from front end', sid)