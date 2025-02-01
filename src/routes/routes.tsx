import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";
import AuthPage from "@/pages/AuthPage/AuthPage.tsx";
import { RecipePage } from "@/pages/RecipePage/RecipePage.tsx";
import { UsersPage } from "@/pages/UsersPage/UsersPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";
import WithPagination from "@/common/HOC/WithPagination.tsx";
import ShouldAuth from "@/common/HOC/ShouldAuth.tsx";

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
            <WithPagination>
              <RecipePage />
            </WithPagination>
          </ShouldAuth>
        ),
      },
      {
        path: "users",
        element: (
          <ShouldAuth>
            <WithPagination>
              <UsersPage />
            </WithPagination>
          </ShouldAuth>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
