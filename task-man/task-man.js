Tasks = new Meteor.Collection("tasks");
Users = new Meteor.Collection("users");
var settings = Meteor.settings;

if (settings) {
    var debugMode = settings.debugMode;
}

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to task-man.";
  };
  
  Template.tasks.tasks = function () {
    return Tasks.find({});
  };
  
  Template.task.assignedUser = function(id) {
    console.log(id);
    var user = Users.findOne({taskId: id});
    console.log(user);
    if (user) {
        return user.name;
    }
    return "";
  };
  
  Template.addtask.events({
    'click #addtask': function (e) {
            var name = document.getElementById("taskName").value;
            console.log(name);
            Tasks.insert({name: name});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    clear();
    if (Tasks.find({}).count() === 0) {
        addTasks();
    }
  });
}

function clear() {
    Tasks.remove({});
    Users.remove({});
}

function addTasks() {
    var taskNames = ['food','work','play'];
    var users = ['mark','susan','matt'];
    for (var i=0; i < taskNames.length; i++) {        
        var taskId = Tasks.insert({name: taskNames[i]});
        console.log(taskId);
        var uid = Users.insert({name:users[i], taskId:taskId});
    }
};
