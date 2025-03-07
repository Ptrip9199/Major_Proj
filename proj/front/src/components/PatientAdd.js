import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {useMutation} from '@apollo/react-hooks';
import PatientLoad from "./PatientLoad";
import {ADD_PATIENT_MUTATION} from "./graphql";
import {Form,Row,Col} from 'react-bootstrap';
// const ADD_PATIENT_MUTATION = gql`
// mutation($fname:String, $lname:String, $DoB:Date, $Parentname:[String], $mobilenm:String, $emailid:String){
//   CreatePatient(fname:$fname,lname:$lname,DoB: $DoB, Parentname:$Parentname,mobilenm:$mobilenm,emailid:$emailid){
//     ok
//     patient{
//       fName
//       lName
//       gender
//       DoB
//       Parentname
//       id
//       emailid
//       mobilenm
//     }
//   }
// }
// `



function PatientAdd () {
	const [fName, setfName]  =  useState("");
	const [lName, setlName]  =  useState("");
	const [DoB, setDoB]  =  useState("");
	const [ParentNm, setParentNm]  =  useState("");
	const [mobile, setmobile]  =  useState("");
	const [email, setemail]  =  useState("");
	const [gender, setgender] = useState("");
	//TODO:
	//add a validate for each element seperated and then combine them all later


	const [addPat,{data}] = useMutation(ADD_PATIENT_MUTATION)


	if(data){
		return (<PatientLoad props={data.patient}/>)
	}

	function validateForm(){
		//condition to check 10 digit mobile number
		var mobnm_regex = "[1-9]{1}[0-9]{9}";
	   	var res = mobile.match(mobnm_regex)

	   	return (res && lName && email && gender && ParentNm);
	}



	return(
			<>

			<div>
			<Form onSubmit=	{e => {
				e.preventDefault();
				console.log("try")
				addPat({variables:{fname: fName,lname: lName,DoB: DoB, Parentname: ParentNm.split(","),mobilenm: mobile.toString(),emailid: email, gender: gender}});
			}}>
			<h2>Patient Details:</h2>
			<br/>
			<Row>
			<Col sm={5}>
			<Form.Label>First Name</Form.Label>
			<Form.Control
				placeholder="First Name"
				type = "text"
				value= {fName}
				onChange={e=> setfName(e.target.value)}
			/></Col>
			<Col sm={5}>
			<Form.Label>Last Name</Form.Label>
			<Form.Control
				placeholder="Last Name"
				type = "text"
				value= {lName}
				onChange={e=> setlName(e.target.value)}
			/></Col>
			</Row>
			<br/>
			<Row>
			<Col sm={5}>
			<Form.Label>DoB</Form.Label>
			<Form.Control 
				placeholder="DoB"
				type = "date"
				value= {DoB}
				onChange={e=> setDoB(e.target.value)}
			/></Col>
			<Col sm={5}>
			<Form.Group>
			<Row><Col>
				<Form.Label>Gender:</Form.Label>	
				</Col>
				<Col>
				<Form.Check
	          type="radio"
	          label="Male"
	          name="gender"
   	    	  value="Male"
   	    	  onChange={e=> setgender(e.target.value)}
   	    	    />
    		    
    		    <Form.Check
        	  type="radio"
        	  name="gender"
        	  label="Female"
        	  value="Female"
        	  onChange={e=> setgender(e.target.value)}
        	/>
        	</Col>
        	</Row>
			</Form.Group>
			</Col>
			</Row>
			<br/>
			<h4>Parent Info:</h4>
			<br/>
			<Row>
			<Col sm={5}>
			<Form.Label>Parent Names</Form.Label>
			<Form.Control
				placeholder="Parent Names(seperated by ,)"
				type = "text"
				value= {ParentNm}
				onChange={e=> setParentNm(e.target.value)}
			/>
			</Col>
			</Row>
			<br/>
			Contact:
			<br/>
			<Row>

			<Col sm={5}>
			<Form.Label>Mobile Number</Form.Label>
			<Form.Control
				placeholder="Mobile Number"
				type = "number"

				value= {mobile}
				onChange={e=> setmobile(e.target.value)}
			/>
			</Col>
			<Col sm={5}>
			<Form.Label>Email-id</Form.Label>
			<Form.Control
				placeholder="Email ID"
				type = "email"
				value= {email}
				onChange={e=> setemail(e.target.value)}
			/>
			</Col>
			</Row>
			<br/>
			<Button disabled={!validateForm()} type="submit" >
           		Add
         	</Button>
			</Form>			
			</div>
			</>
	);
}

export default PatientAdd