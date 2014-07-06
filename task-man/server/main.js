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
