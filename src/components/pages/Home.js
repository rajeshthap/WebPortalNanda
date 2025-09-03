import React from 'react';
import UserLogin from './UserLogin';
import HomePage from "../pages/HomePage";

// import AdminBanner from './AdminBanner';

function Home() {
  return (
    <div className="container-fluid">
<UserLogin />
<HomePage />
    </div>
  )
}

export default Home