import HomeIcon from "@mui/icons-material/Home"
import NotificationIcon from "@mui/icons-material/Notifications"
import GroupIcon from "@mui/icons-material/Group"
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import  MessageRoundedIcon  from "@mui/icons-material/MessageRounded";
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


export const NavigationMenu =[
    {
        id:1,
        title:"Home",
        icon:<HomeOutlinedIcon fontSize="large" />,
        iconTouched:<HomeIcon fontSize="large" />,
        path:"/"
    },
    {
        id:2,
        title:"Friend",
        icon:<PeopleOutlineIcon fontSize="large" />,
        iconTouched:<GroupIcon fontSize="large" />,
        path:"/friend"
    },
    {
        id:3,
        title:"Notifications",
        icon: <NotificationsNoneIcon fontSize="large" />,
        iconTouched:<NotificationIcon fontSize="large" />,
    },

    {
        id:4,
        title:"Messages",
        icon:<MessageOutlinedIcon fontSize="large" />,
        iconTouched:<MessageRoundedIcon fontSize="large"/>,
        path:"/messages"
    },
    {
        id:5,
        title:"Bookmarks",
        icon:<BookmarksOutlinedIcon fontSize="large" />,
        iconTouched:<BookmarksIcon fontSize="large" />,
        path:"/bookmark"
    },
    {
        id:6,
        title:"Group",
        icon:<Groups2OutlinedIcon fontSize="large" />,
        iconTouched:<Groups2RoundedIcon fontSize="large" />,
        path:"/group"
    },
    {
        id:7,
        title:"Profile",
        icon:<AccountCircleOutlinedIcon fontSize="large" />,
        iconTouched:<AccountCircleRoundedIcon fontSize="large" />,
        path:"/profile"
    },
]