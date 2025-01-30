import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";
import AuthPage from "@/pages/AuthPage/AuthPage.tsx";
import { PostsPage } from "@/pages/PostsPage/PostsPage.tsx";
import { UsersPage } from "@/pages/UsersPage/UsersPage.tsx";
import HomePage from "@/pages/HomePage/HomePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts", element: <PostsPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
