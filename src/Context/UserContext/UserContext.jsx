import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');

    const login = (email) => {
        setIsLoggedIn(true);
        setEmail(email);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('email', email);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setEmail('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
    };

    return (
        <UserContext.Provider 
        value={{ 
            isLoggedIn, 
            email, 
            login, 
            logout 
            }}
            >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;