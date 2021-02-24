from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import BaseConfig


config = BaseConfig()
app = FastAPI(title='TeamChat clone')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from . import routes
from . import sockets
app.mount('/ws', sockets.sio_app)