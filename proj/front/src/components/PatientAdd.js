import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {useMutation} from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import { Mutation } from '@apollo/react-components';


const ADD_PATIENT_MUTATION = gql`
mutation($fName:String, $lName:String, $DoB:DateTime!, 
$ParentNm:[String]!, $mobile:String!, $email:String!){
  CreatePatient(fname:$fName,lname:$lName,DoB: $DoB, Parentname:$ParentNm,
    mobilenm:$mobile,emailid:$email){
    ok
    patient{
      fName
      lName

    }
  }
}
`

const PatientAdd = () => {
	const [fName, setfName]  =  useState("");
	const [moblName, setlName]  =  useState("");
	const [DoB, setDoB]  =  useState("");
	const [ParentNm, setParentNm]  =  useState("");
	const [mob_num, setmob_num]  =  useState("");
	const [mobile, setmobile]  =  useState("");
	const [email, setemail]  =  useState("");


	return(
		<Mutation mutation={ADD_PATIENT_MUTATION}>
		{(addPat,{data})=> (
			<div>
			
			</div>
			)}
		</Mutation>
	);
}