import { ScheduleAnime } from "@/app/_components/ScheduleAnime";
import { Schedule } from "@repo/core";

interface Props {
  schedules: Schedule[];
}

export const ScheduleWeekdays = ({ schedules }: Props) => {
  return schedules.map((schedule) => {
    if (schedule.animes.length === 0) {
      return;
    }

    return (
      <div
        key={schedule.weekday}
        className="flex flex-col gap-4 p-4 xl:mx-auto xl:max-w-[70%]"
      >
        <span className="text-3xl">{schedule.weekday}</span>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
          {schedule.animes.map((anime) => (
            <ScheduleAnime key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    );
  });
};
