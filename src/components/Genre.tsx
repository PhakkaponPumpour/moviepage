import Link from "next/link";

interface Igenres {
  index: number;
  name: string;
  length: number;
  id: number;
}
export default function Genres({ index, name, length, id }: Igenres) {
  return (
    <Link href={`/genres/${id}?genres=${name.toLowerCase()}`}>
      <div className=" flex gap-4 text-textColor hover:text-white">
        <div className=" capitalize">{name.toLowerCase()}</div>
        <div className=" text-textColor ">
          {index + 1 !== length ? "/" : ""}
        </div>
      </div>
    </Link>
  );
}
