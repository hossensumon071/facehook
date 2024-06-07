import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import homeIcon from "../../assets/icons/home.svg";
import notification from "../../assets/icons/notification.svg";
import user from "../../assets/images/avatars/avatar_1.png";
import LogOut from "./LogOut";
import useAuth from "../../hook/useAuth";
import useProfile from "../../hook/useProfile";

const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  return (
    <nav className='sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4'>
      <div className='container flex flex-col items-center justify-between gap-6 sm:flex-row'>
        {/* <!-- Logo --> */}
        <Link to='/'>
          <img
            className='max-w-[100px] rounded-full lg:max-w-[130px]'
            src={logo}
          />
        </Link>
        {/* <!-- nav links  --> */}

        <div className='flex items-center space-x-4'>
          <Link to='/' className='btn-primary'>
            <img src={homeIcon} alt='Home' />
            Home
          </Link>
          <button className='icon-btn'>
            <img src={notification} alt='Notification' />
          </button>
          <LogOut />

          <Link to='/me' className='flex-center !ml-8 gap-3'>
            <span className='text-lg font-medium lg:text-xl'>
              {auth?.user?.firstName} {auth?.user?.lastName}
            </span>
            <div className='max-h-[32px] max-w-[32px] h-[44px] w-[44px] rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                alt=''
              />
            </div>
          </Link>
        </div>
        {/* <!-- nav links ends --> */}
      </div>
    </nav>
  );
};

export default Header;
