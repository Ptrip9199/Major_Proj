from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import (
    DateTimeField,
    EmbeddedDocumentField,
    ListField,
    ReferenceField,
    StringField,
    IntField,
    GenericReferenceField,
    LazyReference
)
#for each patient


class Patient(Document):

    meta = {"collection": "Patients","strict":False}
    f_name = StringField()
    l_name = StringField()
    DoB = DateTimeField()
    Parent_name = ListField(StringField(default=[]))
    mobile_nm = StringField()
    email_id = StringField()
    visits_done = ListField(ReferenceField("Visits"))

#visits for all patients. Each visit has an id for the patient.

class Visits(Document):
    meta = {"collection": "Visits"}
    date = DateTimeField()
    pat_id = ReferenceField("Patient")
    weight = IntField()
    height = IntField()    