import { createBrowserRouter } from "react-router-dom";

import FormComponent from "@/components/Forms/CarForm/CarForm.tsx";
import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";
import UsersExtraLayout from "@/layouts/UsersExtraLayout/UsersExtraLayout.tsx";
import AuthPage from "@/pages/AuthPage/AuthPage.tsx";
import { CarsPage } from "@/pages/CarsPage/CarsPage.tsx";
import { PostsPage } from "@/pages/PostsPage/PostsPage.tsx";
import { UsersCartPage } from "@/pages/UsersCartPage/UsersCartPage.tsx";
import { UsersPage } from "@/pages/UsersPage/UsersPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      {
        path: "users",
        element: <UsersExtraLayout />,
        children: [{ path: ":userId", element: <UsersCartPage /> }],
      },
      { path: "posts", element: <PostsPage /> },
      { path: "cars", element: <CarsPage /> },
      { path: "cars/:id", element: <FormComponent /> },
      { path: "auth", element: <AuthPage /> },
      { path: "*", element: <UsersPage /> },
    ],
  },
]);
