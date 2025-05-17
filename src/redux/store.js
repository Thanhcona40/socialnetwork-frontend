import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";

import { PostsReducer } from "./Posts/Reducer";
import { authReducer } from "./Auth/reducer";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"; 


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // Chỉ lưu auth, post không lưu
};

// Gói reducer với persistReducer
const rootReducer = combineReducers({
    auth: authReducer,
    post: PostsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo Redux Store
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// Tạo persistor để quản lý trạng thái lưu trữ
export const persistor = persistStore(store);