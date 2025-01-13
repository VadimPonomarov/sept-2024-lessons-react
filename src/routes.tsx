import { createBrowserRouter } from "react-router-dom";
import { UsersPage } from "@/pages/UsersPage/UsersPage.tsx";
import RootLayout from "@/layouts/RootLayout/RootLayout.tsx";
import { PostsPage } from "@/pages/PostsPage/PostsPage.tsx";
import UsersExtraLayout from "@/layouts/UsersExtraLayout/UsersExtraLayout.tsx";
import { UsersCartPage } from "@/pages/UsersCartPage/UsersCartPage.tsx";
import { CarsPage } from "@/pages/CarsPage/CarsPage.tsx";
import FormComponent from "@/components/CarForm/CarForm.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <UsersPage /> },
      {
        path: "users",
        element: <UsersExtraLayout />,
        children: [{ path: ":userId", element: <UsersCartPage /> }]
      },
      { path: "posts", element: <PostsPage /> },
      { path: "cars", element: <CarsPage /> },
      { path: "cars/:id", element: <FormComponent /> },
      { path: "*", element: <UsersPage /> }
    ]
  }
]);
