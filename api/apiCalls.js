import { allRestaurantsUrl } from "./constants";

export const fetchAllRestaurants = async () => {
  const response = await fetch(allRestaurantsUrl, {
    method: "get",
    headers: new Headers({
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6IkJ1cmFrIFRvcMOndSIsImlkIjoiNiIsImV4cCI6MTYwNzMzNzk5MiwiaWF0IjoxNjA3MzM0MzkyLCJ1c2VybmFtZSI6ImVtYWlsQGVtYWlsLmNvbSJ9.fE5j8xGa9Qt13nYTBWaUOKne7oBWibAALO5BcQ1fGt689m5s5epW3-amnb5yonjTRUuqmvmJyFApoLMWo186wg",
    }),
  });
  const restaurants = await response.json();
  return restaurants;
};
