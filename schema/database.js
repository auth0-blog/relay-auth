function User(id, name) {
  this.id = id.toString();
  this.name = name;
}

function Framework(id, name) {
  this.id = id.toString();
  this.name = name;
}

function Conference(id, frameworkId, name, description, attendees) {
  this.id = id.toString();
  this.framework = frameworkId;
  this.name = name;
  this.description = description;
  this.attendees = attendees;
}


var users = [
  new User(1, 'Ryan'),
  new User(2, 'George')
];

var frameworks = [
  new Framework(1, 'AngularJS'),
  new Framework(2, 'React'),
  new Framework(3, 'JavaScript'),
  new Framework(4, 'NodeJS')
];

var conferences = [
  new Conference(1, 1, 'ng-conf', 'The world\'s best Angular conference', [1,2]),
  new Conference(2, 2, 'React Rally', 'Conference focusing on Facebook\'s React', [1]),
  new Conference(3, 1, 'ng-Vegas', 'Two days jam-packed with Angular goodness with a focus on Angular 2', [2]),
  new Conference(4, 3, 'Midwest JS', 'Midwest JS is a premier technology conference focused on the JavaScript ecosystem.', [2]),
  new Conference(5, 4, 'NodeConf', 'NodeConf is the longest running community driven conference for the Node community.', [1,2])
];

module.exports = {
  User: User,
  Framework: Framework,
  Conference: Conference,
  
  getUser: function(id) { 
    return users.filter(function(user) { 
      return user.id == id 
    })[0] 
  },
  
  getConference: function(id) { 
    return conferences.filter(function(conference) { 
      return conference.id == id 
    })[0] 
  },
  
  getUsers: function() { 
    return users[0]
  },

  getConferencesByUser: function(userId) {
    var confs = [];
    conferences.forEach(function(conf) {
      conf.attendees.forEach(function(user) {
        if (user == userId) {
          confs.push(conf);
        }
      });
    });
    return confs;
  }
}

