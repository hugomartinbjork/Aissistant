import Link from "next/link";
import Image from "next/image";
import logo from "../assets/loggo2.png";
import { useEffect, useState } from "react";
import { getAuth } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/hooks/logout";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { auth } = useAuth();
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link href="/" className="navlink">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={35}
              style={{ paddingTop: "25%" }}
            />
            {/* {title} */}
          </Link>
        </div>
        {auth ? (
          <div className="logo">
            <Link href="/home" className="navlink">
              Home
            </Link>
            <Link href="/board" className="navlink">
              Board
            </Link>
            <Link href="/about" className="navlink">
              About
            </Link>
            <Link href="/" className="navlink" onClick={logout}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="logo">
            <Link href="/about" className="navlink">
              About
            </Link>
            <Link href="/login" className="navlink" passHref>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
