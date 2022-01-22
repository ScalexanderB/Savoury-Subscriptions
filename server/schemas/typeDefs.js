const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Meals {
      _id: ID
      name: String
      mealID: String
      diet: [String]
      images: String

  }

  type User {
      _id: ID
      username: String
      email: String
      meals: [Meals]
      subscription: Subscription  
  }
  
  type Auth{
      token: ID!
      user: User
  }
  
  type Query: {
      user: User
      meals: [Meals]
      subscription: Subscription
  }

  type Mutation: {
      
  }
`