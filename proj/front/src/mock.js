
import { mockServer, MockList } from 'graphql-tools';
import casual from 'casual-browserify';
import schema from './schema.js';
// The GraphQL schema. Described in more detail here: 
// https://medium.com/apollo-stack/the-apollo-server-bc68762e93b

// Mock functions are defined per type and return an
// object with some or all of the fields of that type.
// If a field on the object is a function, that function
// will be used to resolve the field if the query requests it.
const server = mockServer(schema, {
  RootQuery: () => ({
    user: (o, { id }) => ({ id }),
  }),
  List: () => ({
    name: () => casual.word,
    tasks: () => new MockList(4, (o, { completed }) => ({ completed })),
  }),
  Task: () => ({ text: casual.words(10) }),
  User: () => ({ name: casual.name }),
});
mockServer.query(`
	query 

	`);