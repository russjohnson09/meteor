Ar = new Meteor.Collection("ar");
Customer = new Meteor.Collection("customer");


if (Meteor.isClient) {
  Template.main.events({
    'click #addcharge': function () {
        var name = document.getElementById("customer").value;
        if (name.length == 0) {
            console.log("name is a required field");
        }
        var customer = Customer.findOne({name:name});
        var cid,amount;
        if (customer) {
            cid = customer._id;
        }
        else {
            cid = Customer.insert({name:name});
        }
        var amount = parseFloat(document.getElementById("amount").value);
        var charge = Ar.insert({amount:amount,customer:cid});
        console.log("Successfully added charge of " + amount + " for customer " + name);
    },
    'click #clear' : clearClient 
  });
  
  //Template.main.customers = Template.customerlist.customers = Template.datalists.customers
  
  Template.customerlist.helpers({
    customers: function() {
        return Customer.find({});
    },
    amount: function(cid) {
        var result = 0;
        Ar.find({customer:cid}).forEach(function(doc) {
            result += doc.amount
        });
        return result;
    }
  });
  
  Template.datalists.helpers({
    customers: function() {
        return Customer.find({});
    }
  });
  
  Meteor.startup(function () {
    Meteor.subscribe("ar");
    Meteor.subscribe("customer");
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //clear();
    if (Customer.find({}).count() == 0) {
        //clear();
        //add();
    }
    
    Meteor.publish("ar", function() {
        return Ar.find({});
    });

    Meteor.publish("customer", function() {
        return Customer.find({});
    });
    
    Ar.allow({
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    });
    Customer.allow({
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    });
  });
}

  
  
function add() {
    Ar.insert({customer:'Mark',amount:1000,type:'charge',product:'cpu',quantity: 10});
    Ar.insert({customer:'Mark',amount:-1000,type:'payment',paydate:''});
}

function clear() {
    Ar.remove({});
    Customer.remove({});
}

function clearClient() {
    Ar.find({}).forEach(function(doc) {
        Ar.remove({_id:doc._id});
    });
    Customer.find({}).forEach(function(doc) {
        Customer.remove({_id:doc._id});
    });
}
