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

export const UPDATE_USER = gql `
   mutation updateUser(
        $firstName: String
        $lastName: String
        $email: String
        $addressLine: [String]
        $city: String
        $province: String
        $postalCode: String
   ){
     updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      addressLine: $addressLine
      city: $city
      province: $province
      postalCode: $postalCode
       ){
          firstName
          lastName
          email
          addressLine
          city
          province
          postalCode
          subscription {
            _id
            purchaseDate
            meals {
              _id
              name
              ingredients
              price
              quantity
              image
            }
          }
       }
   }
 `;

export const ADD_FAV_MEAL = gql `
 mutation addToFavs($id: ID! ) {
  addToFavs(id: $id) {
    favMeals{
      _id
    }
  }
}
`;

export const REMOVE_FAV_MEAL = gql `
 mutation removeFav($id: ID! ) {
  removeFav(id: $id) {
    favMeals{
      _id
    }
  }
}
`;

export const REMOVE_SUBSCRIPTION = gql `
 mutation removeSubscription($id: ID! ) {
  removeSubscription(id: $id) {
    subscription {
      _id
      purchaseDate
      meals {
        _id
        name
        ingredients
        price
        quantity
        image
      }
    }
  }
}
`;

export const UPDATE_SUBSCRIPTION = gql `
  mutation updateSubscription($id: ID!, $meals: [MealInput]!  ) {
    updateSubscription(id: $id, meals: $meals) {
      _id
      email
      subscription {
        _id
        purchaseDate
        meals {
          _id
          name
          ingredients
          price
          quantity
          image
        }
      }
    }
  }
`;