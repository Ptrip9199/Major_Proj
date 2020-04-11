import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Table } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import "../styles/DataLoad.css";
import gql from "graphql-tag";
//mport { useQuery } from 'react-apollo';
import  { Redirect } from "react-router-dom";
import { Query } from "react-apollo";




export default function DataLoad(props){
  const pat_query = gql`
    {
      query{
        patients{
          fName
          lName
          emailId
          mobileNm
          ParentName
      }
    }
  }`


  return (
    <Query query={pat_query}>
    {
      ({loading,error,data}) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return(
        <div>
        <p>{data.patients.fName} &nbsp; {data.patients.lName}</p>
        <p>Contact: {data.patients.emailId} , {data.patients.mobileNm}</p>
        </div>
        );
      }
    }
    </Query>
      )



}

/// export default function DataLoad(props){
//   // const[First_name, setFirst_name]  =  useState("");
//   // const[last_name, setlast_name]  =  useState("");
//    const [mob_num, setmob_num]  =  useState("");
//   function validateForm() {
//     //return ((First_name.length > 0 && last_name.length > 0) || (mob_num > 0)) ;
//     var mobnm_regex = "[1-9]{1}[0-9]{9}";
//     var res = mob_num.match(mobnm_regex)
//     return res;
//   }

//   const dat = ({ mob_num }) => (
//       <Query query={pat_query}>
//         {({loading, error, data}) => {
//           if (loading) return 'Loading...';
//           if (error) return "Error! ${error.message}";
  
//           return (
//             "Data Printed {data.patients.fName}");
//         }

//         }
//       </Query>
//       )

//     async function handleSubmit(event) {
//     event.preventDefault();
    
//     }  

    

//     return (
//       <div className="DataLoad">
//       <form onSubmit={handleSubmit}>
//          <FormGroup controlId="mob_num" bsSize="small">
//          <ControlLabel>Mobile Number</ControlLabel>
//           <FormControl
//           type = "number"
//             value={mob_num}
//             onChange={e=> setmob_num(e.target.value)}/>
//         </FormGroup>
//         <Button block bsSize="small" disabled={!validateForm()} type="submit">
//           Search
//         </Button>
//       </form>
//     </div>);
// }


/// <FormGroup controlId="First_name" bsSize="small">
        //   <ControlLabel>First Name</ControlLabel>
        //   <FormControl
        //     autoFocus
        //     value={First_name}
        //     onChange={e => setFirst_name(e.target.value)}
        //   />
        // </FormGroup>
        // <FormGroup controlId="last_name" bsSize="small">
        //   <ControlLabel>Last Name</ControlLabel>
        //   <FormControl
        //     value={last_name}
        //     onChange={e => setlast_name(e.target.value)}
        //   />
        // </FormGroup>
