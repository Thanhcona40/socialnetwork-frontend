import React, { useEffect, useState } from 'react';
import { NavigationMenu } from './NavigationMenu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api, API_BASE_URL } from '../../../config/api';
import { useNotificationContext } from '../../../hooks/useNotificationContext';

const Navigation = ({ isCollapsed, handleNotify, onTabClick }) => {
  const [selectedIconId, setSelectedIcon] = useState(null);
  const { notifications } = useNotificationContext();
  const [countUnreadNotify, setCountUnreadNotify] = useState(0);
  
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  // Lấy danh sách thông báo chưa đọc
  const getUnreadNotify = async () => {
    try {
      const { data } = await api.get(`${API_BASE_URL}/api/notification/unread-notify`);
      setCountUnreadNotify(data || 0);
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
      setCountUnreadNotify(0);
    }
  };

  useEffect(() => {
    getUnreadNotify();
  }, [notifications]);

  const handleChangeIconColor = (id) => {
    setSelectedIcon((prevSelected) => (prevSelected === id && selectedIconId === id) ? id : id);
  };

  const handleChangePath = (e, path, title) => {
    title === 'Profile' ? navigate(`/profile/${auth?.user?.id}`) : navigate(path);
    title === 'Notifications' ? handleNotify(true) : handleNotify(false);
    if (onTabClick) onTabClick(e);
  };

  return (
    <div
      className={`h-screen sticky top-0 transition-all duration-300 bg-gray-100 ${
        isCollapsed ? '' : 'w-full sm:w-64'
      }`}
    >
      {/* Navigation Menu */}
      <div className={`py-6 space-y-4 ${isCollapsed ? '' : 'px-4'}`}>
        {NavigationMenu.map((item) => (
          <div
            key={item.id}
            className={`flex items-center w-full h-12 cursor-pointer rounded-lg transition-all duration-200 ${
              selectedIconId === item.id
                ? 'bg-blue-100 text-blue-500'
                : 'hover:bg-gray-100 text-gray-700'
            } ${isCollapsed ? ' px-2' : 'px-4 py-2'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeIconColor(item.id);
              handleChangePath(e, item.path, item.title);
            }}
          >
            {/* Icon */}
            <div className="text-2xl relative flex items-center">
              {selectedIconId === item.id ? item.iconTouched : item.icon}
              {countUnreadNotify > 0 && item.title === 'Notifications' && (
                <span className="absolute top-0 right-[-6px] w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                  {countUnreadNotify}
                </span>
              )}
            </div>

            {/* Title */}
            {!isCollapsed && (
              <p className="text-base font-medium ml-3">{item.title}</p>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className={`my-8 border-gray-300 ${isCollapsed ? 'hidden' : ''}`} />
    </div>
  );
};

export default Navigation;