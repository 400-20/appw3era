"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "@/util/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";

const Sidebar: React.FC = () => {
  const { tools, activeItem, setActiveItem, setActiveTool } = useAppContext();
  const [expandedItems, setExpandedItems] = useState<string[]>(["W3era Tools"]);
  const router = useRouter();

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleLogout = async () => {
    const token = Cookies.get("login_access_token_appw3");
    const refresh_token = Cookies.get("login_refresh_token_appw3");

    try {
      await axios.post(
        `${BASE_URL}logout/`,
        { refresh_token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("login_access_token_appw3");
      Cookies.remove("login_refresh_token_appw3");

      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };

      toast.success("Logged out successfully");
      router.push("/signin");
    } catch (error) {
      console.error("An error occurred during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <motion.div className="w-64 bg-purple text-white p-4 min-h-screen h-auto flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8">Seo Tools</h1>
        <nav>
          <div className="mb-4">
            <motion.button
              onClick={() => toggleExpand("W3era Tools")}
              className={`flex items-center justify-between w-full text-left py-2 px-4 rounded hover:bg-lightpink hover:text-homeblack transition-colors ${
                activeItem === "W3era Tools" ? "bg-lightpink text-black" : ""
              }`}
            >
              <span>W3era Tools</span>
              <FiChevronRight
                className={`transform transition-transform ${
                  expandedItems.includes("W3era Tools") ? "rotate-90" : ""
                }`}
              />
            </motion.button>
            {expandedItems.includes("W3era Tools") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-4 mt- 2"
              >
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveItem(tool.title);
                      setActiveTool(tool);
                      router.push(`/tool/${tool.slug_link}`);
                    }}
                    className={`block w-full text-left py-2 px-4 rounded hover:bg-lightpink mb-1 hover:text-homeblack transition-colors ${
                      activeItem === tool.title ? "bg-lightpink text-black" : ""
                    }`}
                  >
                    {tool.title}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-between text-left py-2 px-4 rounded hover:bg-lightpink text-white hover:text-homeblack transition-colors"
      >
        Logout <FiLogOut />
      </button>
    </motion.div>
  );
};  

export default Sidebar;
