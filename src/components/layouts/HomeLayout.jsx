import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useChatContext } from '../../hooks/useChatContext';
import { getProfileByJwt, logOut, updateUserListStatus, updateUserStatus } from '../../redux/Auth/action';
import Navigation from './Navigation/Navigation';
import RightPart from './RightPart';
import Notification from '../Notification/Notification';
import { useWebSocket } from '../../hooks/useWebsocket';
import { useNotificationContext } from '../../hooks/useNotificationContext';
import Header from './Header';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer } from '@mui/material';

const HomeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isNotify, setIsNotify] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  const { sendNewMessage } = useChatContext();
  const { addNewNotification } = useNotificationContext();
  const auth = useSelector((store) => store.auth);

  const isCollapsed = useMemo(
    () => ['/messages', '/friend'].some((path) => location.pathname.startsWith(path)),
    [location.pathname]
  );

  const handleNotify = (status) => setIsNotify(status);
  const handleCloseNotify = () => setIsNotify(false);
  const toggleMobileNav = () => setShowMobileNav((prev) => !prev);

  const { disconnect } = useWebSocket();
  const { resetChat } = useChatContext();

  const channels = useMemo(
    () => [
      {
        channel: `/user/${auth?.user?.id}/queue/messages`,
        callback: (msg) => sendNewMessage(JSON.parse(msg.body)),
      },
      {
        channel: `/user/${auth?.user?.id}/queue/status`,
        callback: (req) => dispatch(updateUserStatus(JSON.parse(req.body))),
      },
      {
        channel: `/user/${auth?.user?.id}/queue/notification/`,
        callback: (noti) => addNewNotification(JSON.parse(noti.body)),
      },
      {
        channel: `/user/${auth?.user?.id}/queue/onlineUsers`,
        callback: (listUser) => dispatch(updateUserListStatus(JSON.parse(listUser.body))),
      },
    ],
    [auth?.user?.id, dispatch, sendNewMessage, addNewNotification]
  );

  useWebSocket({
    user: auth?.user,
    channels,
  });

  const handleLogout = () => {
    disconnect(auth?.user);
    dispatch(logOut());
    resetChat();
    navigate('/signin');
  };

  useEffect(() => {
    if (auth?.jwt) dispatch(getProfileByJwt());
  }, [auth?.jwt, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed */}
      <Header user={auth.user} handleLogout={handleLogout} />

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <IconButton
          onClick={toggleMobileNav}
          className="bg-blue-500 text-white shadow-lg hover:bg-blue-600"
          size="large"
          sx={{
            backgroundColor: '#3B82F6',
            color: 'white',
            '&:hover': { backgroundColor: '#2563EB' }
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Main Container */}
      <div className="pt-4">
        <div className={`${isCollapsed ? 'max-w-full' : 'max-w-[1400px]'} mx-auto px-4`}>
          <div className="flex gap-4 py-4">
            
            {/* Left Sidebar - Navigation */}
            <div className={`hidden md:flex ${isCollapsed ? 'w-20' : 'w-64'} flex-shrink-0`}>
              <div className="sticky top-20 w-full">
                <Navigation
                  isCollapsed={isCollapsed}
                  isNotify={isNotify}
                  handleNotify={handleNotify}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>

            {/* Right Sidebar */}
            {!isCollapsed && (
              <div className="hidden lg:flex w-80 flex-shrink-0">
                <div className="sticky top-20 w-full">
                  <RightPart />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={showMobileNav}
        onClose={() => setShowMobileNav(false)}
        PaperProps={{
          sx: { width: 280, pt: 10 }
        }}
      >
        <Navigation
          isCollapsed={false}
          isNotify={isNotify}
          handleNotify={handleNotify}
          onTabClick={() => setShowMobileNav(false)}
        />
      </Drawer>

      {/* Notification Drawer */}
      <Drawer
        anchor="right"
        open={isNotify}
        onClose={handleCloseNotify}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, pt: 10 }
        }}
      >
        <Notification />
      </Drawer>
    </div>
  );
};

export default HomeLayout;