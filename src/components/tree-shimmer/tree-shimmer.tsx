import { component$ } from "@builder.io/qwik";

interface ShimmerProps {
  count: number;
}

export default component$<ShimmerProps>(({ count }) => {
  const renderShimmerCard = () => (
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-2 py-1">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-primary bg-opacity-10 rounded col-span-2"></div>
        </div>
        <div class="space-y-1">
          <div class="h-2 bg-primary bg-opacity-10 rounded"></div>
          <div class="h-2 bg-primary bg-opacity-10 rounded"></div>
          <div class="h-2 bg-primary bg-opacity-10 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div class="p-4 w-full mx-auto ml-2 pl-4 border-l border-dashed border-gray-700">
      {Array.from({ length: count }, (_, index) => (
        <div class="mb-4" key={index}>{renderShimmerCard()}</div>
      ))}
    </div>
  );
});
