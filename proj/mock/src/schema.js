import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

// Fill this in with the schema string
const schemaString = `
	type Patient{
		id : ID
		fName : String
		lName : String
		DoB : DateTime
		ParentName : [String]
		mobileNm : String
		emailId : String
		visitsDone : [Visits]
	}

	type Visits{
		id : ID
		date : DateTime
		patId : Patient
		weight : Int
		height : Int
	}

	query{
		findPatients : [Patient]
		findVisits : [Visits]
		findPatients( mobileNm : String!  ) : Patient 
	}
`;


const schema = makeExecutableSchema( { typeDefs: schemaString });

module.exports = schema
