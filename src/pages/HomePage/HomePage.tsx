import { useEffect } from "react";
import SimpleAlert from "@/components/All/Alerts/SimpleAlert.tsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/common/hooks/store/useApp.ts";

const HomePage = () => {
  const { authMe } = useAppSelector(state => state.ini);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (authMe) {
    return <Navigate to="/users" />;
  }

  return (
    <div>
      <SimpleAlert>
        <div className="text-2xl">
          Hi Bud!! <br />
          You're still not authenticated.
          <br />
          Please login. <br />
          <Link className="text-blue-500 hover:text-blue-700 underline" to="/auth">
            Here is your link ...
          </Link>
          <br />
        </div>
      </SimpleAlert>
    </div>
  );
};

export default HomePage;
