Tasks = new Meteor.Collection("tasks");
Users = new Meteor.Collection("users");

if (Meteor.isServer) {
      Meteor.publish('tasks', function () {
        return Tasks.find({});
      });
}
