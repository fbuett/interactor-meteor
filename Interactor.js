// create new collection for API key
Key = new Mongo.Collection("apikey");

// Client only code goes here
if (Meteor.isClient) {
  // Clear apiKey 
  Session.setDefault('apiKey', "");

  Template.body.helpers({
    key: function () {
	return Session.get("apiKey");
    }
  });

  Template.body.events({
    "submit .api_key_input_field": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // get input value
      var apikey = event.target.key.value;

      // store API in collection
      Key.insert({
	key: apikey
	});

      // store API key in session value for
      // client use only
      Session.set("apiKey", apikey);

      // Clear form
      event.target.key.value = "";
    }
  });
}

// Server only code goes here
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
  'getBeacons': function (apikey) {
    console.log('Method.getBeacons', apikey);

    // Construct the API URL
    var apiUrl = 'http://interactor.swisscom.ch/api/beacons';

    // query the API
    var response = HTTP.get(apiUrl, {
        headers: {
           "x-interact-api-key": "12344" 
        }
    }).data;

    return response;
  }
});



}
