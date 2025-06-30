import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-red-50">
      <FaBan className="text-red-600 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-red-700 mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link to="/" className="btn btn-error text-white">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
