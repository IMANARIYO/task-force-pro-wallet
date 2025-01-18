import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
{ name: "Transactions", path: "/dashboard/transactions" },
    { name: "Reports", path: "/dashboard/reports" },
    { name: "Budget", path: "/dashboard/budget" },
    { name: "Account Management", path: "/account-management" },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250, backgroundColor: "#2D3748", color: "white", height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block w-full py-2 px-4 rounded ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={item.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)} style={{ margin: "10px" }}>
        Open Sidebar
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
