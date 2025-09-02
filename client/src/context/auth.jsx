import { useState, createContext, useCallback } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  signin: (token) => { },
  signout: () => { },
});

function retrieveStoredToken() {
  const token = localStorage.getItem('token');
  return { token }
}

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const signinHandler = useCallback((token) => {
    console.log('token: ', token)
    localStorage.setItem('token', token);
    setToken(token)
  }, []);

  const signoutHandler = useCallback(() => {
    localStorage.remove('token');
    setToken(null)
  }, [])

  const contextOptions = {
    token,
    isLoggedIn: userIsLoggedIn,
    signin: signinHandler,
    signout: signoutHandler
  }
  return <AuthContext.Provider value={contextOptions} >
    {children}
  </AuthContext.Provider>
}

export default AuthContext;
