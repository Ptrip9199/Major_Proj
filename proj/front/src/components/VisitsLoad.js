import React from 'react'
import {Table} from 'react-bootstrap';
import AddVisits from "./AddVisits";
export default function VisitLoad(props){
   return (
    <>
		<Table striped bordered hover>
          <thead>
          <tr>
          <th>Date</th>
          <th>weight</th>
          <th>height</th>
          <th>Vaccines</th>
          </tr>
          </thead>
          <tbody>
          {props.val2.edges.map(visit => 
            <>
            {console.log(visit.node.vaccines)}
            <tr>
            <td>{visit.node.date}</td>
            <td>{visit.node.weight}</td>
            <td>{visit.node.height}</td>
            <td>{visit.node.vaccines}</td>
            </tr>
            </>)}
           </tbody>
          </Table>
          <AddVisits props={props.props}/>
          </>

		);
}