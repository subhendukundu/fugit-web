import { component$ } from "@builder.io/qwik";
import { format, isSameDay } from "date-fns";

type Props = {
  startDate: Date;
  endDate: Date;
  eventInfo: {
    entries: number;
    left?: number;
  };
};

export default component$(({ startDate, endDate, eventInfo }: Props) => {
  const isSameDayEvent = isSameDay(startDate, endDate);

  const formattedStartDate = format(startDate, "dd");
  const formattedStartMonth = format(startDate, "MMM");
  const formattedStartTime = format(startDate, "hh:mmaaa");
  const formattedEndDate = format(endDate, "dd");
  const formattedEndMonth = format(endDate, "MMM");
  const formattedEndTime = format(endDate, "hh:mmaaa");

  return (
    <div class="flex border border-opacity-30 border-primary rounded-lg justify-between max-w-sm mb-6">
      <div class="p-4">
        <div class="text-sm text-quaternary font-semibold">Event From</div>
        <div>
          <div class="font-semibold text-2xl mt-3 text-primary">
            {formattedStartDate} <span class="text-sm font-normal">{formattedStartMonth}</span>
          </div>
          {!isSameDayEvent && <div class="text-md text-tertiary">{formattedStartTime}</div>}
        </div>
      </div>
      <div class="border-l p-4">
        <div class="text-sm text-quaternary font-semibold">Event To</div>
        <div>
        <div class="font-semibold text-2xl mt-3 text-primary">
            {formattedEndDate} <span class="text-sm font-normal">{formattedEndMonth}</span>
          </div>
          {!isSameDayEvent && <div class="text-md text-tertiary">{formattedEndTime}</div>}
        </div>
      </div>
      <div class="border-l p-4">
        <div class="text-sm text-quaternary font-semibold">Entries</div>
        <div>
          <div class="font-bold text-2xl mt-3 text-primary">
            {eventInfo.left || 0} <span class="text-sm font-normal">/ {eventInfo.entries}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
