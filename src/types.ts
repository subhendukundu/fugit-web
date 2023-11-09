export interface EventData {
  event_id?: string;
  title: string;
  description: string;
  event_type: string;
  latitude?: number | null;
  longitude?: number | null;
  place_id?: string;
  area?: string;
  address?: string | null;
  is_public: boolean;
  is_draft: boolean;
  start_date: string;
  end_date: string;
  created_at?: string | null;
  created_by?: string | null;
  geohash: string;
  keywords?: string | null;
  featured_photo?: string | null;
  max_seat: number;
  booked_seats?: number;
  last_booking_time?: string | null;
  rules_accepted: boolean | undefined;
  min_age?: number | null;
  max_age?: number | null;
  auto_approve: boolean | undefined;
  owner_name: string;
  owner_profile_photo?: string;
}
