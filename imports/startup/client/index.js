import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { graphql } from "react-apollo";


import App from "/imports/ui/App";


// const client = new ApolloClient({
//     uri: Meteor.absoluteUrl("graphql"),
//     cache: new InMemoryCache(),
// });



import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat , ApolloProvider} from '@apollo/client';

const httpLink = new HttpLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = Accounts._storedLoginToken();
  operation.setContext({
    headers: {
      // authorization: localStorage.getItem('token') || null,
      "meteor-login-token": token
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});






const ApolloApp = () => {
    return (
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
    );
}


Meteor.startup(() => {
    render(<ApolloApp />, document.getElementById("app"));
});


