const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
  }

  type Meal {
      _id: ID
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
      category: [Category]
  }

  type Checkout {
      session: ID
  }
  
  type Auth {
      token: ID!
      user: User
  }

  type Query{
      categories: [Category]
      meals(category: ID, name: String): [Meal]
      meal(_id: ID!): Meal
      user: User
      subscription(_id: ID!): Subscription
      checkout(meals: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSubscription(meals: [ID]!): Subscription
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateMeal(_id: ID!, quantity: Int!): Meal
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;