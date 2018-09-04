from flask import (
    Blueprint,
    request,
    current_app,
    send_from_directory)



blueprint = Blueprint('validation', __name__)