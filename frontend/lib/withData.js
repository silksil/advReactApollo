// Gives us a high-order component that exposes the Apollo Client through a prop
import withApollo from 'next-with-apollo';
// Apollo Boost includes preconfigured packages to develop with with Apollo Client
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

// headers are used, among other things, for authentication
function createClient({ headers }) {
  return new ApolloClient({
    // currently the endpoint remains the same, but this can change if you go to production
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          // We instruct to pass credentials for  every single request
          // for example, when being logged in, cookies are passed
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);