import React, { useEffect, useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BsPerson, BsMoon } from "react-icons/bs";
import { MdBusinessCenter } from "react-icons/md";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiOutlineProfile } from "react-icons/ai";
import { MdPayment } from "react-icons/md";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBarMenu.css";
import AuthService from "../../services/auth/auth.service";

const SideBarMenuBusiness = () => {
  const [locationHref, setLocationHref] = useState("");

  useEffect(() => {
    setLocationHref(window.location.pathname);
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
                className={
                  locationHref === "/business-dashboard" ? "active" : ""
                }
                icon={<AiOutlinePieChart />}
              >
                <a href="/business-dashboard">Dashboard</a>
              </MenuItem>
              <MenuItem
                className={locationHref === "/home" ? "active" : ""}
                icon={<AiOutlineProfile />}
              >
                <a href="/business-profile">Business profile</a>
              </MenuItem>

              <MenuItem
                className={locationHref === "/home" ? "active" : ""}
                icon={<FiHome />}
              >
                <a href="/home">Home</a>
              </MenuItem>
              <MenuItem icon={<BsMoon />}>Dark mode</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                icon={<FiLogOut />}
                onClick={() => AuthService.logout()}
              >
                <a href="/">Logout</a>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarMenuBusiness;
