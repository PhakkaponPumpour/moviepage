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
import { CiStar } from "react-icons/ci";
import Image from "next/image";
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
        `${BASE_URL}/movie/${params.id}?append_to_response=videos`,

        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          },
          params: {
            language: "en-US",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
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
    <main
      className="bg-secondary p-4 md:p-8 relative max-h-[calc(100vh-77px)] 
  min-h-[calc(100vh-77px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-primary"
      ref={mainRef}
    >
      {movie === null && <Loading />}
      <div
        className="text-textColor hover:text-white absolute right-2 top-2 md:right-4 md:top-4 cursor-pointer"
        onClick={router.back}
      >
        <IoMdClose size={24} />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center pt-4 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] max-w-full md:max-w-[1200px] gap-6 md:gap-12">
          <div className="flex justify-center">
            <Image
              src={`${BASE_IMG_URL}${movie?.poster_path}`}
              alt={movie?.title || "Movie Poster"}
              layout="responsive"
              width={300}
              height={450}
              className="object-cover"
            />
          </div>
          <div className="space-y-4 md:space-y-6 text-textColor">
            <div className="uppercase text-xl md:text-2xl font-medium pr-2 md:pr-4 text-white">
              {movie?.title}
            </div>
            <div className="flex gap-2 flex-wrap">
              {movie?.genres?.map((genre, index) => (
                <Genres
                  key={genre.id}
                  index={index}
                  length={movie.genres.length}
                  name={genre.name}
                  id={genre.id}
                />
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div>
                Language: {movie?.original_language?.toLocaleUpperCase()}
              </div>
              <div>Release: {movie?.release_date}</div>
              <div className="flex items-center gap-2">
                Rating:
                <p className="text-[#FFAD49] flex items-center">
                  <CiStar size={20} className="mr-1" />
                  {movie?.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="pt-6 space-y-2 pr-4">
              <div className="font-semibold">OVERVIEW:</div>
              <div>{movie?.overview}</div>
            </div>
            <div
              className="inline-block pt-4 cursor-pointer"
              onClick={startPlayer}
            >
              <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-4 hover:bg-[#b4b4b4]">
                <BsPlayFill size={20} />
                Watch Trailer
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-3 inset-x-0 md:inset-x-[10%] rounded overflow-hidden transition duration-1000 ${
          showDetails ? "opacity-100 z-50" : "opacity-0 -z-10"
        }`}
      >
        <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
          <span className="font-semibold">Trailer</span>
          <div
            className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0f0f0f]"
            onClick={() => setShowDetails(false)}
          >
            <IoMdClose className="h-5" />
          </div>
        </div>
        <div className="relative pt-[60%]">
          <ReactPlayer
            url={trailer}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
            controls={true}
            playing={showDetails}
          />
        </div>
      </div>

      <div className=" pb-20">
        <Footer />
      </div>
    </main>
  );
}
