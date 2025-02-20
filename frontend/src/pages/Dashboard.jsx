import React from 'react';
import Navbar from '@/components/navbar/Navbar';

const Dashboard = () => {
  return (
    <div className='md:ml-1 bg-slate-500 dark:bg-slate-900 w-screen'>
      <Navbar />
      {/* Dashboard content here */}
    </div>
  );
};

export default Dashboard;
