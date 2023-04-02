export function getGoogleMapsUrl(
  formattedAddress: string,
  placeId: string
): string {
  const encodedAddress = encodeURIComponent(formattedAddress);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}&query_place_id=${placeId}`;
}
