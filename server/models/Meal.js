const { Schema, model } = require('mongoose');

const MealSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    ingredients: [],
    quantity: {
        type: Number,
        required: true,
    }
});

const Meal = model('Meal', MealSchema);

module.exports = Meal;