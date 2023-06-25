import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/http512.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img
        className="logo"
        src={Logo}
        alt="logo"
        width={80}
        onClick={() => {
          navigate("/");
        }}
      />
      <nav className="nav-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/CheckLink">CheckLink</NavLink>
      </nav>
    </header>
  );
};
export { Header };
