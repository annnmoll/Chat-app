import React, { useState, createContext } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [signupData, setSignupData] = useState({});
  const [loggedUser, setLoggedUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSenderName = (chat) => {
    if (chat) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return chat.users[0] === userInfo._id ||
        chat.users[0]._id === userInfo._id
        ? chat.users[1].name
        : chat.users[0].name;
    }
  };

  let value = {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    loggedUser,
    setLoggedUser,
    searchResults,
    setSearchResults,
    signupData,
    setSignupData,
    getSenderName,
    loading,
    setLoading,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
