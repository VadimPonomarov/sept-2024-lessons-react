import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

const NotFoundPage: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
        <Link to="/">
          <Button className="mt-6">Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
