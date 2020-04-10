import React from 'react';
import './App.css';
import {Query } from 'react-apollo';
import { gql } from "apollo-boost";

const get_pat = gql`
  {
    patients{
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


const App = () => {
  return(

    <Query query={get_pat}>
    {({loading, error, data}) => {
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
    }}
    </Query>
    );
}

export default App;
