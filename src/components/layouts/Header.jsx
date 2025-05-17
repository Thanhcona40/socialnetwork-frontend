// components/Header.jsx
import { Avatar, IconButton, InputBase, Menu, MenuItem, Paper , Fade} from '@mui/material';
import { Chat, Notifications, ExitToApp, Person , Search} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logoSocial from '../../image/logoSocial.png';
import { useEffect, useRef, useState } from 'react';

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const avatarRef = useRef(null);
  const open = Boolean(anchorEl);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate(`/profile/${user?.id}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo bên trái */}
        <div className="flex items-center space-x-5">
          <img 
            src={logoSocial}
            alt="Logo" 
            className="h-10 cursor-pointer"
            onClick={() => {
              if (window.location.pathname === '/') {
                window.location.reload();
              } else {
                navigate('/');
              }
            }}
          />
          {/* Thanh tìm kiếm giữa */}
            <Paper
            component="form"
            className="flex items-center  px-4 py-1 bg-gray-100 rounded-full space-x-3"
            >
              <Search className="text-gray-500" />
            <InputBase
                placeholder="Search..."
                className="flex-1"
            />
            </Paper>
        </div>


        {/* Action buttons bên phải */}
        <div className="flex items-center space-x-4">
          <IconButton onClick={() => navigate('/messages')}>
            <Chat className="text-gray-600" />
          </IconButton>
          
          <IconButton onClick={() => navigate('/notifications')}>
            <Notifications className="text-gray-600" />
          </IconButton>
          
          <div className="relative" ref={avatarRef}>
            <Avatar
              src={user?.image} 
              className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={handleMenuOpen}
            />
            
            {/* Dropdown Menu sử dụng Material-UI */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 3,
                className: 'mt-1 min-w-[200px] py-1 rounded-lg',
              }}
            >
              <MenuItem onClick={handleProfile} className="flex items-center gap-3">
                <Person fontSize="small" />
                <span>Profile</span>
              </MenuItem>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <MenuItem onClick={handleLogout} className="flex items-center gap-3 text-red-500">
                <ExitToApp fontSize="small" />
                <span>Logout</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
        </div>
    </header>
  );
};

export default Header;