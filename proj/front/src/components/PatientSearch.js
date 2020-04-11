import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import { gql } from "apollo-boost";
import {useLazyQuery} from "@apollo/react-hooks";


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
            id
            height
            weight
            date
          }
        }
      }
    }
  }
`


const PatientSearch = () =>  {
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
   if(loading) return <p>Loading...</p>

   if(data)
       return (
            <div>
           {data.patients.map( patient => 
            <li key={patient.id}>
           <p>{patient.fName} &nbsp; {patient.lName}</p>
           <p>{patient.DoB}</p>
            <p> Contact: {patient.emailId} {patient.mobileNm}</p> 
            <p> {patient.ParentName}</p>
            <table>
            <thead>
            <tr>
            <th>Date</th>
            <th>weight</th>
            <th>height</th>
            </tr>
            </thead>
            <tbody>
            {patient.visitsDone.edges.map(visit => 
              <tr key={visit.node.id}>
              <td>{visit.node.date}</td>
              <td>{visit.node.weight}</td>
              <td>{visit.node.height}</td>
              </tr>              
            )}
            </tbody>
            </table>
            </li>
          
          )}
        </div>
        );

	return (
		<>
		<form onSubmit = {e => {
      e.preventDefault();
      loaddata({variables :mob_num})
      {
      
      }
    }}> 
		<input 
		placeholder="Enter mobile number"
		type = "number"
        value={mob_num}
        onChange={e=> setmob_num(e.target.value)}/>
      <Button disabled={!validateForm()} type="submit" >
           Search
         </Button>
      
         </form>		
		</>
	)

};





export default PatientSearch;