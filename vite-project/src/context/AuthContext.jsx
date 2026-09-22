import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("dailyDiaryUsers")) || [];

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("dailyDiaryUsers", JSON.stringify(users));

    return {
      success: true,
      message: "Account created successfully.",
    };
  };
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("dailyDiaryUsers")) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    setUser(loggedInUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
