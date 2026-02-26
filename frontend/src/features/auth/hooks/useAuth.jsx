import { useContext } from "react";
import { AuthContext } from "../auth-context";
import api from "../../axios/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { User, setLoading, setUser, loading } = context;

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", data);
      toast.success(res.data.message);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", data);
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/profile");
      return res.data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/logout");
      return res.data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { User, loading, handleRegister, handleLogout, handleLogin, handleProfile, setUser };
};

export default useAuth;
