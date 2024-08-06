"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import { error } from "console";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export interface movie {
  id: string;
  poster_path: string;
  title: string;
  release_data: string;
}

export default function page() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [discover, setDiscover] = useState("");

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const id = params.id.toString();
    const page = searchParams.get("page");
    setDiscover(id);

    switch (id) {
      case "now_playing":
        setTitle("Now Playing Movie");
        break;
      case "top_rated":
        setTitle("Top Rated Movie");
        break;

      case "popular":
        setTitle("Popular Movie");
        break;
      case "upcoming":
        setTitle("Upcoming Movie");
        break;
      default:
        setTitle("");
        break;
    }
    axios
      .get(`${BASE_URL}/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
        params: {
          language: "en-US",
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_page);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [params.id, searchParams.get("page")]);

  return (
    <div>
      <h1>Server Error</h1>
    </div>
  );
}

//READ MEEEEE !!!! DONT FORGET TO DELETE
// // Learn How to Use the TMDB API to Create a
// Movie Page that can show  Movie Details: Information about movies, such as titles, summaries, cast, crew, and release dates.
// TV Shows: Data about television series, including episodes, seasons, and show details. Actors and
// Crew: Information about actors, directors, writers, and other crew members. Images and
// Videos: Movie posters, backdrops, and video trailers. Search and
// Discover: Search functionality for movies, TV shows, and people, as well as tools for discovering popular and trending content.
