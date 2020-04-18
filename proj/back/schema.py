import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Patient as PatientModel
from models import Visits as VisitModel
from base64 import b64decode
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
#    find_patients = MongoengineConnectionField(Patients)
#    find_visits = MongoengineConnectionField(Visits)
    patients = graphene.List(Patients,last=graphene.Int(default_value=0),fname=graphene.String(default_value="NULL"),mobNm=graphene.String(default_value="NULL"))
    visits = graphene.List(Visits,last=graphene.Int(default_value=0))

    def resolve_visits(self,info,last):
        data = VisitModel.objects.all()
        if last != 0:
            data = data[data.count()-last:]
        return data

    def resolve_patients(self,info,last,fname,mobNm):
        if fname!="NULL":
            data = PatientModel.objects(f_name=fname)

        if mobNm!="NULL":
            data = PatientModel.objects(mobile_nm= mobNm)
        else:
            data = PatientModel.objects.all()
        
        for dat in data:
            dat.visits_done = dat.visits_done[-(last):]
                
        return data


#classes for Mutations

class CreatePatient(graphene.Mutation):
    """docstring for CreatePatients"""

    class Arguments:
        fname = graphene.String()
        lname = graphene.String()
        DoB = graphene.types.datetime.Date()
        gender = graphene.String()
        Parentname = graphene.List(graphene.String)
        mobilenm = graphene.String()
        emailid = graphene.String()

        #visitsdone = graphene.List(graphene.String)

    ok = graphene.Boolean()
    patient = graphene.Field(lambda: Patients)

    def mutate(self,info,fname,lname,DoB,gender,Parentname,mobilenm,emailid,visitsdone=[]):
      #tryin to have unique mobile number for each patient  
      #add some authentication, so thst a perseon is not able to modify some other record 
        if (PatientModel.objects(mobile_nm=mobilenm)):
            pat = PatientModel.objects(mobile_nm=mobilenm)[0]
        else:
            pat = PatientModel()        
        pat.f_name = fname
        pat.l_name = lname
        pat.DoB = DoB
        pat.Parent_name = Parentname
        pat.gender = gender
        pat.mobile_nm = mobilenm
        pat.email_id = emailid
        pat.visits_done=[]
        pat.save()
        return CreatePatient(patient=pat)

class CreateVisit(graphene.Mutation):

    class Arguments:
        height = graphene.Int()
        weight = graphene.Float()
        date = graphene.types.datetime.DateTime()
        patid = graphene.String()
        vaccines = graphene.List(graphene.String)
    ok = graphene.Boolean()
    visit = graphene.Field(lambda: Visits)
#adding a visit requires two things
# 1. add a visit to the database
# 2. append the visit id to list in patients
    def mutate(self,info,height,weight,date,patid,vaccines):
        new_vis = VisitModel()
        patid = b64decode(patid).decode('utf-8').split(':')[1] 
        #extract the mongodb id of the patient. shown in graphql as 'Patients:id' encoded as base64
        pat = PatientModel.objects(id=patid)[0]
        new_vis.height = height
        new_vis.weight = weight
        new_vis.pat_id = pat
        new_vis.date = date
        new_vis.vaccines = vaccines
        new_vis.save()
        pat.visits_done.append(new_vis)
        pat.save()
        return CreateVisit(visit=new_vis)

#Mutation Class
class Mutation(graphene.ObjectType):
    """docstring for Mutations"""
    Create_patient = CreatePatient.Field()
    Create_visit = CreateVisit.Field()


schema=graphene.Schema( query=Query , mutation=Mutation)
