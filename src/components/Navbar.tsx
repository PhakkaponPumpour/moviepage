"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import MoveNavbar from "./MoveNavbar";

export default function Navbar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
    router.push(`/search/${input}?page=1`);
  };

  return (
    <div className="bg-primary">
      <div className=" flex justify-between items-center py-4 px-2 md:px-10">
        <Link className=" hidden md:block" href="/discover/now_playing">
          <h2 className="text-[30px]">Simple Moviepage</h2>
        </Link>

        <form className="space-x-4 hidden md:block" onSubmit={handleSubmit}>
          <input
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search...♥"
          />
          <button className="bg-secondary text-textColor px-4 py-2 rounded-lg hover:bg-textColor hover:text-white">
            Search
          </button>
        </form>
        <MoveNavbar
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
