import React from 'react'
import VisitsLoad from "./VisitsLoad";
import {Form} from "react-bootstrap";

export default function PatientLoad(props){
 	
 	    return(
      	<div>
      	 {props.props.patients.map( patient => 
        <>   
          <Form >
      <Form.Group>
      Patient Deatils:
      <br/>
      <Form.Control
      value={patient.fName} disabled
      />
      <Form.Control
      value={patient.lName} disabled
      />
      <Form.Control
      value={patient.DoB} disabled
      />
      <br/>
      </Form.Group>
      <Form.Group>
      Parent Info:
      <br/>
      <Form.Control
        value = {patient.ParentName} disabled
      />
      <br/>
      </Form.Group>
      <Form.Group>
      Contact:
      <br/>
      <Form.Control
        value={patient.mobileNm} disabled
      />
      <Form.Control
      value={patient.emailId} disabled
      />
      <br/>
      </Form.Group>
      </Form>     
      <VisitsLoad props={patient.id} val2={patient.visitsDone}/>
      </>
          )}
      	</div>
      	);

 
}



         
         
