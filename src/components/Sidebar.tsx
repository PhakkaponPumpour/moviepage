"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const params = useParams() as unknown as ParamsType;
  const searchParams = useSearchParams();

  interface ParamsType {
    id: string;
  }

  interface Igenre {
    id: string;
    name: string;
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
        params: {
          language: "en-US",
        },
      })
      .then(({ data }) => {
        // console.log(data);
        setGenres(data.genres);
      });
  }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setSelectedGenre(searchParams.get("genre")?.toString()!);
      return;
    }
    setSelectedGenre(params.id.toString());
  }, [params.id]);

  // useEffect(() => {
  //   if (searchParams.get("genre")) {
  //     setSelectedGenre(searchParams.get("genre") as string);
  //     return;
  //   }
  //   if (params && params.id) {
  //     setSelectedGenre(params.id);
  //   }
  // }, [searchParams, params]);
  return (
    <div
      className="bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 
    overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-900 
    scrollbar-track-primary hidden sm:block"
    >
      <div className="flex flex-col gap-4 pt-4">
        <p className="sidebarTitle">Discover</p>
        <Link href="/discover/now_playing">
          <p
            className={` sidebarLink ${
              selectedGenre === "now_playing" ? "sidebarActive" : ""
            } `}
          >
            Now Playing
          </p>
        </Link>
        <Link className="w-fit" href="/discover/top_rated">
          <p
            className={` sidebarLink ${
              selectedGenre === "top_rated" ? "sidebarActive" : ""
            } `}
          >
            Top Rated
          </p>
        </Link>
        <Link className="w-fit" href="/discover/popular">
          <p
            className={`sidebarLink ${
              selectedGenre === "popular" ? "sidebarActive" : ""
            } `}
          >
            Popular
          </p>
        </Link>
        <Link className="w-fit" href="/discover/upcoming">
          <p
            className={`sidebarLink ${
              selectedGenre === "upcoming" ? "sidebarActive" : ""
            } `}
          >
            Upcoming
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <p className="sidebarTitle">Genre</p>

        {genres.map((genre: Igenre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}?genres=${genre.name.toLowerCase()}`}
          >
            <p
              className={`sidebarLink ${
                genre.name.toLowerCase() === selectedGenre
                  ? "sidebarActive"
                  : ""
              }`}
            >
              {genre.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
