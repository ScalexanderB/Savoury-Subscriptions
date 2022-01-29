import { gql } from '@apollo/client';

export const LOGIN = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SUBSCRIPTION = gql `
  mutation addSubscription($meals: [MealInput]!, $categories: [ID] ) {
    addSubscription(meals: $meals, categories: $categories) {
      purchaseDate
      categories {
        _id
      }
      meals {
        cartId
        name
        price
        quantity
        category {
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql `
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// export const UPDATE_USER = gql `
//   mutation updateUser(
//     $firstName: String!
//     $lastName: String!

//   )
// `