import { useEffect, useState } from 'react'
import { userSession } from '../auth'

export const useStacksAuth = () => {
  const [userData, setUserData] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (userSession.isSignedIn()) {
      const data = userSession.loadUserData()
      setUserData(data)
      setIsAuthenticated(true)
    }
  }, [])

  const signOut = () => {
    userSession.signUserOut()
    setUserData(null)
    setIsAuthenticated(false)
  }

  return {
    userData,
    isAuthenticated,
    signOut
  }
}