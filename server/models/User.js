const { Schema, model, Types } = require('mongoose');

const SubscriptionSchema = new Schema ({
    subscriptionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    meals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        }
    ]
});

const UserSchema = new Schema ({
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
    subscription: [SubscriptionSchema]
});

const User = model('User', UserSchema);

module.exports = User;