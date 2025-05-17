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

const HomeLayout = () => {
  const location = useLocation();
  const [isNotify, setIsNotify] = useState(false);
  const { sendNewMessage } = useChatContext();
  const { addNewNotification } = useNotificationContext();
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    setShowMobileNav(true);
  };

  const handleCloseMobileNav = (e) => {
    e.stopPropagation();
    setShowMobileNav(false);
  };

  const isCollapsed = ['/messages', '/friend'].some((path) => location.pathname.startsWith(path));

  const handleNotify = (status) => setIsNotify(status);
  const handleCloseNotify = () => isNotify && setIsNotify(false);

  const { disconnect } = useWebSocket();
  const { resetChat } = useChatContext();
  const navigate = useNavigate();

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
    [auth?.user, dispatch, sendNewMessage, addNewNotification]
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

  useEffect(() => {
    console.log('isCollapsed:', isCollapsed, 'Path:', location.pathname);
  }, [isCollapsed, location.pathname]);

  return (
    <div onClick={handleCloseNotify} className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header user={auth.user} handleLogout={handleLogout} />

      {/* Hamburger button for md and below */}
      <div className="block md:hidden px-2 py-1">
        <button onClick={handleHamburgerClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main layout */}
      <div className="mx-auto px-2 sm:px-3 lg:px-8">
        <div className="flex flex-row min-h-[calc(100vh-4rem)] gap-4">
          {/* Navigation: Hidden on md and below, visible on lg */}
          <div
            className={`hidden md:block lg:${
              isCollapsed ? 'w-1/12' : 'w-3/12'
            } min-h-ful rounded-lg`}
          >
            <Navigation
              isCollapsed={isCollapsed}
              isNotify={isNotify}
              handleNotify={handleNotify}
              handleLogout={handleLogout}
              onTabClick={handleCloseMobileNav}
            />
          </div>

          {/* Main Content */}
          <div
            className={`w-full md:w-8/12 lg:${
              isCollapsed ? 'w-11/12' : 'w-7/12'
            } min-h-fullrounded-lg p-4`}
          >
            <Outlet />
          </div>

          {/* Right Part: Hidden on xs/sm, visible on md/lg/xl */}
          <div
            className={`hidden md:block md:w-4/12 lg:${
              isCollapsed ? 'w-0' : 'w-2/12'
            } min-h-full rounded-lg overflow-hidden`}
          >
            <RightPart />
          </div>
        </div>
      </div>

      {/* Custom Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          showMobileNav ? 'translate-x-0' : '-translate-x-full'
        } w-64 overflow-y-auto md:hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseMobileNav}
          className="absolute top-4 right-4 text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Navigation
          isCollapsed={false}
          isNotify={isNotify}
          handleNotify={handleNotify}
          handleLogout={handleLogout}
          onTabClick={handleCloseMobileNav}
        />
      </div>

      {/* Overlay for closing menu when clicking outside */}
      {showMobileNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleCloseMobileNav}
        />
      )}

      {/* Notification (custom style) */}
      {isNotify && (
        <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-80 z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
          <button
            onClick={handleCloseNotify}
            className="absolute top-4 right-4 text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Notification />
        </div>
      )}
      {isNotify && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleCloseNotify}
        />
      )}
    </div>
  );
};

export default HomeLayout;