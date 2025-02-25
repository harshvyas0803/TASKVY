"use client";


import React from 'react';

 
import { Provider } from 'react-redux';
import store from "../store/Store";  

const Page = () => {
  return (
    <Provider store={store}>
      <div className="flex">
       
      </div>
    </Provider>
  );
};

export default Page;
