import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {useMutation} from '@apollo/react-hooks';
import {Form} from 'react-bootstrap';
import {ADD_VISIT} from "./graphql";
// import {gql } from "apollo-boost";
// const ADD_VISIT = gql`
// 	mutation($date:DateTime, $height: Int , $weight: Float, $patId:String){
//   CreateVisit(date:$date,height:$height,weight:$weight,patId:$patId){
//     ok
//     visit{
//       date
//     }
//   }
// }

//`

export default function AddVisits(props){
	const [height, setheight]  =  useState("");
	const [weight, setweight]  =  useState("");

	function validateForm(){
		return 1;
	}
	const [addVisit,{data}] = useMutation(ADD_VISIT)

	if(data){
		return(<>
			Added new visit to pattient
			</>);
	}

	return(
		<div>
		<Form
			onSubmit={e => {
				e.preventDefault()
				console.log(props)
				addVisit({variables:{date:(new Date().toISOString()),weight:weight,height:height,pat_id:props.id,vaccines:[]}})
				console.log("Done")
			}}
		>Add Measurementss
			<br/>
			<Form.Control 
				placeholder="Height"
				type = "number"
				value= {height}
				onChange={e=> setheight(e.target.value)}
			/>
			<br/>
			<Form.Control
				placeholder="Weight"
				type = "number"
				value= {weight}
				onChange={e=> setweight(e.target.value)}
			/>

			<Button disabled={!validateForm()} type="submit" >
           		Add
         	</Button>
		</Form>
		</div>
		);

}
