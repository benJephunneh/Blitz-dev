import { createContext, useState } from "react"

const UserContext = createContext(null)

function UserProvider({ children }) {
  const [state, setState] = useState({})

  return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
