export interface FormItem {
  key: string;
  label: string;
  inputType: string;
  onChange?: any;
  editable: boolean;
  hidden: boolean;
  column?: boolean;
  options?: Array<{ value: string | boolean; label: string }>;
}

export const eventSettingsFields: FormItem[] = [
  {
    key: "id",
    label: "Event Id",
    inputType: "input",
    editable: false,
    hidden: false,
  },
  {
    key: "name",
    label: "Event Name",
    inputType: "input",
    editable: true,
    hidden: false,
  },
  {
    key: "description",
    label: "Description",
    inputType: "textarea",
    editable: true,
    hidden: false,
  },
  {
    key: "total_seats",
    label: "Total Seats",
    inputType: "input",
    editable: true,
    hidden: false,
  },
  {
    key: "start_date",
    label: "Start Date",
    inputType: "datetime-local",
    editable: true,
    hidden: false,
  },
  {
    key: "end_date",
    label: "End Date",
    inputType: "datetime-local",
    editable: true,
    hidden: false,
  },
  {
    key: "access_type",
    label: "Access Type",
    inputType: "dropdown",
    editable: false,
    hidden: true,
    options: [
      { label: "Owner", value: "owner" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
  },
  {
    key: "location_name",
    label: "Location Name",
    inputType: "input",
    editable: true,
    hidden: false,
  },
  {
    key: "area_name",
    label: "Area Name",
    inputType: "input",
    editable: true,
    hidden: false,
  },
  {
    key: "formatted_address",
    label: "Formatted Address",
    inputType: "input",
    editable: true,
    hidden: false,
  },
  {
    key: "place_id",
    label: "Place ID",
    inputType: "input",
    editable: false,
    hidden: true,
  },
  {
    key: "rating",
    label: "Rating",
    inputType: "input",
    editable: false,
    hidden: true,
  },
  {
    key: "user_ratings_total",
    label: "User Ratings Total",
    inputType: "input",
    editable: false,
    hidden: true,
  },
  {
    key: "photos",
    label: "Photos",
    inputType: "photo_selector",
    editable: true,
    hidden: false,
  },
];
