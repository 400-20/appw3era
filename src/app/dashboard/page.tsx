"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';;
import Header from '@/components/Header';
import MainContent from '@/components/MainContent';
import Tool from '../tool/page';


const Dashboard: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');
    
    

    return (
        <div className="flex h-auto bg-grey">
            <Sidebar setActiveItem={setActiveItem} activeItem={activeItem} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header activeItem={activeItem} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
                    {activeItem.name === 'W3era Tools' && <Tool />}
                    <MainContent activeItem={activeItem} />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

