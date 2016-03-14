

// Server only code goes here
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  // Meteor methods go here....
  Meteor.methods({

    // get configuration data
    'getData': function (apikey, apicall) {

      // Construct the API URL
      var apiUrl = 'https://interactor.swisscom.ch/api/'+apicall;

      console.log(apiUrl);

      // query the API
      var response = HTTP.get(apiUrl, {
          // set API key in header
          headers: {
             "x-interact-api-key": apikey
          }
      }).data;
      
      return response;
      },

    // listen to events
    'getEvents': function (apikey, events) {
      console.log("listen to "+events);
      return ;
      }    
  });

}
