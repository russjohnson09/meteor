Template.userlist.users = function() {
    return Users.find({});
};

Template.usersum.tasks = function(uid) {
    var tasks = {};
    tasks.count = 1;
    tasks.complete = 1;
    return tasks;
};

Template.tasks.tasks = function () {
    var c = Tasks.find({});
    console.log(c);
    return Tasks.find({});
};

Template.userinput.users = function() {
    return Users.find({});
};

Template.task.assignedUser = function(uid) {
var user = Users.findOne({_id: uid});
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
  
Meteor.startup(function () {
    Meteor.subscribe('tasks');
    Meteor.subscribe('users');
    if (Tasks
});
