import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

type UserType = {
  id: string;
  email: string;
};

const ProtectedRoutes = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: UserType = JSON.parse(storedUser);
        if (parsedUser && parsedUser.email) {
          setUser(parsedUser);
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Invalid user JSON in localStorage",
          icon: "error",
          draggable: false,
        });
        console.error("Invalid user JSON in localStorage");
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null; // or a loading spinner

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
