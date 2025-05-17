import { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { getAllRequestAddFriend } from '../../redux/Auth/action';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

function FriendLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    useEffect(() => {
            dispatch(getAllRequestAddFriend())
        },[auth?.requestFriend]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        {
        path: '',
        label: 'Danh sách bạn bè',
        icon: <PersonAddIcon />,
        tooltip: 'Xem danh sách bạn bè của bạn',
        },
        {
        path: 'requests',
        label: 'Yêu cầu kết bạn',
        icon: <PersonAddIcon />,
        tooltip: 'Xem các yêu cầu kết bạn đang chờ',
        badge: auth?.listRequestFriend?.length || 0,
        },
        {
        path: 'sent-requests',
        label: 'Yêu cầu đã gửi',
        icon: <SendIcon />,
        tooltip: 'Xem các yêu cầu kết bạn bạn đã gửi',
        },
        {
        path: 'suggestions',
        label: 'Gợi ý bạn bè',
        icon: <StarIcon />,
        tooltip: 'Khám phá những người bạn mới',
        },
    ];

    return (
        <div className="flex min-h-[calc(100vh-2rem)] bg-white rounded-lg shadow-md">
        {/* Navbar bên trái */}
        <motion.div
            initial={{ width: isSidebarOpen ? '16rem' : '4rem' }}
            animate={{ width: isSidebarOpen ? '16rem' : '4rem' }}
            transition={{ duration: 0.3 }}
            className={`bg-white border-r overflow-y-auto flex flex-col ${
            isSidebarOpen ? 'p-4' : 'p-2'
            }`}
        >
            {/* Tiêu đề và nút toggle */}
            <div className="flex items-center justify-between mb-4">
            {isSidebarOpen && (
                <h2 className="text-xl font-bold text-gray-900">Bạn bè</h2>
            )}
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100"
            >
                {isSidebarOpen ?  <WestOutlinedIcon /> : <EastOutlinedIcon/>}
            </button>
            </div>

            {/* Thanh tìm kiếm */}
            {isSidebarOpen && (
            <div className="mb-4">
                <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm kiếm bạn bè..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                </div>
            </div>
            )}

            {/* Danh sách điều hướng */}
            <nav className="flex flex-col gap-2 space-y-3">
            {navItems.map((item) => (
                <Tooltip key={item.path} title={item.tooltip} placement="right">
                <NavLink
                    to={`/friend/${item.path}`}
                    end={item.path === ''}
                    className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all  ${
                        isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    } ${isSidebarOpen ? '' : 'justify-center'}`
                    }
                >
                    {item.icon}
                    {isSidebarOpen && (
                    <span className="flex-1 pl-3">{item.label}</span>
                    )}
                    {item.badge > 0 && isSidebarOpen && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                    </span>
                    )}
                </NavLink>
                </Tooltip>
            ))}
            </nav>
        </motion.div>

        {/* Nội dung chính */}
        <div className="flex-1 p-6">
            <Outlet />
        </div>
        </div>
    );
    }

    export default FriendLayout;