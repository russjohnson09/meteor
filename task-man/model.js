Tasks = new Meteor.Collection("tasks");
Users = new Meteor.Collection("users");

if (Meteor.isServer) {
    Meteor.startup(function () {
        //clear();
        if (Tasks.find({}).count() === 0) {
            addTasks();
        }
    });

    Meteor.publish('tasks', function () {
        return Tasks.find({});
    });
    
    Meteor.publish('users', function() {
        return Users.find({});
    });
    
    Tasks.allow({
        insert: function() {
            return true;
        }
    });
    
    Users.allow({
        insert: function() {
            return true;
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
