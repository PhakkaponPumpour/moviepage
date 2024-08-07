import { useState } from "react";
import CardPoster from "./CardPoster";
import Link from "next/link";
import { BASE_IMG_URL } from "@/utils/Const";

interface propsType {
  id: string;
  img: string;
  title: string;
  release_date: string;
}

export default function Card({ img, id, title, release_date }: propsType) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className=" group bg-primary h-[450px] md:h-[300px] w-[100%]">
      {!loaded && !error && <CardPoster />}
      {error && <CardPoster error />}

      <Link
        className={`${!loaded && error && "hidden"}`}
        href={`/details/${id}`}
      >
        <div className=" relative ">
          <img
            className=" object-cover h-[450px] md:h-[300px] w-[100%]"
            src={`${BASE_IMG_URL}${img}`}
            alt="movie_poster"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
          <div
            className=" absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center 
          transition-all duration-500 opacity-0 group-hover:opacity-100"
          >
            {title}
            <p>{release_date}</p>
          </div>    
        </div>
      </Link>
    </div>
  );
}
