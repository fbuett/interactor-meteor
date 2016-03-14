

// Client only code goes here
if (Meteor.isClient) {
  
  // Set Session objects
  Session.setDefault("apikey", false);
  Session.setDefault("dataListString", false);
  Session.setDefault("dataListJson", false);
  Session.setDefault("waiting", false);
  Session.setDefault("logState", "off");

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

    // click button events
    "click .getButtons": function (event) {
      event.preventDefault();
      Session.set("waiting", true);

      // call method on server to get data from external API
      Meteor.call('getData', Session.get("apikey"), event.target.name, function(err,res){
        Session.set("dataListString", JSON.stringify(res));
        Session.set("dataListJson", res);
        Session.set("waiting", false);
      })
    },
    
    // toogle events
    "change .getToggle": function (event) {
      event.preventDefault();

      // call method on server to get data from external API
      Meteor.call('getEvents', Session.get("apikey"), event.target.value, function(err,res){
      })
    }         
  })
}

