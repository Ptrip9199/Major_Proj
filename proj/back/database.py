from mongoengine import connect
from models import *


def conn():
	connect('hosp')
