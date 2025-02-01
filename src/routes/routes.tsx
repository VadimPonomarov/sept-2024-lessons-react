import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";
import AuthPage from "@/pages/AuthPage/AuthPage.tsx";
import { RecipesPage } from "@/pages/RecipesPage/RecipesPage.tsx";
import { UsersPage } from "@/pages/UsersPage/UsersPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";
import ShouldAuth from "@/common/HOC/ShouldAuth/ShouldAuth.tsx";
import UserDetailsPage from "@/pages/UserDetailsPage/UserDetailsPage.tsx";
import RecipeDetailsPage from "@/pages/RecipeDetailsPage/RecipeDetailsPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      {
        path: "recipes",
        element: (
          <ShouldAuth>
            <RecipesPage />
          </ShouldAuth>
        ),
      },
      {
        path: "recipes/:id",
        element: (
          <ShouldAuth>
            <RecipeDetailsPage />
          </ShouldAuth>
        ),
      },
      {
        path: "users",
        element: (
          <ShouldAuth>
            <UsersPage />
          </ShouldAuth>
        ),
      },
      {
        path: "users/:id",
        element: (
          <ShouldAuth>
            <UserDetailsPage />
          </ShouldAuth>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
