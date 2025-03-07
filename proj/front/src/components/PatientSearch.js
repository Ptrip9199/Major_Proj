import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {Form,Row,Col} from "react-bootstrap";
import {useLazyQuery} from "@apollo/react-hooks";
import PatientLoad from "./PatientLoad";
import {PATIENT_SEARCH} from "./graphql";
import {Spinner} from 'react-bootstrap';
import {Formik} from 'formik';
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
            {
              console.log(data)
              if(data.patients.length)
              {
                return <PatientLoad props={data}/>
              }
            else{
              return(
                  <>
                  <p>Patient with Mobile Number:"{mob_num}" not found</p>
                  <Button type="button" href="/searchpatient">Search Again</Button>
                  <Button type="button" href="/addpatient">Add New Patient</Button>
                  </>
            );}
      }
	return (
		<>
		<Form onSubmit = {e => {
      e.preventDefault();
      loaddata({variables :mob_num})
    }}> 
    <Row>
    <Col md={5}>
		<Form.Control 
		placeholder="Enter mobile number"
		type = "number"
        value={mob_num}
        onChange={e=> setmob_num(e.target.value)}/>
        </Col>
        <Col>
      <Button disabled={!validateForm()} type="submit" >
           Search
         </Button>
         </Col>
      </Row>
         </Form>		
		</>
	)

};





export default PatientSearch;