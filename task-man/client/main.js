Template.userlist.users = function() {
    return Users.find({});
};

Template.usersum.tasks = function(uid) {
    var tasks = {};
    var c = Tasks.find({});
    tasks.complete = 0; 
    tasks.incomplete = 0;
    c.forEach(function(task) {
        if (task.isComplete) {
            tasks.complete++;
        }
        else {
            tasks.incomplete++;
        }
    });
    tasks.count = c.count();
    return tasks;
};

Template.tasks.tasks = function () {
    var c = Tasks.find({});
    console.log(c);
    return c;
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

Template.task.events({
    'click #completetask': function(e) {
        
    }
});

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
        console.log(name);
        console.log(uid);
        Tasks.insert({name: name, uid: uid});
    }
});
  
Meteor.startup(function () {
    Meteor.subscribe('tasks');
    Meteor.subscribe('users');
});
