import { useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import useAxios from "../../hook/useAxios";
import useProfile from "../../hook/useProfile";
import checkIncon from "../../assets/icons/check.svg";
import { actions } from "../../actions";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMood, setEditMood] = useState(false);

  const handleBioEdit = async () => {
    dispatch({
      type: actions.profile.DATA_FATCHING,
    });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
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
    <div className='mt-4 flex items-start gap-2 lg:mt-6'>
      <div className='flex-1'>
        {!editMood ? (
          <p className='leading-[188%] text-gray-400 lg:text-lg'>{bio}</p>
        ) : (
          <textarea
            cols={60}
            onChange={(e) => setBio(e.target.value)}
            className='p-2  leading-[188%] text-gray-600 rounded-md lg:text-lg'
          >
            {bio}
          </textarea>
        )}
      </div>
      {/* <!-- Edit Bio button. The Above bio will be editable when clicking on the button --> */}
      {!editMood ? (
        <button
          onClick={() => setEditMood(true)}
          className='flex-center h-7 w-7 rounded-full'
        >
          <img src={editIcon} alt='Edit' />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className='flex-center h-7 w-7 rounded-full'
        >
          <img src={checkIncon} alt='check' />
        </button>
      )}
    </div>
  );
};

export default Bio;
