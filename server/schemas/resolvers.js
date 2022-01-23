const { AuthenticationError } = require('apollo-server-express');
const { User, Meal, Category } = require('../models');
const { signToken } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        meals: async (parent, { category, name, }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Meal.find(params).populate('category');
        },
        meal: async (parent, { _id }) => {
            return await Meal.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'subscriptions.meals',
                    populate: 'category'
                });

                user.subscriptions.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in.');
        },
        subscription: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'subscriptions.meals',
                    populate: 'category'
                });

                return user.subscriptions.id(_id);
            }

            throw new AuthenticationError('Not logged in.');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const subscription = new Subscription({ mealss: args.meals });
            const line_items = [];
      
            const { meals } = await subscription.populate('meals').execPopulate();
      
            for (let i = 0; i < meals.length; i++) {
              const product = await stripe.meals.create({
                name: meals[i].name,
                ingredients: meals[i].description,
                images: [`${url}/images/${meals[i].image}`]
              });
      
              const price = await stripe.prices.create({
                meal: meal.id,
                unit_amount: meals[i].price * 100,
                currency: 'usd',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
          }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addSubscription: async (parent, { meals }, context) => {
            console.log(context);
            if (context.user) {
                const subscription = new Subscription({ meals });

                await User.findByIdAndUpdate(context.user._id, { $push: { subscriptions: subscription }});

                return subscription;
            }

            throw new AuthenticationError('Not logged in.');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in.');
        },
        updateMeal: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Meal.findByIdAndUpdate(_id, {$inc: { quantity: decrement }}, { new: true });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials.');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;