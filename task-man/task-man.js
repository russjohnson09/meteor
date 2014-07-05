Tasks = new Meteor.Collection("tasks");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to task-man.";
  };
  
  Template.tasks.tasks = function () {
  };
  
  Template.addtask.events({
    'click #addtask': function () {
        console.log("Adding task");
    }
  });
  
  

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
