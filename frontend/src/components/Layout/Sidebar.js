import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmenuItem from "./SubmenuItem"; // Assuming SubmenuItem is in the same directory

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
      <div className="menu_content">
        <ul className="menu_items">
          <div className="menu_title menu_dashboard"></div>

          {/* Main menu item with submenu */}
          <li className="item">
            <SubmenuItem
              title="Users"
              iconClass="bx bxs-user"
              link="/layout/users"
              icon="fa-solid fa-users-gear"
              sublinks={[
                "Nav Sub Link 1",
                "Nav Sub Link 2",
                "Nav Sub Link 3",
                "Nav Sub Link 4",
              ]}
            />
            <SubmenuItem
              title="Departments"
              iconClass="bx bxs-user"
              icon="fa-solid fa-outdent"
              link="/layout/departments"
              sublinks={[
                "Nav Sub Link 1",
                "Nav Sub Link 2",
                "Nav Sub Link 3",
                "Nav Sub Link 4",
              ]}
            />
            <SubmenuItem
              title="Doctors"
              iconClass="bx bxs-user"
              icon="fa-solid fa-user-doctor" 
              link="/layout/doctors"
              sublinks={[
                "Nav Sub Link 1",
                "Nav Sub Link 2",
                "Nav Sub Link 3",
                "Nav Sub Link 4",
              ]}
            />
          </li>
          {/* <li>
            <a href="/users">users</a>
          </li> */}
          {/* Add more SubmenuItem components for other menu items */}
        </ul>

        {/* Add other sidebar content here */}
        <div className="bottom_content" onClick={toggleSidebar}>
          <div className="bottom expand_sidebar">
            <span> Expand</span>
            <i className="bx bx-log-in"></i>
          </div>
          <div className="bottom collapse_sidebar" onClick={toggleSidebar}>
            <span> Collapse</span>
            <i className="bx bx-log-out"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
