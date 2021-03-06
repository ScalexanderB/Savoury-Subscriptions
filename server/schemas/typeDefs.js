const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type Category {
      _id: ID
      name: String
  }

  type User {
     _id: ID
     firstName: String
     lastName: String
     email: String
     subscription: [Subscription]
     favMeals: [Meal]
     addressLine:[String]
     city: String
     province: String
     postalCode: String
  }

  type Meal {
      _id: ID
      cartId: ID
      name: String
      image: String
      category: [Category]
      ingredients: [String]
      quantity: Int
      price: Float
  }

  type Subscription {
      _id: ID
      purchaseDate: String
      meals: [Meal]
      categories: [Category]
  }

  type Checkout {
      session: ID
  }
  
  type Auth {
      token: ID!
      user: User
  }

  input MealInput {
      cartId: ID
      name: String
      image: String
      ingredients: [String]
      category: [ID]
      quantity: Int
      price: Float
    }
    
  type Query{
      categories: [Category]
      meals(category: ID, name: String): [Meal]
      meal(_id: ID!): Meal
      user: User
      subscription(_id: ID!): Subscription
      allSubs: [Subscription]
      checkout(meals: [MealInput]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSubscription(meals: [MealInput]!, categories: [ID]): Subscription
    addToFavs(id: ID!): User
    removeFav(id: ID!): User
    removeUser(id: ID!): User
    removeSubscription(id: ID!): User
    removeAllUserSubscriptions: User
    updateSubscription(id: ID!, meals:[MealInput]!): User
    updateUser(firstName: String, lastName: String, email: String, addressLine: [String], city: String, province: String, postalCode: String,): User
    updateMeal(_id: ID!, quantity: Int!): Meal
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;