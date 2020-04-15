import {gql} from "apollo-boost";

const ADD_PATIENT_MUTATION = gql`
mutation($fname:String, $lname:String, $DoB:Date, $Parentname:[String], $mobilenm:String, $emailid:String){
  CreatePatient(fname:$fname,lname:$lname,DoB: $DoB, Parentname:$Parentname,mobilenm:$mobilenm,emailid:$emailid){
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
          }
        }
      }
    }
  }
`


const ADD_VISIT = gql`
	mutation($date:DateTime, $height: Int , $weight: Float, $pat_id:String,$vaccines:[String]){
  CreateVisit(date:$date,height:$height,weight:$weight,pat_id:$pat_id,vaccines:$vaccines){
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
