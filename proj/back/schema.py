import graphene
from graphene import *
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Patient as PatientModel
from models import Visits as VisitModel
from models import Contact as ContactModel
from database import conn

conn()

class Patients (MongoengineObjectType):
    class Meta:
        model = PatientModel
        interfaces = (Node,)


class Visits(MongoengineObjectType):
    class Meta:
        model = VisitModel
        interfaces = (Node,)

class Contact(MongoengineObjectType):
    class Meta:
        model = ContactModel
        interfaces = (Node,)


class Query(graphene.ObjectType):
    name = 'Query'
    find_patients = MongoengineConnectionField(Patients)
    find_visits = MongoengineConnectionField(Visits)
    visit = graphene.Field(Visits) 
    patient = graphene.Field(Patients)

schema=graphene.Schema( query=Query )
