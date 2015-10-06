# Relay Auth

This is the code for [Auth0's Relay tutorial](). It shows how to set up a simple Relay app that reads data from a GraphQL endpoint. It also shows how to optionally add authentication middleware to the endpoint and how to send JWTs to it for access.

This sample is based off of [Michael Hart](https://twitter.com/hichaelmart)'s [simple-relay-starter](https://github.com/mhart/simple-relay-starter) repo.

## Installation

```bash
npm install
npm run dev
```

## Authentication

The `/graphql` endpoint is protected with **express-jwt** middlware.

```js
// server.js

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});


app.use('/graphql', authenticate, graphqlHttp({schema: schema}));
```

You can send a JWT to the server from the front end using Relay's network layer.

```js
// ConferenceApp.js

var token = localStorage.getItem('id_token');

Relay.injectNetworkLayer(
 new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
   headers: {
     Authorization: 'Bearer ' + token
   }
 })
);
```

## License
MIT

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.