import "./App.css";
import Authentication from "./components/Authentication/Authentication";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./components/layouts/HomeLayout";
import Message from "./components/Messages/Message";
import Profile from "./components/Profile/Profile";
import PostDetails from "./components/PostDetails/PostDetails";
import BookmarkPost from "./components/BookmarkPost/BookmarkPost";
import HomeSection from "./components/HomeSection/HomeSection";
import { useAuth } from "./hooks/useAuth";
import RequestAddFriend from "./components/Friends/RequestAddFriend";
import SendRequireAddFriend from "./components/Friends/SendRequireAddFriend";
import SuggestFriend from "./components/Friends/SuggestFriend";
import FriendLayout from "./components/layouts/FriendLayout";

function App() {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Nếu đã đăng nhập, hiển thị các trang trong HomeLayout */}
        {auth?.jwt ? (
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomeSection />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/postDetail/:id" element={<PostDetails />} />
            <Route path="/bookmark" element={<BookmarkPost />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/friend/*" element={<FriendLayout />} >
              <Route index element={<RequestAddFriend />} />
              <Route path="sendrqfr" element={<SendRequireAddFriend />} />
              <Route path="suggestfr" element={<SuggestFriend />} />
            </Route>
          </Route>
        ) : (
          <Route path="/*" element={<Authentication />} />
        )}
      </Routes>
    </div>
  );
}

export default App;