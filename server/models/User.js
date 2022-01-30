const { Schema, model, Types } = require('mongoose');
const { MealSchema } = require('./Meal');
const bcrypt = require('bcrypt');

const SubscriptionSchema = new Schema({
    subscriptionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    meals: [MealSchema]
});

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    subscription: [SubscriptionSchema],
    addressLine: [{ type: String }],
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },

});

// set up pre-save middleware to create password
UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);
const Subscription = model('Subscription', SubscriptionSchema);

module.exports = { User, Subscription };