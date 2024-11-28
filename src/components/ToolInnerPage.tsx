"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/util/api';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import Button from '@/components/button';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import Sidebar from '@/components/Sidebar';;
import Header from '@/components/Header';

const Tool = () => {
    const [innerloading, setinnerloading] = useState(false)
    const pathname = usePathname();
    const segments = pathname.replace(/\/$/, '').split('/');
    const lastSegment = segments.pop();
    const [url, setUrl] = useState<string>(''); // Specify type as string
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [result, setResult] = useState(null); // Result state
    const [tools, setTools] = useState();
    const [currentTool, setCurrentTool] = useState([]);
    const [showresult, setshowresult] = useState(false)
    const [keywords, setkeywords] = useState()
    const [MetaTitle, setMetaTitle] = useState()
    const [description, setdescription] = useState()
    const [depth, setdepth] = useState()
    const [pageno, setpageno] = useState()
    const [tools_body, settools_body] = useState()
    const [useragent, setuseragent] = useState()
    const [allowpath, setallowpath] = useState()
    const [disallowpath, setdisallowpath] = useState()
    const [crawlDelay, setcrawlDelay] = useState()
    const [sitemapUrl, setsitemapUrl] = useState()
    const [displayedRows, setDisplayedRows] = useState([]);
    const [activeItem, setActiveItem] = useState('W3era Tools');
    // Function to fetch tools from the API
    const fetchTools = async () => {
        try {
            const response = await axios.get(`${BASE_URL}tools/`);
            setTools(response.data);
        } catch (error: any) {
            console.log("tools error", error.message);
        }
        try {
            const response = await axios.get(`${BASE_URL}tools/${lastSegment}`);
            settools_body(response.data);
        } catch (error: any) {
            console.log("tool body error", error.message);
        }
    };

    const displayRowsOneByOne = (rows: any[]) => {
        let i = 0;

        const appendRow = () => {
            if (i < rows.length) {
                setDisplayedRows((prevRows) => [...prevRows, rows[i]]);
                i++;

                // Generate a random delay between 5 and 20 seconds
                const randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;

                setTimeout(appendRow, randomDelay); // Schedule the next row with random delay
            }
        };
        appendRow(); // Start the recursive process
    };

    // Call this function after `setResult` is updated
    useEffect(() => {
        if (result?.length > 0) {
            setDisplayedRows([]); // Reset displayed rows
            displayRowsOneByOne(result);
        }
    }, [result]);




    const checkBacklink = () => {
        if (!url) return; // Ensure the URL is valid before proceeding

        const formattedDomain = url.replace(/https?:\/\/|www\./g, ""); // Remove protocol and 'www.'
        setshowresult(true); // Show the result section

        setLoading(true); // Set loading to true
        setError(null);        // Use setTimeout to delay the result display
        setTimeout(() => {
            setLoading(false); // Stop loading after 3 seconds
            // Show the result section
            const formattedResults = Sites?.sites.map((site: any, index: number) => ({
                id: index + 1, // Incremental ID
                Page: site.replace("{domain}", formattedDomain), // Replace `{domain}` in URLs
                Status: "Success", // Example status
            }));
            setResult(formattedResults || []); // Update the state with the formatted results
        }, 1500); // 3 seconds delay
    };

    useEffect(() => {
        fetchTools();
    }, []);
    useEffect(() => {
        setCurrentTool(
            tools?.filter((elem: any) => elem?.slug_link === lastSegment)
        );
    }, [tools, lastSegment]);
    const fetchResult = async () => {
        setshowresult(true)
        setLoading(true); // Set loading to true
        setError(null); // Reset error state

        try {
            const response = await axios.post(`${BASE_URL}tools/${lastSegment}`, {
                url, keywords, MetaTitle, description, pageno, depth, useragent, disallowpath, allowpath, sitemapUrl, crawlDelay
            }); // Send URL in payload
            setResult(response.data); // Save result in state
            setinnerloading(true)
            console.log(response);
        } catch (error: any) {
            setError(error.message); // Set error message
            console.log("Service error", error.message);
        }
        finally {
            setLoading(false); // Set loading to false
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        // Prevent default form submission
        fetchResult(); // Call fetch on submit
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    const handleKeyword = (e: any) => {
        setkeywords(e.target.value)
    }
    const handleuseragent = (e: any) => {
        setuseragent(e.target.value)
    }
    const handleMetatitle = (e: any) => {
        setMetaTitle(e.target.value)
    }
    const handleDescription = (e: any) => {
        setdescription(e.target.value)
    }
    const handleDepth = (e: any) => {
        setdepth(e.target.value)
    }
    const handlePageno = (e: any) => {
        setpageno(e.target.value)
    }
    const handleDisallowpaths = (e: any) => {
        setdisallowpath(e.target.value)
    }
    const handleallowpaths = (e: any) => {
        setallowpath(e.target.value)
    }
    const handleCrawldelay = (e: any) => {
        setcrawlDelay(e.target.value)
    }
    const handleSitemapurl = (e: any) => {
        setsitemapUrl(e.target.value)
    }
    const handleClear = () => {
        setUrl('');
        setkeywords('');
        setMetaTitle('');
        setdescription('');
        setdepth('');
        setpageno('');
        disallowpath('');
        crawlDelay('');
        setsitemapUrl('');
        setResult(null);
        setshowresult(false);
    };
    return (
        <>
            {
                tools && currentTool &&
                <div className="flex h-auto bg-grey">
                <Sidebar setActiveItem={setActiveItem} activeItem={activeItem} />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header activeItem={activeItem} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
                    <div>

<div className='w-full'>
    <div className='w-full bg-no-repeat bg-center min-h-[40vh] bg-[url("/images/tool-bg.png")] py-9 flex flex-col justify-center items-center'>
        <h1 className='text-[32px] lg:text-[44px] font-bold text-white'>{currentTool[0]?.title || 'This is'}</h1>
    </div>
</div>
<div className='mt-4 w-full px-4 xl:px-0 xl:w-[95%]  2xl:w-[75%] mx-auto'>
    <div className='flex  gap-3'>

        <div className='w-fit'>
            <Link href={'/tool'}>
                <button className='bg-lightpink text-pink mb-7 p-2 px-4 text-[18px] font-medium flex justify-center gap-3 rounded-lg items-center'>
                    <IoReturnUpBackOutline className='text-[24px]' /> Back
                </button>
            </Link>
        </div>
        <button onClick={handleClear} className=' h-fit px-7 py-[9px] rounded-md bg-lightpink text-pink font-medium  hover:bg-pink hover:text-white duration-200'>Clear</button>
    </div>
    <div className='rounded-xl p-7 shadow-xl border-slate-100 border-[1px]'>
        <div className='bg-grey px-4 py-2 rounded-lg w-full flex items-center gap-3'>
            <div className='w-[93px] h-[93px] bg-white rounded-full flex justify-center items-center'>
                <Image src={currentTool?.[0]?.image || ''} height={53} width={53} alt={currentTool?.[0]?.image_alt} />
            </div>
            <div>
                <p className='text-homeblack font-semibold text-[18px] md:text-[20px]'>{currentTool?.[0]?.title}</p>
            </div>
        </div>
 
    </div>
</div>


</div>
                    </main>
                </div>
            </div>


            }
        </>
    );
}

export default Tool;
