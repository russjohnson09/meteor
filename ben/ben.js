Expense = new Meteor.Collection('expense');

if (Meteor.isClient) {

    function selectExpense(name) {
        if (name.length == 0) return;
        var found = Expense.findOne({name:name});
        if (found) {
            Session.set("selected-expense",found);
        }
    }

    Template.main.events({
        'click #search': function () {
            selectExpense(document.getElementById("expenses-name").value);
        }
    });
    
    Template.main.expenses = function() {
        return Expense.find({});
    };
    
    Template.main.hasSelected = function() {
        var selectedExpense = Session.get('selected-expense');
        return selectedExpense || false;
    };
    
    Template.benefits.helpers({
        expense: function() {return Session.get('selected-expense')},
        name: function() {return Session.get('selected-expense').name},
        coins: function() {return Session.get('selected-expense').coins},
        deductible: function() {return Session.get('selected-expense').deductible}
    });
    
    Template.benefits.events({
        'click #applybenefits': function() {
            var id = Session.get('selected-expense')._id
            var coins = document.getElementById("coins").value;
            var deductible = document.getElementById("deductible").value;
            Expense.update({_id:Session.get('selected-expense')._id},
            {$set: {coins:coins,deductible:deductible}});
        }
    });
    
    /*Template.benefits.name = function() {
        return Session.get('selected-expense').name;
    };*/
    
    Template.expense.hasSelected = function() {
        var selectedExpense = Session.get('selected-expense');
        return selectedExpense || false;
    };
    
    Template.expense.charges = function() {
        var result = [];
        var expense = Session.get('selected-expense');
        var charges = expense.charges;
        return charges;
        for (var i=0;i<charges.length;i++) {
            result.push(charges[i]);
        }
        return result;
    };
    
    Meteor.startup(function () {
        Meteor.subscribe('expense');
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        //clear();
        addTest();
    });


    function clear() {
        Expense.remove({});
    }

    function addTest() {
        names = ['Mark','Matt','Milly','Makoto'];
        var charges = [];
        for (var i=0;i<10;i++) {
            charges.push({amount:i});
        }
        if (Expense.find({}).count() == 0) {
            for (var i=0;i<names.length;i++) {
                var exid = Expense.insert({name:names[i],charges:charges,coins:10,deductible:100});
            }
        }
    }

    Meteor.publish('expense', function () {
        return Expense.find({});
    });
    Expense.allow({
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        }
    });

}
