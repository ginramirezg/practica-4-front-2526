"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyProfile } from "../lib/utils";
import { UserResponse } from "../types";

export const Header = () => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    getMyProfile()
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "userId=; path=/; max-age=0";
    document.cookie = "username=; path=/; max-age=0";

    window.location.href = "/login";
  };

  return (
    <header className="Header">
      <Link href="/" className="Logo">
        <div className="LogoCircle">N</div>
        <strong>
          Nebrija<span>Social</span>
        </strong>
      </Link>

      <nav className="HeaderNav">
        <Link href="/">⌂</Link>

        {user && (
          <Link href={`/profile/${user._id}`} className="UserLink">
            <div className="SmallAvatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span>{user.username}</span>
          </Link>
        )}

        {user && (
          <button onClick={logout} className="IconButton">
            ↪
          </button>
        )}
      </nav>
    </header>
  );
};