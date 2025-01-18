import { fetchScheduleAnimes } from "@/app/actions";
import Image from "next/image";

const Page = async () => {
  const response = await fetchScheduleAnimes();

  return response.map((schedule, i) => (
    <div key={i} className="flex flex-col gap-4 p-4 xl:mx-auto xl:max-w-[70%]">
      <span className="text-3xl">{schedule.weekday}</span>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
        {schedule.animes.map((anime) => (
          <div key={anime.id} className="group relative h-[260px]">
            <Image
              src={anime.imageUrl}
              layout="fill"
              width={0}
              height={0}
              alt={`Foto do anime ${anime.name}`}
              className="rounded-md"
              objectFit="cover"
            />
            <div className="pointer-events-none absolute inset-0 -right-[calc(100%+0.5rem)] left-full z-10 flex flex-col justify-between gap-2 overflow-visible rounded-r-md bg-card text-sm opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
              <span className="px-2 text-lg font-bold">{anime.name}</span>
              <span className="overflow-y-auto px-2 pb-2 font-bold">
                {anime.synopsis}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));
};

export default Page;
