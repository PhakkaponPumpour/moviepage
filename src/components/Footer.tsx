import Link from "next/link";

export default function Footer() {
  return (
    <div className=" text-center font-light text-gray-500 pt-4 text-[15px] md:text-[15px]">
      ♥ Phakapon | MoviePage {new Date().getFullYear()}.
      <p>
        Made by using
        <Link
          className="text-white"
          href="https://www.themoviedb.org/"
          target="_blank"
        >
          {" "}
          TMDB API
        </Link>
      </p>
    </div>
  );
}
