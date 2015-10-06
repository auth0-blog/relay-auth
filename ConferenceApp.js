/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')

class Conference extends React.Component {
  render() {
    // We get the conference edges passed in from the top-level container
    // The edges have data like name and id on them
    var edge = this.props.edge;
    return (
      <div className="col-sm-4">
        <div className="panel panel-default" key={edge.node.id}>
          <div className="panel-heading">
            <h3>{edge.node.name}</h3>
          </div>
          <div className="panel-body">
            {edge.node.description}
          </div>           
        </div>
      </div>
    )
  }
}

// ConferenceApp is our top-level component
class ConferenceApp extends React.Component {
  render() {
    return(
      <div className="container">
        <h2>{this.props.user.name}&#39;s Conferences</h2>
        {this.props.user.conferences.edges.map(edge =>
          <Conference edge={edge} />
        )}        
      </div>
    )
  }  
}

// We need to export a Relay container that wraps around
// the top-level ConferenceApp component
exports.Container = Relay.createContainer(ConferenceApp, {
  // We initially want to get the first user's conferences
  initialVariables: {
    userToShow: 1
  },
  fragments: {
    // Results from this query will be placed on this.props for access in
    // our component
    user: () => Relay.QL`
      fragment on User {
        name,
        conferences(userToShow: $userToShow) {
          edges {
            node {
              id,
              name,
              description
            },
          },
        },
      }
    `,
  },
});

// The queries to be used by the root container
exports.queries = {
  name: 'ConferenceQueries',
  params: {},
  queries: {
    // user in this case matches the fragment in the container above
    user: () => Relay.QL`query { user }`
    
  },
}

// If we want to do authentication on our GraphQL endpoint, we can pass
// a JWT that will be picked up by the express-jwt middleware on the server.
// You first need to fetch and store a JWT in local storage. Once it's in there,
// you can send it as a header when you make calls to GraphQL.

// How you implement the JWT fetching is at your discretion, but you can use
// Auth0's Lock for an easy solution

// var token = localStorage.getItem('id_token');

// Relay.injectNetworkLayer(
//   new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
//     headers: {
//       Authorization: 'Bearer ' + token
//     }
//   })
// );

