import { useAuthStore } from "../../hooks/useAuthStore"

export const NavBar = () => {
  const {startLogout, user} = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            {user.name}</span>
        <button className="btn btn-danger" onClick={startLogout}>
            <i className="fas fa-sign-out"></i>
            &nbsp;
            <span>Salir</span>
        </button>
        
    </div>
  )
}
