"use client";
import { movie } from "@/app/discover/[id]/page";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
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

    setTitle(`${id} Movies`);
    setSearch(id);

    axios
      .get(`${BASE_URL}/search/movie`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
        params: {
          query: id,
          page, // Add page parameter
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_pages);
        // console.log(response);
      })
      .catch((error) => console.log(error));
  }, [params.id, searchParams.get("page")]);

  const handlePageChange = (button: string) => {
    let page = "";
    if (button === "prev") {
      page = `page=${currentPage - 1}`;
    } else {
      page = `page=${currentPage + 1}`;
    }

    router.push(`/search/${search}?${page}`);
  };
  return (
    <main
      className="bg-secondary  max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-6 
    overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-900 
    scrollbar-track-primary rounded-xl relative"
      ref={mainRef}
    >
      <h1 className="text-[24px] tracking-[2px]">{title}</h1>
      {movies.length === 0 && <Loading />}

      {/* {MovieCard} */}
      <div className=" grid gap-5 moviesGrid place-items-center mt-8">
        {movies.map((movie: movie) => (
          <Card
            key={movie.id}
            img={movie.poster_path}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
          />
        ))}
      </div>
      {/* {MovieCard} */}

      <div className=" flex justify-center gap-16 py-16 pt-16">
        <button
          onClick={() => handlePageChange("prev")}
          className={`bg-purple-800 p-2 px-8 hover:bg-purple-950 ${
            currentPage === 1 && "hidden"
          }`}
        >
          {/* {!!!! need to chang} */}
          Prev
          {/* {!!!! need to chang} */}
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className={`bg-purple-800 p-2 px-8 rounded-full hover:bg-purple-950 ${
            currentPage === totalPage && "hidden"
          }`}
        >
          {/* {!!!! need to chang} */}
          Next
          {/* {!!!! need to chang} */}
        </button>
      </div>
      <div className="pb-20">
        <Footer />
      </div>
    </main>
  );
}
