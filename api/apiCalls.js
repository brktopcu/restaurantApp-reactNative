import { allRestaurantsUrl, loginUrl, registerUrl } from "./constants";

export const fetchAllRestaurants = async (token) => {
  const response = await fetch(allRestaurantsUrl, {
    method: "get",
    headers: {
      Authorization: token,
    },
  });
  const restaurants = await response.json();
  return restaurants;
};

export const loginRequest = async (user) => {
  const response = await fetch(loginUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const credentials = await response.json();
  return credentials;
};

export const registerUser = async (user) => {
  const response = await fetch(registerUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  return newUser;
};
