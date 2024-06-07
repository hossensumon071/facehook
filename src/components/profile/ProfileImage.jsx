import useProfile from "../../hook/useProfile";
import editIncon from "../../assets/icons/edit.svg";
import useAxios from "../../hook/useAxios";
import { useRef } from "react";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const fileUploadRef = useRef();

  const handleImageUploaded = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    const formData = new FormData();

    for (const file of fileUploadRef.current.files) {
      formData.append("avatar", file);
    }
    try {
      // dispatch({ type: actions.profile.DATA_FATCHING });
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className='relative mb-8 border border-white rounded-full lg:mb-11 h-[218px] w-[218px] overflow-hidden'>
      <img
        className='w-full h-full object-cover'
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />

      <form>
        <button
          onClick={handleImageUploaded}
          className='flex-center absolute z-10 bottom-8 right-8 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80'
        >
          <img src={editIncon} alt='Edit' />
        </button>
        <input id='file' type='file' hidden ref={fileUploadRef} />
      </form>
    </div>
  );
};

export default ProfileImage;
