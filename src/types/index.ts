export type Genre = "Romance" | "Action" | "Thriller" | "Fantasy" | "Historical";

// Interface batata hai ke har Drama object mein ye properties lazmi honi chahiye
export interface KDrama {
  id: number;
  title: string;
  rating: number;
  genre: Genre[]; // Array of genres
  poster: string; // Image URL
  releaseYear: number;
  status: "Ongoing" | "Completed"; // Sirf ye do options
  description: string;
}