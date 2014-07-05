Tasks = new Meteor.Collection("tasks");
Users = new Meteor.Collection("users");
var settings = Meteor.settings;

if (settings) {
    var debugMode = settings.debugMode;
}

if (Meteor.isClient) {

    Template.userlist.users = function() {
        return Users.find({});
    };
    
    Template.usersum.tasks = function(uid) {
        //console.log(uid);
       // var c = Tasks.find({uid: uid});
        var tasks = {};
        tasks.count = 1;
        tasks.complete = 1;
        return tasks;
    };
  
  Template.tasks.tasks = function () {
    return Tasks.find({});
  };
  
  Template.userinput.users = function() {
    return Users.find({});
  };
  
  Template.task.assignedUser = function(uid) {
    //console.log(id);
    var user = Users.findOne({_id: uid});
    //console.log(user);
    if (user) {
        return user.name;
    }
    return "";
  };
  
  Template.addtask.events({
    'click #addtask': function (e) {
            var uid;
            var name = document.getElementById("taskname").value;
            var userName = document.getElementById("user").value;
            console.log(userName);
            if (userName.length > 0) {
                var user = Users.findOne({name: userName});
                if (user) {
                    console.log(user);
                    uid = user._id;
                }
                else {
                    uid = Users.insert({name: userName});
                }
            }
            Tasks.insert({name: name, uid: uid});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //clear();
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
        var uid = Users.insert({name:users[i]});
        var taskId = Tasks.insert({name: taskNames[i], uid:uid});
    }
};
