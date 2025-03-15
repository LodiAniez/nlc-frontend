import { Link } from "react-router-dom";
import { Routes } from "@constants/pages";

type Props = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full bg-gray-800 text-white p-4 flex justify-between">
        <h1>Protected Layout</h1>
        <div className="flex space-x-4">
          <Link to={Routes.PROJECTS} className="hover:underline">
            Projects
          </Link>
          <Link to={Routes.SERVICE_ORDERS} className="hover:underline">
            Service Orders
          </Link>
        </div>
      </nav>
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
