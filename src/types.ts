export interface Idea {
  activity_name: string;
  short_description: string;
  location: string;
}

export interface WeightedPlace extends Place {
  weightedRating: number;
}

export interface IdeaWithPlaces {
  idea: Idea;
  places: WeightedPlace[];
}

export interface OpenAIResponse {
  choices?: { text: string }[];
}

export interface Place {
  name: string;
  formatted_address: string;
  location_link: string;
  rating: number;
  user_ratings_total: number;
  photos: { url: string }[];
  place_id: string;
}

export type TextSearchResponse = {
  results: Place[];
  status: string;
};
