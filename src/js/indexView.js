/**
 * Created by charlie on 10/8/16.
 */

'use strict';

var Backbone = require('backbone');

module.exports = Backbone.View.extend({
        el: '.login-form',

        initialize: function () {

        },

        events: {
            // 'click #login-btn': 'login',
            // 'click #signup-btn': 'signUp'
        },
        
        login: function () {
            //login with passport and go to home page
            console.log("logging in");
        },
        
        signUp: function () {
            //redirect to sign up page
            console.log("signing up");
        }

    });
