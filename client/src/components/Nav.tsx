import Link from "next/link";
import Image from "next/image";
import logo from "../assets/loggo2.png";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => (
  <nav>
    <div className="container">
      <div className="logo">
        <Link href="/" className="navlink">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            style={{ paddingTop: "25%" }}
          />
          {/* {title} */}
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
