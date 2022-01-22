const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
     _id: ID
     firstName: String
     lastName: String
     email: String
     subscription: Subscription
  }

  type Meal {
      _id: ID
      name: String
      image: String
      category: [Category]
      ingredients: [String]
      quantity: Int
  }

  type Subscription {
      _id: ID
      purchaseDate: String
      meals: [Meal]
      category: [Category]
  }
  
  type Auth{
      token: ID!
      user: User
  }

  type Mutation: {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      addMeal(meals: [ID]!): Meal

  }
`

module.exports = typeDefs;