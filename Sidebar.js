import React, { useState } from 'react';
import './Sidebar.css'
import XIcon from '@mui/icons-material/X';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreIcon from '@mui/icons-material/More';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import {Avatar} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import CustomeLink from './CustomeLink';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useNavigate } from "react-router-dom";


const Sidebar = ({handleLogout, user}) => {
  const [anchorEl, setAnchorEl] =useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser] = useLoggedInUser();
  const navigate = useNavigate();

  // const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";


  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const result = user[0]?.email?.split('@')[0];
  return (
    <div className='sidebar'>
     <XIcon className='sidebar-twitterIcon'/>
     <CustomeLink to='/home/feed'>
     <SidebarOptions active Icon={HomeIcon} text='Home' />
     </CustomeLink>
    <CustomeLink to='/home/explore'>     
    <SidebarOptions  Icon={SearchIcon} text='Explore' />
    </CustomeLink>
    <CustomeLink to='/home/notifications'>
     <SidebarOptions  Icon={NotificationsIcon} text='Notifications' />
     </CustomeLink>
     <CustomeLink to='/home/messages'>
     <SidebarOptions  Icon={MailIcon} text='Message' />
     </CustomeLink>
     <CustomeLink to='/home/bookmarks'>
     <SidebarOptions  Icon={BookmarkBorderIcon} text='Bookmarks' />
     </CustomeLink>
     <CustomeLink to='/home/lists'>
     <SidebarOptions  Icon={FormatListBulletedIcon} text='Lists' />
     </CustomeLink>
     <CustomeLink to='/home/profile'>
     <SidebarOptions  Icon={PermIdentityIcon} text='Profile' />
     </CustomeLink>
     <CustomeLink to='/home/more'>
     <SidebarOptions  Icon={MoreIcon} text='More' />
     </CustomeLink>

     <Button variant='outlined' className='sidebar_tweet' fullWidth>Tweet</Button>
     <div className="Profile_info1">
        <Avatar  src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}/>
        <div className="user_info">
            <h4>
              {  
            //  loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName
            loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName

               }
      </h4>
            <h5>@{result}</h5>
        </div>
        <IconButton
        size='small'
        sx={{ml:2}}
        aria-controls={openMenu ? "basic_menu":undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" :undefined}
        onClick={handleClick} >
          <MoreHorizIcon/>
        </IconButton>
        <Menu 
        id='basic_menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClick={handleClose}
        onClose={handleClose}
        >
          <MenuItem className='Profile_info1' onClick={() => navigate('/home/profile')}>
          <Avatar  src={loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}/>
          <div className="user_info subUser_info">
            <div>
          <h4>
              {  
            //  loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName
            loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName
               }
      </h4>
            <h5>@{result}</h5>
        </div>
        <ListItemIcon className='done_icon' color="blue">
         <DoneIcon/>
        </ListItemIcon>
        </div>
          </MenuItem>
          <Divider/>
          <MenuItem onClick={handleClose}>Add an existing Account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout user @{result}</MenuItem>
        </Menu>
     </div>
    </div>
    
  );
}

export default Sidebar;
