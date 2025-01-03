import { UsersPage } from "@/pages/UsersPage.tsx";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";

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
