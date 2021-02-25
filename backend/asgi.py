import uvicorn
from api import config, app


if __name__ == '__main__':
    uvicorn.run('asgi:app', host=config.HOST, port=config.PORT, reload=True)