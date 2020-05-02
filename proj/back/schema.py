import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from models import Patient as PatientModel
from models import Visits as VisitModel
from models import Vaccines as VaccineModel
from base64 import b64decode
from database import conn
from graphql import GraphQLError
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

class Vaccines(MongoengineObjectType):
    class Meta:
        model= VaccineModel
        interfaces = (Node,)
        
#query class 
class Query(graphene.ObjectType):
    name = 'Query'
#    find_patie nts = MongoengineConnectionField(Patients)
#    find_visits = MongoengineConnectionField(Visits)
    patients = graphene.List(Patients,last=graphene.Int(default_value=0) ,fname=graphene.String(default_value="NULL") ,lname=graphene.String(default_value="NULL") ,mobNm=graphene.String(default_value="NULL"))
    visits = graphene.List(Visits,last=graphene.Int(default_value=0))
    vaccines = graphene.List(Vaccines)

    def resolve_vaccines(self,info):
        return VaccineModel.objects.all()

    def resolve_visits(self,info,last):
        data = VisitModel.objects.all()
        if last != 0:
            data = data[data.count()-last:]
        print(info)
        return data

    def resolve_patients(self, info, last, fname, mobNm,lname):
        if fname!="NULL":
            if lname!="NULL":
               data = PatientModel.objects(f_name=fname, l_name=lname)
            else:
                data = PatientModel.objects(f_name=fname)

        if mobNm!="NULL":
            data = PatientModel.objects(mobile_nm= mobNm)
        else:
            data = PatientModel.objects.all()
        
        for dat in data:
            dat.visits_done = dat.visits_done[-(last):]
                
        return data


#classes for Mutations


class CreateVaccines(graphene.Mutation):
    
    class Arguments:
        name = graphene.String()
        description = graphene.String()
        stock = graphene.Int()
    
    ok = graphene.Boolean()
    vaccine = graphene.Field(lambda: Vaccines)
    def mutate(self,info,name,description,stock):
        if(VaccineModel.objects(name=name)):
            raise GraphQLError('Person with same name and number already exists.Please try searching.')
        else:
            vac = VaccineModel()
            vac.name = name
            vac.description = description
            vac.stock = stock
        
        if vac.save():
           ok = True
        else:
            ok = False
        return CreateVaccines(vaccine=vac,ok=ok)

class UpdateVaccineStock(graphene.Mutation):

    class Arguments:
        vacid = graphene.String()
        stock = graphene.Int()
    
    ok = graphene.Boolean()
    vaccine = graphene.Field(lambda: Vaccines)
    def mutate(self,info,stock,vacid):
        vacid = b64decode(vacid).decode('utf-8').split(':')[1]
        if (VaccineModel.objects(id=vacid)) :
            vac = VaccineModel.objects(id=vacid)[0]
            vac.stock = stock
        else:
            raise GraphQLError("Sorry Vaccine does not exist!")
        
        if vac.save():
            ok = True
        else:
            ok = False
        return CreateVaccines(vaccine=vac,ok=ok) 

class CreatePatient(graphene.Mutation):

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
        if (PatientModel.objects(mobile_nm=mobilenm,f_name=fname)):
            raise GraphQLError('Person with same name and number already exists.Please try searching.')
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
            if pat.save():
                ok = True
            else:
                pat = Null 
                ok= False
        return CreatePatient(patient=pat,ok=ok)

class UpdatePatient(graphene.Mutation):
    
    class Arguments:
        fname = graphene.String(required=False)
        lname = graphene.String(required=False)
        DoB = graphene.types.datetime.Date(required=False)
        gender = graphene.String(required=False)
        Parentname = graphene.List(graphene.String)
        mobilenm = graphene.String(required=False)
        emailid = graphene.String(required=False)
        graphqlid = graphene.String()
        #visitsdone = graphene.List(graphene.String)

    ok = graphene.Boolean()
    patient = graphene.Field(lambda: Patients)

    def mutate(self,info,graphqlid,fname=None,lname=None,DoB=None,gender=None,mobilenm=None,emailid=None,Parentname=[]):
        patid = b64decode(graphqlid).decode('utf-8').split(':')[1]
        if (PatientModel.objects(id=patid) == []):
            raise GraphQLError('Patient does not exist.Please try adding a new patient.')
        else:
            pat = PatientModel.objects(id=patid)[0]
            if fname!=None : pat.f_name = fname 
            if lname!=None : pat.l_name = lname
            if DoB!=None : pat.DoB = DoB
            if Parentname!=[] : pat.Parent_name = Parentname
            if gender!=None : pat.gender = gender
            if mobilenm!=None : pat.mobile_nm = mobilenm
            if emailid!=None : pat.email_id = emailid
            if pat.save():
                ok = True
            else:
                ok= False
        return UpdatePatient(patient=pat,ok=ok)        

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
        if pat==[]:
            raise GraphQLError("Not able to find the patient. Please try again after checking if all details are correct.")
        new_vis.height = height
        new_vis.weight = weight
        new_vis.pat_id = pat
        new_vis.date = date
        new_vis.vaccines = vaccines
        if new_vis.save():
            pat.visits_done.append(new_vis)
            if pat.save():
                ok = True
            else:
                ok = False
        else:
            ok = False        
        return CreateVisit(visit= new_vis ,ok = ok)

#Mutation Class
class Mutation(graphene.ObjectType):
    """docstring for Mutations"""
    Create_patient = CreatePatient.Field()
    Create_visit = CreateVisit.Field()
    Create_vaccines = CreateVaccines.Field()
    Update_patient= UpdatePatient.Field()
    Update_vaccine_stock = UpdateVaccineStock.Field()

schema=graphene.Schema( query=Query , mutation=Mutation)
