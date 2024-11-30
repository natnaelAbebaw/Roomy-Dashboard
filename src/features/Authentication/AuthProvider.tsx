import { createContext, useContext, useState } from "react";
import { HotelAccount } from "../../services/AuthApi";
import { useLogin } from "./useLogin";
import { Outlet, useNavigate } from "react-router-dom";
import { Hotel } from "../../services/hotelApi";

const AuthContext = createContext<{
  hotelAccount: HotelAccount | null;

  login: (credentials: { email: string; password: string }) => void;
  token: string | null;
  isLoginLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setHotelAccount: (hotelAccount: HotelAccount | null) => void;
  hotel: Hotel | null;
  setHotel: (hotel: Hotel | null) => void;
  darkMode: boolean;
  toogleDarkMode: (darkMode: boolean) => void;
  logout: () => void;
}>({
  hotelAccount: null,
  login: () => {},
  token: null,
  isLoginLoading: false,
  isAuthenticated: false,
  setToken: () => {},
  setHotelAccount: () => {},
  hotel: null,
  setHotel: () => {},
  darkMode: false,
  toogleDarkMode: () => {},
  logout: () => {},
});

function AuthProvider() {
  const [hotelAccount, setHotelAccount] = useState<HotelAccount | null>(null);

  const [hotel, setHotel] = useState<Hotel | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(false);

  const navigate = useNavigate();

  const { Login, isLoginLoading } = useLogin();

  async function login(credentials: { email: string; password: string }) {
    Login(credentials, {
      onSuccess: (data) => {
        setHotelAccount(data.hotelAccount);
        setToken(data.token);
        setHotel(data.hotel);
        localStorage.setItem(
          "accessToken",
          JSON.stringify({
            token: data.token,
            hotelAccount: data.hotelAccount,
            hotel: data.hotel,
          })
        );
        navigate("/dashboard");
      },
    });
  }

  function logout() {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  function toogleDarkMode() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark-mode");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        hotelAccount,
        login,
        isLoginLoading,
        setToken,
        setHotelAccount,
        isAuthenticated: localStorage.getItem("accessToken") !== null,
        hotel,
        setHotel,
        darkMode,
        toogleDarkMode,
        logout,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
