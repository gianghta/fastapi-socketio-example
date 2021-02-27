from fastapi import FastAPI
from config import BaseConfig


config = BaseConfig()
app = FastAPI(title='TeamChat clone')

from . import routes
from . import sockets
app.mount('/ws', sockets.sio_app)