import { ScheduleWeekdays } from "@/app/_components/ScheduleWeekdays";
import { fetchScheduleAnimes } from "@/app/actions";

const Page = async () => {
  const response = await fetchScheduleAnimes();

  return <ScheduleWeekdays schedules={response} />;
};

export default Page;
