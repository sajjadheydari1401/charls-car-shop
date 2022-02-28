import React from 'react'
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const user = useSelector((state) => state.userSlice?.user);

  return (
    <div>Hello {user.name}</div>
  )
}

export default DashboardPage