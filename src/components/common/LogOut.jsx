import { useNavigate } from "react-router-dom";
import logout_icon from "../../assets/icons/logout.svg";
import useAuth from "../../hook/useAuth";
const LogOut = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <button className='icon-btn' onClick={handleLogout}>
      <img src={logout_icon} alt='Logout' />
    </button>
  );
};

export default LogOut;
