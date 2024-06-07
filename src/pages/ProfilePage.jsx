import { useEffect } from "react";
import useAxios from "../hook/useAxios";
import useProfile from "../hook/useProfile";
import { actions } from "../actions";
import useAuth from "../hook/useAuth";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FATCHING });
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FATCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>fetching your profile data...</div>;
  }

  return (
    <div>
      <main className='mx-auto max-w-[1020px] py-8'>
        <div className='container'>
          <ProfileInfo />

          <h4 className='mt-6 text-xl lg:mt-8 lg:text-2xl'>Your Posts</h4>
          <MyPosts />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
