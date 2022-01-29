const mongoose = require('mongoose');
const { AuthenticationError } = require('apollo-server-express');
const { User, Subscription, Meal, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async() => {
            return await Category.find();
        },
        meals: async(parent, { category, name, }) => {
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
        meal: async(parent, { _id }) => {
            return await Meal.findById(_id).populate('category');
        },
        user: async(parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'subscription.meals',
                    populate: 'category'
                });

                user.subscription.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in.');
        },
        subscription: async(parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'subscription.meals',
                    populate: 'category'
                });

                return user.subscription.id(_id);
            }

            throw new AuthenticationError('Not logged in.');
        },
        allSubs: async(parent, args, context) => await Subscription.find({}),
        checkout: async(parent, args, context) => {
            console.log("########### NEW CHECKOUT ############");

            const url = new URL(context.headers.referer).origin;
            //const subscription = new Subscription({ meals: args.meals, categories: ["Test", "Category"] });
            const line_items = [];

            // const order = await subscription.populate('meals').execPopulate();

            //console.log(order);
            const { meals } = args;

            for (let i = 0; i < meals.length; i++) {
                const product = await stripe.products.create({
                    name: meals[i].name,
                    description: `Meal for ${meals[i].quantity}`,
                    images: [`${url}/images/${meals.image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: meals[i].price * meals[i].quantity * 100,
                    currency: 'cad',
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
                cancel_url: `${url}/404`
            });

            console.log(`Session ID: ${session.id}`)
            return { session: session.id };
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addSubscription: async(parent, { meals, categories }, context) => {
            console.log("++++++++++ PAYMENT SUCCESS +++++++++++++");
            console.log(`Adding Subscription to ${context.user.firstName}`);
            //console.log(categories);
            //console.log(meals);

            if (context.user) {
                const subscription = new Subscription({ meals, categories });

                const data = await User.findByIdAndUpdate(context.user._id, { $push: { subscription: subscription } });
                //console.log(data);

                return subscription;
            }

            throw new AuthenticationError('Not logged in.');
        },
        removeSubscription: async(parent, { id }, context) => {

            console.log(id);
            const data = await User.findByIdAndUpdate(context.user._id, {
                $pull: {
                    subscription: [{ _id: { $toObjectId: id } }]
                }
            });
            //{ $pullAll: { scores: [ 0, 5 ] } } )
            console.dir(data.subscription[0]._id);
            console.dir(mongoose.Types.ObjectId(id));
            if (data.subscription[0]._id === mongoose.Types.ObjectId(id)) {
                console.log("Match!!!!");
            }


            return data;
        },
        removeAllUserSubscriptions: async(parent, args, context) => {
            const data = await User.findByIdAndUpdate(context.user._id, { $set: { subscription: [] } });
            return data;
        },
        updateUser: async(parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in.');
        },
        // updateMeal: async (parent, { _id, quantity }) => {
        //     const decrement = Math.abs(quantity) * -1;

        //     return await Meal.findByIdAndUpdate(_id, {$inc: { quantity: decrement }}, { new: true });
        // },
        login: async(parent, { email, password }) => {
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