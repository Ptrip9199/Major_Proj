import React from 'react';
import {Button,Spinner} from 'react-bootstrap';
import {useMutation} from '@apollo/react-hooks';
import {Form,Col,Row} from 'react-bootstrap';
import {ADD_VISIT} from "./graphql";
import PatientSearch from "./PatientSearch";
import {Formik,Field,FastField} from 'formik';
import {Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import Home from './Home';

export default function AddVisits(props){	
	 function done(e){
	 	e.preventDefault()
	 	return(
	 		<Redirect to="/" />
	 		)
	 }

	const [addVisit,{data,loading,error}] = useMutation(ADD_VISIT)

	if(data){
		return(<>
				<p>Added new visit to patient</p>
				<Button type="button" href="/searchpatient">Okay</Button>			
			</>);
	}

	if(loading){
		return(
		<>
		<Spinner/>
		</>)
	}
	
	if(error){
		return(
		<>
		<p>{error.message}</p>
		</>)
	}
	const validation= Yup.object().shape({
		height:Yup.number().required().positive().integer(),
		weight:Yup.number().required().positive().integer()
	});	

	return(
		<div>
		<h2>Add Visits</h2>
		<Formik 
		initialValues={{weight:"",height:"",vaccines:""}}
		validationSchema={validation}
		onSubmit={(values,actions) => {
			addVisit({variables:{date:(new Date().toISOString().split('.')[0]+"Z"),weight:values.weight,height:values.height,patid:props.props,vaccines:values.vaccines}})
			actions.setSubmitting(false);
			
		}}
		>
		{({
			values,
			errors,
			touched,
			handleChange,
			handleBlur,
			handleSubmit,
			isSubmitting}) => (
		
		<Form onSubmit={handleSubmit}>
		<h4>Add Measurements</h4>
			<br/>
			<Row>
			<Col sm={5}>
			<FastField 
				className="form-control"
				placeholder="Height"
				name = "height"
				type = "number"
				value= {values.height}
				onChange={handleChange}
				onBlur={handleBlur}

			/>
			{touched.height && errors.height ? (
				<div>{errors.height}</div>):null}
			</Col>
			<Col sm={5}>
			<FastField
				placeholder="Weight"
				name = "weight"
				type = "number"
				value= {values.weight}
				onChange={handleChange}
				onBlur={handleBlur}
				className="form-control"
			/>
			{touched.weight && errors.weight ? (
				<div>{errors.weight}</div>):null}
			</Col>
			</Row>
			<br/>
			<Row>
			<br/>	
			<Col sm={5}>
			<div className="form-group">
			<Form.Label>Vaccines : </Form.Label>
			<Field as="select" name="vaccines" className="form-control" multiple>
				 <option value="Vac 1">Vac 1</option>
     			 <option value="Vac 2">Vac 2</option>
   				 <option value="Vac 3">Vac 3</option>
   			</Field>
   			</div>
			</Col>
			</Row>
			<Button type="submit" >
           		Add
         	</Button>
		</Form>
		)}
		</Formik>
		</div>
		);

}




/// 				className={touched.height && errors.height ? "error" : null }  -> use for adding red outline to box so it looks better
///.error {
///    border: 2px solid #FF6565;
//  }
// ,vaccines:values.vaccines