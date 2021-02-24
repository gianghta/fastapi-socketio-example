from api import app
from . import hello_world


app.include_router(hello_world.router, tags=['Test Route'], prefix='/hello_world')