import React from 'react'
import VisitsLoad from "./VisitsLoad";
import {Form,Row,Col,Button} from "react-bootstrap";
import {Redirect} from 'react-router-dom';
export default function PatientLoad(props){
 	
      return(
      	<div>
      	 {props.props.patients.map( patient => 
        <>   
          <Form >
      <Form.Group>
      Patient Details:
      <br/>
      <Row>
      <Col sm={5}>
      <Form.Control
      value={patient.fName} disabled
      />
      </Col>
      <Col sm={5}>
      <Form.Control
      value={patient.lName} disabled
      />
      </Col>
      </Row>
      <br/>
      <Row>
      <Col sm={5}>
      <Form.Control
      value={patient.DoB} disabled
      />
      </Col>
      </Row>
      <br/>
      </Form.Group>
      <Form.Group>
      Parent Info:
      <br/>
      <Row>
      <Col sm={5}>
      <Form.Control
        value = {patient.ParentName} disabled
      />
      </Col>
      </Row>
      <br/>
      </Form.Group>
      <Form.Group>
      Contact:
      <br/>
      <Row>
      <Col sm={5}>
      <Form.Control
        value={patient.mobileNm} disabled
      />
      </Col>
      <Col sm={5}>
      <Form.Control
      value={patient.emailId} disabled
      />
      </Col>
      </Row>
      <br/>
      </Form.Group>
      </Form>     
      <VisitsLoad props={patient.id} val2={patient.visitsDone}/>
      </>
          )}
      	</div>
      	);
}



         
         
