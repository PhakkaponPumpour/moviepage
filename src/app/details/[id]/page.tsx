"use client";
import Genres from "@/components/Genre";
import Loading from "@/components/Loading";
import { BASE_URL } from "@/utils/Const";
import { BASE_IMG_URL } from "@/utils/Const";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsPlayFill } from "react-icons/bs";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export interface Root {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface Videos {
  results: Result[];
}
export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export default function DetailsCard() {
  const [movie, setMovie] = useState<Root>();
  const [showDetails, setShowDetails] = useState(false);
  const [trailer, setTrailer] = useState(" ");

  const router = useRouter();
  const params = useParams();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&append_to_response=videos`
      )
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      });
  }, [params.id]);
  useEffect(() => {
    const trailerIndex = movie?.videos?.results?.findIndex(
      (element) => element.type === "Trailer"
    );
    const trailerURL = `https://www.youtube.com/watch?v=${
      movie?.videos?.results[trailerIndex!]?.key
    }`;
    setTrailer(trailerURL);
  }, [movie]);
  const startPlayer = () => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowDetails(true);
  };
  return (
    <div>
      <h1>Server Error</h1>
    </div>
  );
}
