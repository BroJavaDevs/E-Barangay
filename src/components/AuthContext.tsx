import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

type AuthContextType = {
  token: string | null,
  data: {
    exp: number,
    iat: number,
    iss: string,
    sub: number,
    user: {
      id: number,
      username: string,
      position: string
    }
  } | null,
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [data, setData] = useState<AuthContextType['data']>(null)

  useEffect(() => {
    if(token) {
      try {
        const decodedToken = jwtDecode(token) as AuthContextType['data'] | null
        setData(decodedToken)
      } catch(e) {
        setData(null)
      }
    } else {
      setData(null)
    }
  }, [token])

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setData(null)
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ data, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};