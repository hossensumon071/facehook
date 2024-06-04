import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {
  const [user, setuser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true)
    const fetchProfile = async () => {
      try{
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)
        setuser(response?.data?.user)
        setPosts(response?.data?.posts)
      }catch(err) {
        console.error(err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if(loading) {
    return <div>fetching Your Profile Data....</div>
  }

  return <div>
    <h2>Welcome, {user?.firstName} {user?.lastName}</h2>
    <p>you Have {posts.length} posts</p>
  </div>;
};

export default ProfilePage;
