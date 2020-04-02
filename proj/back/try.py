import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Visits as VisitModel
from models import Patient as PatientModel
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

class Query(graphene.ObjectType):
    visits = graphene.List(Visits,last=graphene.Int(default_value=0))
    patients = graphene.List(Patients,last=graphene.Int(default_value=0),fname=graphene.String(default_value="NULL"))


    def resolve_patients(self,info,last,fname):
        if fname!="NULL":
            data = PatientModel.objects(f_name=fname)

       	else:
       		data = PatientModel.objects.all()
        
        for dat in data:
            dat.visits_done = dat.visits_done[-(last):]
                
        return data
    def resolve_visits(self,info,last):
        qs = VisitModel.objects.all()
        if last != 0:
            qs = qs[qs.count()-last:]
        return qs


schema=graphene.Schema( query=Query)

q_s = "query{patients(last:1,fname:\"update\"){fName,lName,visitsDone{edges{node{date}}}}}"
res = schema.execute(q_s)
print(res.data)