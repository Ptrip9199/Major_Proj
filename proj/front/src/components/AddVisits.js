import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {useMutation} from '@apollo/react-hooks';
import {Form,Col,Row} from 'react-bootstrap';
import {ADD_VISIT} from "./graphql";
import PatientSearch from "./PatientSearch";


export default function AddVisits(props){
	const [height, setheight]  =  useState("");
	const [weight, setweight]  =  useState("");
	console.log(props.props)
	function validateForm(){
		return 1;
	}

	function done(e){
		e.preventDefault();
		return(<PatientSearch/>)
	}

	const [addVisit,{data}] = useMutation(ADD_VISIT)

	if(data){
		return(<>
				<p>Added new visit to patient</p>
				<Button onClick={done}>OKAY</Button>
			</>);
	}

	return(
		<div>
		<h2>Add Visits</h2>
		<Form
			onSubmit={e => {
				e.preventDefault()
				addVisit({variables:{date:(new Date().toISOString().split('.')[0]+"Z"),weight:weight,height:height,patid:props.props,vaccines:[]}})
			}}
		><h3>Add Measurements</h3>
			<br/>
			<Row>
			<Col sm={5}>
			<Form.Control 
				placeholder="Height"
				type = "number"
				value= {height}
				onChange={e=> setheight(e.target.value)}
			/>
			</Col>
			<Col sm={5}>
			<Form.Control
				placeholder="Weight"
				type = "number"
				value= {weight}
				onChange={e=> setweight(e.target.value)}
			/>
			</Col>
			</Row>

			<Button disabled={!validateForm()} type="submit" >
           		Add
         	</Button>
		</Form>
		</div>
		);

}
