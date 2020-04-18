import React from 'react'
import {Table,Row,Col} from 'react-bootstrap';
import AddVisits from "./AddVisits";
export default function VisitLoad(props,val2){
   return (
    <>

		<Table striped bordered hover>
          <thead>
          <tr>
          <th>Date</th>
          <th>weight</th>
          <th>height</th>
          </tr>
          </thead>
          <tbody>
          {props.val2.edges.map(visit => 
            <>
            <tr>
            <td>{visit.node.date}</td>
            <td>{visit.node.weight}</td>
            <td>{visit.node.height}</td>
            </tr>
            </>)}
           </tbody>
          </Table>
          <AddVisits props={props.props}/>
          </>

		);
}