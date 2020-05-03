import React from 'react'
import {Table} from 'react-bootstrap';
import {ALL_VACCINES} from './graphql';
import {useQuery} from "@apollo/react-hooks";
import {Spinner} from 'react-bootstrap';




export default function ViewInventory(){
  const {data, loading , error} = useQuery(ALL_VACCINES)

  if (loading) return <Spinner animation="border" role="status"/>

  if (error) return <div>{error.message}</div>

  if(data)
  {
   return (
    <>
		<Table striped bordered hover size="sm">
          <thead>
          <tr>
          <th>Name</th>
          <th size="sm">Description</th>
          <th>Stock</th>
          </tr>
          </thead>
          <tbody>
          {data.vaccines.map( vaccine => 
            <tr>
            <td>{vaccine.name}</td>
            <td>{vaccine.details}</td>
            <td>{vaccine.stock}</td>
            </tr>
            )}
          </tbody>
          </Table>
          </>

		);
  }
}