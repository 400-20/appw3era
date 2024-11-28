import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

interface Tool {
  id: number;
  title: string;
  slug_link: string;
  image: string;
  image_alt: string;
}

interface ToolDisplayProps {
  tool: Tool;
}

const ToolDisplay: React.FC<ToolDisplayProps> = ({ tool }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tool submission logic here
    console.log(`Submitting ${tool.title} with URL: ${url}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-lightblue rounded-full flex items-center justify-center mr-4">
          <Image src={tool.image} width={40} height={40} alt={tool.image_alt} />
        </div>
        <h2 className="text-2xl font-bold">{tool.title}</h2>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Analyze <FaArrowRightLong className="inline ml-2" />
        </button>
      </form>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Tool Description</h3>
        <p>
          This is where you would put a description of {tool.title} and how to
          use it.
        </p>
      </div>
    </div>
  );
};

export default ToolDisplay;
