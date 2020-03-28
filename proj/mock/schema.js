import { graphql } from 'graphql';
const { gql } = require('apollo-server');


// Fill this in with the schema string
const schemaString = gql`
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
		findPatients(mobileNm : String!) : Patient
		
	}
`;


module.exports = schemaString;

// // Make a GraphQL schema with no resolvers
// const schema = makeExecutableSchema({ typeDefs: schemaString });

// // Add mocks, modifies schema in place
// addMockFunctionsToSchema({ schema });

// const query = `
// query tasksForUser {
//   user(id: 6) { id, name }
// }
// `;

// graphql(schema, query).then((result) => console.log('Got result', result));

