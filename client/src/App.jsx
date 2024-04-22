import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/Context'
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Construct (point to) Our NEW SINGLE GRAPHQL ENDPOINT '/graphql' with HTTTP: POST METHOD
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  
  return { 
    ...headers,
    authorization: token ? `Bearer ${token}` : ''
  }
})

// Createing the MIDDLEWARE connection instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
// Construct a new Apollo Client
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
