import { useAuth } from "../../components/AuthContext"

export const Logout: React.FC = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default Logout