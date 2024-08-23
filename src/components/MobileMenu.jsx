import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Features",
    url: "#features",
  },
  {
    title: "Workflow",
    url: "#working",
  },
];

const MobileMenu = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="block md:hidden">
      {!navOpen ? (
        <button onClick={() => setNavOpen(true)}>
          <Menu size={32} />
        </button>
      ) : (
        <>
          <button onClick={() => setNavOpen(false)}>
            <X size={32} />
          </button>
          <div className="absolute top-20 left-0 w-full bg-white/60 backdrop-blur-lg border-b border-t z-50 max-h-screen overflow-y-auto">
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="block text-gray-600 p-4"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
