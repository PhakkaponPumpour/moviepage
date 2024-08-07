import { CiImageOff } from "react-icons/ci";

export default function CardPoster({ error }: { error?: boolean }) {
  return (
    <div
      className={`h-[450px] md:h-[335px] w-[100%] grid place-items-center bg-primary ${
        !error && "cardPoster"
      }`}
    >
      {error && <CiImageOff size={56} />}
    </div>
  );
}
