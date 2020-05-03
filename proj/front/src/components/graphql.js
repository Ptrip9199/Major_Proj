import {gql} from "apollo-boost";


// All Patient Related Mutations and Queries
const ADD_PATIENT_MUTATION = gql`
mutation($fname:String, $lname:String, $DoB:Date, $Parentname:[String], $mobilenm:String, $emailid:String,$gender:String){
  CreatePatient(fname:$fname,lname:$lname,DoB: $DoB, Parentname:$Parentname,mobilenm:$mobilenm,emailid:$emailid,gender:$gender){
    ok
    patient{
      fName
      lName
      gender
      DoB
      Parentname
      id
      emailid
      mobilenm
    }
  }
}
`

const UPDATE_PATIENT= gql`
  mutation($fname:String, $lname:String, $DoB:Date,$Parentname:[String], $mobilenm:String, $emailid:String, $gender:String, $id: String){
    UpdatePatient(fname:$fname, lname:$lname, DoB:$DoB, Parentname: $Parentname, mobilenm: $mobilenm, emailid:$emailid,  gender:$gender, graphqlid: $id){
      ok
      patient{
        fName
        lName
        gender
        DoB
        Parentname
        id
        emailid
        mobilenm   
      }
    }

  }`


const PATIENT_SEARCH = gql`
  query($mobNm:String!) {
    patients(mobNm: $mobNm,last:2){
      id
      fName
      lName
      emailId
      mobileNm
      DoB
      ParentName
      visitsDone{
        edges{
          node{
            id
            height
            weight
            date
            vaccines
          }
        }
      }
    }
  }
`


// All mutations and queries for  Vaccines
const ADD_VACCINE = gql `
mutation($name:String, $details:String, $stock: Int){
  CreateVaccines(name:$name, details:$details, stock:$stock){
    ok
    vaccine{
      name
      stock
    }
  }
}

`

const UPDATE_VACCINE_STOCK = gql `
mutation($vacid:String, $stock: Int){
  UpdateVaccineStock(vacid : $vacid, stock:$stock){
    ok
    vaccine{
      name
      stock
    }
  }
}

`

const ALL_VACCINES = gql`
query{
  vaccines{
    id
    name
    stock
    details
  }
}
`


// All mutations and queries for Visits
const ADD_VISIT = gql`
	mutation($date:DateTime, $height: Int , $weight: Float, $patid:String,$vaccines:[String]){
  CreateVisit(date:$date,height:$height,weight:$weight,patid:$patid,vaccines:$vaccines){
    ok
    visit{
      date
    }
  }
}

`

const ALL_VISITS = gql`
 query{
  visits{
    date
    height
    weight
    vaccines
    patId{
      fName
    }
  }
 }
 `

export {
	 ADD_PATIENT_MUTATION,
	 PATIENT_SEARCH,
   UPDATE_PATIENT,
	 ADD_VISIT,
   ALL_VISITS,
   ADD_VACCINE,
   UPDATE_VACCINE_STOCK,
   ALL_VACCINES
}
