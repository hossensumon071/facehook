import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handlelogout = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button onClick={handlelogout} className="icon-btn">
      <img src={logout} alt="Logout" />
    </button>
  );
};

export default Logout;
