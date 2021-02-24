from . import sio


@sio.event
def connect(sid, environ):
    print('connect', sid)
    sio.emit('connection')

@sio.event
def message(sid, data):
    print('message', data)
    return "Hello there!"

@sio.event
def disconnect(sid):
    print('disconnect', sid)