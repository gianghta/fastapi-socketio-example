from . import sio


# Temporary data
current_active_users = []

@sio.event
def connect(sid, environ):
    print(f"{sid } is connected.")

@sio.on('message')
async def broadcast(sid, data: object):
    print(f'sender-{sid}: ', data)
    await sio.emit('response', data)

@sio.on('update_status')
async def broadcast_status(sid, data: object):
    print(f'status {data["presence"]}')
    data['sid'] = sid

    if data not in current_active_users:
        current_active_users.append(data)
    
    if data['presence'] == 'offline':
        for user in current_active_users:
            if user['name'] == data['name']:
                current_active_users.remove(user)

    await sio.emit('status', current_active_users)

@sio.event
async def disconnect(sid):
    print('disconnected from front end', sid)
    for user in current_active_users:
        if user['sid'] == sid:
            user['presence'] = 'offline'
    print(current_active_users)
    await sio.emit('re_evaluate_status')

