import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {Form} from "react-bootstrap";
import {useLazyQuery} from "@apollo/react-hooks";
import PatientLoad from "./PatientLoad";
import {PATIENT_SEARCH} from "./graphql";
import {Spinner} from 'react-bootstrap';
// import {gql} from "apollo-boost";

// const PATIENT_SEARCH = gql`
//   query($mobNm:String!) {
//     patients(mobNm: $mobNm){
//       id
//       fName
//       lName
//       emailId
//       mobileNm
//       DoB
//       ParentName
//       visitsDone{
//         edges{
//           node{
//             id
//             height
//             weight
//             date
//           }
//         }
//       }
//     }
//   }
// `


function PatientSearch ()  {
	//const client = useApolloClient();
	const [mob_num, setmob_num]  =  useState("");
	function validateForm() {
	   var mobnm_regex = "[1-9]{1}[0-9]{9}";
	   var res = mob_num.match(mobnm_regex)
	   return res;
   }
   const [loaddata , {loading, error, data}] = useLazyQuery(PATIENT_SEARCH,{variables:{mobNm:mob_num}});

   if(error){
   	return <p>error</p>;
   }
   if(loading) return <Spinner animation="border" role="status" />

   if(data)
       return (
            <PatientLoad props={data}/>
        );

	return (
		<>
		<Form onSubmit = {e => {
      e.preventDefault();
      loaddata({variables :mob_num})
    }}> 
		<Form.Control 
		placeholder="Enter mobile number"
		type = "number"
        value={mob_num}
        onChange={e=> setmob_num(e.target.value)}/>
      <Button disabled={!validateForm()} type="submit" >
           Search
         </Button>
      
         </Form>		
		</>
	)

};





export default PatientSearch;