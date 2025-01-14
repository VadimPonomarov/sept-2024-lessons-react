import { useEffect } from "react";

import { Outlet, useParams } from "react-router-dom";

import { UsersPage } from "@/pages/UsersPage/UsersPage.tsx";

const UsersExtraLayout = () => {
  const { userId } = useParams();
  useEffect(() => {}, [userId]);
  return (
    <>
      {userId ? (
        <div className="flex h-screen w-screen">
          <div className="h-full w-1/2">
            <UsersPage />
          </div>
          <div className="align-center flex h-screen w-1/2 flex-col justify-center p-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <UsersPage />
      )}
    </>
  );
};

export default UsersExtraLayout;
