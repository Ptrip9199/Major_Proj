import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Patient as PatientModel
from models import Visits as VisitModel

from database import conn

conn()
#classes for Queries
class Patients (MongoengineObjectType):
    class Meta:
        model = PatientModel
        interfaces = (Node,)

class Visits(MongoengineObjectType):
    class Meta:
        model = VisitModel
        interfaces = (Node,)

#query class 
class Query(graphene.ObjectType):
    name = 'Query'
    find_patients = MongoengineConnectionField(Patients)
    find_visits = MongoengineConnectionField(Visits)

#classes for Mutations

class CreatePatient(graphene.Mutation):
    """docstring for CreatePatients"""

    class Arguments:
        fname = graphene.String(required=True)
        lname = graphene.String()
        DoB = graphene.types.datetime.Date()
        Parentname = graphene.List(graphene.String)
        mobilenm = graphene.String()
        emailid = graphene.String()
        visitsdone = graphene.List(graphene.String)

    ok = graphene.Boolean()
    patient = graphene.Field(lambda: Patients)

    def mutate(self,info,fname,lname,DoB,Parentname,mobilenm,emailid,visitsdone=[]):
        pat = PatientModel()
        pat.f_name = fname
        pat.l_name = lname
        pat.DoB = DoB
        pat.Parent_name = Parentname
        pat.mobile_nm = mobilenm
        pat.email_id = emailid
        pat.save()
        return CreatePatient(patient=pat)

#Mutation Class
class Mutation(graphene.ObjectType):
    """docstring for Mutations"""
    Create_patient = CreatePatient.Field()

        

schema=graphene.Schema( query=Query , mutation=Mutation)
