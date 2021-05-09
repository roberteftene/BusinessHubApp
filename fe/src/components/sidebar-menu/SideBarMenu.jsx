import React, { useEffect, useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BsPerson, BsMoon } from "react-icons/bs";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBarMenu.css";

const SideBarMenu = () => {
  const [locationHref, setLocationHref] = useState("");

  useEffect(() => {
    setLocationHref(window.location.href.slice(22));
  }, []);

  return (
    <>
      <div id="header">
        <ProSidebar>
          <SidebarHeader>
            <div className="logotext">
              <p>HubExp</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                className={locationHref === "home" ? "active" : ""}
                icon={<FiHome />}
              >
                Home
              </MenuItem>
              <MenuItem
                className={locationHref === "communityTop" ? "active" : ""}
                icon={<FaRegHeart />}
              >
                Community Top
              </MenuItem>
              <MenuItem icon={<BsPerson />}>Profile</MenuItem>
              <MenuItem icon={<BsMoon />}>Dark mode</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarMenu;
