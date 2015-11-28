

// create collection 
Beacons = new Mongo.Collection("beacons");

// Client only code goes here
if (Meteor.isClient) {
  
  // Set Session objects
  Session.setDefault("apikey", false);
  Session.setDefault("dataListString", false);
  Session.setDefault("dataListJson", false);
  Session.setDefault("waiting", false);

  Template.body.helpers({
    isApiKeySet: function () {
      return Session.get("apikey");
    },
    isDataList: function () {
      return Session.get("dataListString");
    },
    isWaiting: function () {
      return Session.get("waiting");
    },
    tableHeader: function () {
      var r = Session.get("dataListJson");
      return Object.keys(r[0]);
    },
    tableRows: function () {
      var r = Session.get("dataListJson");
      
      var c = new Array();

      for (var i in r)
      {
        var k = Object.keys(r[i]);

        c[i] = new Array();

        for (var j in k)
        {      
          c[i][j] = r[i][k[j]];
        }
      }

      return c;
    }
  })

  Template.body.events({
    "submit .api_key_input_field": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // get input value
      Session.set("apikey", event.target.key.value);

      // Clear form
      event.target.key.value = "";
    },

    "click .getButtons": function (event) {
      event.preventDefault();
      Session.set("waiting", true);

      // call method on server to get data from external API
      Meteor.call('getData', Session.get("apikey"), event.target.name, function(err,res){
        Session.set("dataListString", JSON.stringify(res));
        Session.set("dataListJson", res);
        Session.set("waiting", false);
      })
    }     
  })
}

// Server only code goes here
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({

  // get Beacons
  'getData': function (apikey, apicall) {

    // Construct the API URL
    var apiUrl = 'https://interactor.swisscom.ch/api/'+apicall;

    console.log(apiUrl);

    // query the API
    var response = HTTP.get(apiUrl, {
        headers: {
           // "x-interact-api-key": "aa6e4237-79d0-4d62-93d7-30854b089b4a" 
           "x-interact-api-key": apikey
        }
    }).data;
    
    // console.log("Interactor response:" , response);

    return response;
    },

  // listen to events
  'getEvents': function (apikey, apicall) {

    // Construct the API URL
    var apiUrl = 'https://interactor.swisscom.ch/api/'+apicall;

    console.log(apiUrl);

    // query the API
    var response = HTTP.get(apiUrl, {
        headers: {
           // "x-interact-api-key": "aa6e4237-79d0-4d62-93d7-30854b089b4a" 
           "x-interact-api-key": apikey
        }
    }).data;
    
    // console.log("Interactor response:" , response);

    return response;
    }    
  });

}
