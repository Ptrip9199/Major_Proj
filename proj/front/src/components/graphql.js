import {gql} from "apollo-boost";

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

const PATIENT_SEARCH = gql`
  query($mobNm:String!) {
    patients(mobNm: $mobNm){
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
	 ADD_VISIT,
   ALL_VISITS
}
