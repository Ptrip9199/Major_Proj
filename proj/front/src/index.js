import gql  from 'graphql-tag';
import ApolloClient from "apollo-boost";
//import { Query } from "react-apollo";


 const client = new ApolloClient({
 	uri : "http:/lcocahost:5000/graphql",
 });

var qrey = gql`
	{
		findPatients{
			edges{
				node{
					fName
					lName
				}
			}
		}
	}`;


//const data = useQuery(qrey);

client.query({
	query : qrey
}).then(response => console.log(response))