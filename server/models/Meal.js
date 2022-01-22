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
    category: [],
    ingredients: []
});

const Meal = model('Meal', MealSchema);

module.exports = Meal;