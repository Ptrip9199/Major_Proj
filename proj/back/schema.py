import graphene
from graphene import *
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Patient as PatientModel
from models import Visits as VisitModel

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


class CreatePatient(graphene.Mutation):
    """docstring for CreatePatients"""
    class Argumenrs:
            fName = graphene.String()
            lMame = graphene.String()

    ok = graphene.Boolean()
    patient = graphene.Field(lambda : Patients)

    def mutate(root, info , fName,lName):
        pat = PatientModel(f_name=fName , l_name=lName )
        pat.save()
        return CreatePatient(patient = pat)



class Query(graphene.ObjectType):
    name = 'Query'
    find_patients = MongoengineConnectionField(Patients)
    find_visits = MongoengineConnectionField(Visits)


class Mutation(graphene.ObjectType):
    """docstring for Mutations"""
    Create_patient = CreatePatient.Field()

        

schema=graphene.Schema( query=Query , mutation=Mutation)
