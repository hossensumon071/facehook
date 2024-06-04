import React from 'react'
import useAuth from '../hooks/useAuth'

const HomePage = () => {
  const {auth} = useAuth()
  console.log(auth)
  return (
    <div>
      <h1>Homepage</h1>
    </div>
  )
}

export default HomePage