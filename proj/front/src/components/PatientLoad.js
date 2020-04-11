import {useQuery} from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import React from 'react'



const get_pat = gql`
  query($mobNm:String!) {
    patients(mobNm: $mobNm){
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

export default function PatientLoad(){
 	
 	const {loading, error, data} = useQuery(get_pat,{variables:{mobNm:"1212121212"}});
      if (loading) return <h1>loading...</h1>;
      if (error) return <h1>Error {error}</h1>;
      return(
      	<div>
      	 {data.patients.map( patient => 
          <>
          <p>{patient.fName} &nbsp; {patient.lName}</p>
          <p> Contact: {patient.emailId} {patient.mobileNm}</p> 
          <p> {patient.ParentName}</p>
          <table>
          <tr>
          <th>Date</th>
          <th>weight</th>
          <th>height</th>
          </tr>
          {patient.visitsDone.edges.map(visit => 
            <>
            <tr>
            <td>{visit.node.date}</td>
            <td>{visit.node.weight}</td>
            <td>{visit.node.height}</td>
            </tr>
            </>)}
          </table>
          </>
          
          )}
      	</div>
      	);

}




         
         
