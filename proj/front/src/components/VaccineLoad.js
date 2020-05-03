import React from 'react';
import {Button,Spinner} from 'react-bootstrap';
import {ALL_VACCINES} from "./graphql";
import {useQuery} from '@apollo/react-hooks'
import {Formik,Field,FastField} from 'formik';
import {Form,Col,Row} from 'react-bootstrap';


export default function VaccineLoad(){
const {data, loading, error}= useQuery(ALL_VACCINES)

if(error) return(<p>Error {error.messages}</p>)
if(data)
	return(
		<>
	{console.log(data)}
	{data.vaccines.map(vaccine => (
		<>
		<Form>		
		<Form.Label>Vaccines : </Form.Label>
		<Field as="select" name="vaccines" className="form-control" multiple>
		<option value={vaccine.name}>{vaccine.name}</option>
		</Field>
		</Form>
		</>		
		))}
		</>
		)

}