export default function Loading() {
  return (
    <div
      className=" absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2
     bg-transparent w-[100%] h-[100%] grid place-items-center"
    >
      <div className="loader"></div>
    </div>
  );
}
