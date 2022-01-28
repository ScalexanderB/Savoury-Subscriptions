const db = require('./connection');

const { User, Meal, Category } = require('../models');

db.once('open', async() => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'All' },
        { name: 'Vegetarian' },
        { name: 'Dairy Free' },
        { name: 'Gluten Free' },
        { name: 'Nut Free' },
        { name: 'Vegan' },
        { name: 'Halal' },
        { name: 'Kosher' },
        { name: 'Favourites' }
    ]);

    console.log('categories seeded');

    await Meal.deleteMany();

    const meals = await Meal.insertMany([{
            name: "Tofu Pad Thai",
            image: "pad-thai.jpg",
            category: [categories[0]._id, categories[1]._id],
            ingredients: ["tofu", "noodles", "green onion"],
            quantity: 150,
            price: 7.50
        },
        {
            name: "Macaroni & Cheese",
            image: "mac-cheese.jpg",
            category: [categories[0]._id],
            ingredients: ["cheese", "noodles", "milk", "butter"],
            quantity: 250,
            price: 5.75
        },
        {
            name: "Veggie Burger",
            image: "veggie-burger.jpg",
            category: [categories[0]._id],
            ingredients: ["veggie patty", "bun", "lettuce", "tomatoes", "pickles"],
            quantity: 200,
            price: 6.00
        },
        {
            name: "Shrimp Fried Rice",
            image: "fried-rice.jpg",
            category: [categories[1]._id],
            ingredients: ["shrimp", "rice", "onion", "bell peppers"],
            quantity: 300,
            price: 6.75
        },
        {
            name: "BBQ Chicken",
            image: "bbq-chicken.jpg",
            category: [categories[1]._id],
            ingredients: ["chicken", "spices", "potatoes", "carrots"],
            quantity: 275,
            price: 7.99
        },
        {
            name: "Stuffed Peppers",
            image: "stuffed-peppers.jpg",
            category: [categories[2]._id],
            ingredients: ["bell pepper", "beef", "onion", "cheese"],
            quantity: 250,
            price: 6.50
        },
        {
            name: "Frittata",
            image: "frittata.jpg",
            category: [categories[0]._id, categories[2]._id],
            ingredients: ["eggs", "bell pepper", "onion", "carrots"],
            quantity: 175,
            price: 5.75
        },
        {
            name: "Taco Salad",
            image: "taco-salad.jpg",
            category: [categories[2]._id],
            ingredients: ["beef", "spices", "lettuce", "tomato", "dressing", "avocado"],
            quantity: 215,
            price: 7.25
        },
        {
            name: "Fish Tacos",
            image: "fish-tacos.jpg",
            category: [categories[3]._id],
            ingredients: ["fish", "tortillas", "coleslaw", "cheese"],
            quantity: 300,
            price: 8.15
        },
        {
            name: "Chicken Parm",
            image: "chicken-parm.jpg",
            category: [categories[3]._id],
            ingredients: ["chicken", "bread crumbs", "marinara", "cheese", "noodles"],
            quantity: 200,
            price: 6.50
        },
        {
            name: "Chilli",
            image: "chile.jpg",
            category: [categories[1]._id],
            ingredients: ["beef", "carrots", "beans", "onion", "bell pepper", "spices"],
            quantity: 275,
            price: 7.15
        },
        {
            name: "Chicken Alfredo",
            image: "chicken-alfredo.jpg",
            category: [categories[3]._id],
            ingredients: ["chicken", "noodles", "milk", "cheese"],
            quantity: 300,
            price: 5.75
        }
    ]);

    console.log('meals seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'Sam',
        lastName: 'Savoury',
        email: 'sam@email.com',
        password: 'pass123'
    });

    await User.create({
        firstName: 'Scott',
        lastName: 'Savoury',
        email: 'scott@email.com',
        password: 'pass321'
    });

    await User.create({
        firstName: 'Jazz',
        lastName: 'Savoury',
        email: 'jasmine@email.com',
        password: 'password123'
    });

    await User.create({
        firstName: 'Dave',
        lastName: 'Savoury',
        email: 'dave@email.com',
        password: 'password321'
    });

    console.log('users seeded');

    process.exit();
});