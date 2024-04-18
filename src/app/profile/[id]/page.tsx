"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  async function handleLogout() {
    try {
      await axios.get("/api/users/logout");
      toast.success("Loged out!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  async function getUSer() {
    try {
      const val = await axios.get("/api/me");
      setUserData(val.data.data);

      return;
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getUSer();
  }, []);
  console.log(userData);

  return (
    <>
      <h3>Hello {userData ? userData.username : "User"}!</h3>
      <div>This is a profile page through id.</div>
      <div>
        <button style={{ width: "100px" }} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};
export default Profile;
