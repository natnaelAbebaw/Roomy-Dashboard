import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    hotelAccount,
    setHotelAccount,
    token,
    setToken,
    setHotel,
    hotel,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  if (isAuthenticated && (!hotelAccount || !token)) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const { token: accessToken, hotelAccount, hotel } = JSON.parse(token);
      setToken(accessToken);
      setHotelAccount(hotelAccount);
      setHotel(hotel);
    }
  }

  if (!hotelAccount || !token || !hotel) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
