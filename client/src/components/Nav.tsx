import Link from "next/link";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => (
  <nav>
    <div className="container">
      <div className="logo">
        {/* <img src={require("../assets/weknowit.png")} alt="weknowit-logo" /> */}
        <Link href="/" className="navlink">
          {title}
        </Link>
      </div>
      <div className="logo">
        <Link href="/home" className="navlink">
          Home
        </Link>
        <Link href="/about" className="navlink">
          About
        </Link>
        <Link href="/login" className="navlink">
          Login
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
