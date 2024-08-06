

"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export interface movie {
  id: string;
  poster_path: string;
  title: string;
  release_data: string;
}

export default function page() {
  const [title, setTitle] = useState();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [discover, setDiscover] = useState("");

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
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