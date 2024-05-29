import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/' })
  }

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  )
}

export default LogoutButton
