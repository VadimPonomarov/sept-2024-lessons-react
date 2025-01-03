import { createBrowserRouter } from "react-router-dom";
import { UsersPage } from "@/pages/UsersPage.tsx";
import RootLayout from "@/layouts/RootLayout.tsx";
import { PostsPage } from "@/pages/PostsPage.tsx";
import UsersExtraLayout from "@/layouts/UsersExtraLayout.tsx";
import { UsersCartPage } from "@/pages/UsersCartPage.tsx";

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
      { path: "*", element: <UsersPage /> },
    ],
  },
]);
