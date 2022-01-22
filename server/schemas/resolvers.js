const { AuthenticationError } = require('apollo-server-express');
const { User, Meals, Subscription } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('');

const resolvers = {
    Query: {
        meals: async () => {
            return await Meals.find();
        },
        
        }
    }
}