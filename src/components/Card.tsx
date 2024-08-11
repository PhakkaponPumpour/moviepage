import { useState } from "react";
import CardPoster from "./CardPoster";
import Link from "next/link";
import { BASE_IMG_URL } from "@/utils/Const";
import { CiStar } from "react-icons/ci";
import Image from "next/image";

interface propsType {
  id: string;
  img: string;
  title: string;
  release_date: string;
  vote_average: number;
}

export default function Card({ img, id, title, vote_average }: propsType) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative bg-primary overflow-hidden group w-full max-w-xs mx-auto rounded-lg shadow-lg">
      {!loaded && !error && <CardPoster />}
      {error && <CardPoster error />}

      <Link
        className={`${!loaded && error && "hidden"}`}
        href={`/details/${id}`}
      >
        <div className=" relative w-full h-80 ">
          {/* object-cover h-[450px] md:h-[300px] w-[100%] in Image*/}
          <Image
            className=" object-cover "
            src={`${BASE_IMG_URL}${img}`}
            alt="movie_poster"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            width={300}
            height={450}
            priority
          />
          <div
            className=" absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center 
          transition-all duration-500 opacity-0 group-hover:opacity-100 "
          >
            {title}
            <p className="flex justify-center items-center text-sm font-bold text-[#FFAD49] gap-2 ">
              <CiStar size={20} />
              {vote_average.toFixed(1)}/10
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
