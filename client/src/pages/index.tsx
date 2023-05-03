import Navbar from "@/components/Nav";
import AuthContext, { getAuth } from "@/context/AuthContext";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const textElements: string[] = ["Productivity", "Elegance", "Greatness"];
  const auth = useAuth();

  const showNextText = () => {
    setCurrentTextIndex((currentTextIndex + 1) % textElements.length);
  };

  useEffect(() => {
    const intervalId = setInterval(showNextText, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTextIndex]);

  const textStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    fontSize: "60px",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    transition: "opacity 1s ease-in-out",
  };

  const activeTextStyle = {
    ...textStyle,
    opacity: "1",
    position: "absolute" as const,
  };

  return (
    <>
      <Navbar title="DefaultIcon" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        {textElements.map((text, index) => (
          <h1
            key={index}
            style={index === currentTextIndex ? activeTextStyle : textStyle}
          >
            {text}
          </h1>
        ))}
      </div>
    </>
  );
}
