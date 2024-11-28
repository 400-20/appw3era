"use client";

import React, { useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import { BASE_URL } from '@/util/api';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ToolDisplay from '@/components/ToolDisplay';
import { useAppContext } from '@/context/AppContext';

const Dashboard: React.FC = () => {
  const { tools, setTools, activeItem, activeTool } = useAppContext();

  const fetchTools = async () => {
    try {
      const response = await axios.get(`${BASE_URL}tools/`);
      setTools(response.data);
    } catch (error) {
      console.error("Service error", error);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div className="flex h-auto bg-grey">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header activeItem={activeItem} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          {activeTool ? (
            <ToolDisplay tool={activeTool} />
          ) : (
            <div className='w-full'>
              <div className='w-full bg-no-repeat bg-center min-h-[40vh] bg-[url("/images/tool-bg.png")] py-9 flex flex-col justify-center items-center'>
                <h1 className='text-[32px] lg:text-[44px] font-bold text-white'>Free SEO Tools</h1>
                <div className='rounded-full w-[90%] md:w-[80%] lg:w-1/3 flex justify-between items-center p-3 px-6 mt-4 dark:bg-white bg-white'>
                  <input
                    type="text"
                    className='text-textGrey w-full border-none outline-none text-[18px]'
                    placeholder='Check Seo Tool'
                  />
                  <IoIosSearch className='text-textGrey text-[32px]' />
                </div>
              </div>
              <div className='bg-white xl:w-[77%] mx-auto px-4 w-full py-10'>
                <p className="text-2xl font-bold mb-4">Select a tool from the sidebar to get started</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

