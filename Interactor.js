// create new collection for API key
Keys = new Mongo.Collection("apikey");

// Client only code goes here
if (Meteor.isClient) {

  Template.body.helpers({
    keys: function () {
	return Keys.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .api_key_input_field": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // get input value
      var apikey = event.target.key.value;

      // store API in collection
      Keys.insert({
	key: apikey,
	createdAt: new Date() 
	});

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
