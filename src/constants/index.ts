import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { MdAddToQueue } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdOutlineFeed } from "react-icons/md";
import { FiHome, FiFilm, FiBookmark, FiHeart, FiRss } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";

export interface NavLink {
  name: string;
  href: string;
  icon: keyof typeof modernIcons;
}


// accentColors.js
export const accentColors = [
  {
    name: "Crimson Red",
    value: "#dc2626", // Netflix red
  },
  {
    name: "Royal Purple",
    value: "#8E44AD",
  },
  {
    name: "Deep Sky Blue",
    value: "#00BFFF",
  },
  {
    name: "Amber Gold",
    value: "#F5A623",
  },
  {
    name: "Turquoise",
    value: "#1ABC9C",
  },
  {
    name: "Warm Pink",
    value: "#FF3366",
  },
];


// Movie source options for streaming
export const movieSources = [
  {
    id: "vidlink",
    name: "VidLink Pro",
    url: (id: string) => `https://vidlink.pro/movie/${id}`,
  },
  {
    id: "vidsrc",
    name: "VidSrc",
    url: (id: string) => `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
  },
  {
    id: "vidsrc_icu",
    name: "VidSrc.icu",
    url: (id: string) => `https://vidsrc.icu/embed/movie/${id}`,
  },
  {
    id: "vidsrc_me",
    name: "VidSrc.me",
    url: (id: string) => `https://vidsrc.me/embed/movie/${id}`,
  },
  {
    id: "vidsrc_to",
    name: "VidSrc.to",
    url: (id: string) => `https://vidsrc.to/embed/movie/${id}`,
  },
  {
    id: "embed_su",
    name: "Embed.su",
    url: (id: string) => `https://embed.su/embed/movie/${id}`,
  },
];

// geners
export const Geners = [
  { Id: 0, Name: "Action" },
  { Id: 1, Name: "Adventure" },
  { Id: 2, Name: "Animation" },
  { Id: 3, Name: "Comedy" },
  { Id: 4, Name: "Crime" },
  { Id: 5, Name: "Documentary" },
  { Id: 6, Name: "Drama" },
  { Id: 7, Name: "Family" },
  { Id: 8, Name: "Fantasy" },
  { Id: 9, Name: "History" },
  { Id: 10, Name: "Horror" },
  { Id: 11, Name: "Music" },
  { Id: 12, Name: "Mystery" },
  { Id: 13, Name: "Romance" },
  { Id: 14, Name: "Science Fiction" },
  { Id: 15, Name: "Thriller" },
  { Id: 16, Name: "TV Movie" },
  { Id: 17, Name: "War" },
  { Id: 18, Name: "Western" }
];

// MPA Rating Categories
export const MPA_CATEGORIES = [
  "G", // General Audiences
  "PG", // Parental Guidance
  "PG-13", // Parents Strongly Cautioned
  "R", // Restricted
  "NC-17", // Adults Only
  "Unrated", // Unrated/Not Rated
];

// Original MPA ratings for reference
export const MPA = [
  "Banned",
  "12",
  "13+",
  "16",
  "16+",
  "18",
  "18+",
  "AO",
  "Approved",
  "Atp",
  "Btl",
  "C",
  "E",
  "EM",
  "F",
  "G",
  "GP",
  "K-13",
  "K-14",
  "K-16",
  "K-8",
  "M",
  "M/PG",
  "MA-17",
  "N/A",
  "NC-17",
  "Not Rated",
  "o.Al.",
  "Open",
  "Passed",
  "PD",
  "PG",
  "PG-13",
  "R",
  "TV-13",
  "TV-14",
  "TV-G",
  "TV-MA",
  "TV-PG",
  "TV-Y",
  "TV-Y7",
  "TV-Y7-FV",
  "U",
  "Unrated",
  "X",
];

// MPA Rating Mapping - maps original ratings to simplified categories
export const MPA_MAPPING: Record<string, string> = {
  // General Audiences (All ages)
  "G": "G",
  "TV-G": "G",
  "TV-Y": "G",
  "TV-Y7": "G",
  "TV-Y7-FV": "G",
  "U": "G",
  "E": "G",
  "Approved": "G",
  "Passed": "G",
  "Open": "G",
  
  // Parental Guidance (Some material may not be suitable for children)
  "PG": "PG",
  "TV-PG": "PG",
  "GP": "PG",
  "M/PG": "PG",
  "C": "PG",
  "K-8": "PG",
  "Atp": "PG",
  "Btl": "PG",
  "EM": "PG",
  "F": "PG",
  "PD": "PG",
  
  // Parents Strongly Cautioned (Ages 13+)
  "PG-13": "PG-13",
  "TV-13": "PG-13",
  "TV-14": "PG-13",
  "13+": "PG-13",
  "12": "PG-13",
  "K-13": "PG-13",
  "K-14": "PG-13",
  "M": "PG-13",
  
  // Restricted (Ages 17+ or with parent/guardian)
  "R": "R",
  "TV-MA": "R",
  "16": "R",
  "16+": "R",
  "K-16": "R",
  "MA-17": "R",
  
  // Adults Only (Ages 18+)
  "NC-17": "NC-17",
  "18": "NC-17",
  "18+": "NC-17",
  "AO": "NC-17",
  "X": "NC-17",
  "Banned": "NC-17",
  
  // Unrated/Not Rated
  "Unrated": "Unrated",
  "Not Rated": "Unrated",
  "N/A": "Unrated",
  "o.Al.": "Unrated",
};

// Helper function to get simplified MPA rating
export const getSimplifiedMPA = (originalRating: string): string => {
  return MPA_MAPPING[originalRating] || "Unrated";
};

// Helper function to get MPA category color for UI styling
export const getMPAColor = (mpaCategory: string): string => {
  const colors: Record<string, string> = {
    "G": "#22c55e", // Green - safe for all
    "PG": "#3b82f6", // Blue - mild caution
    "PG-13": "#f59e0b", // Yellow/Orange - moderate caution
    "R": "#ef4444", // Red - restricted
    "NC-17": "#7c2d12", // Dark red - adults only
    "Unrated": "#6b7280", // Gray - unrated
  };
  return colors[mpaCategory] || colors["Unrated"];
};

// Helper function to check if content is appropriate for age
export const isAppropriateForAge = (mpaCategory: string, age: number): boolean => {
  const ageRequirements: Record<string, number> = {
    "G": 0, // General Audiences
    "PG": 8, // Parental guidance recommended under 8
    "PG-13": 13, // Ages 13+
    "R": 17, // Ages 17+ (with adult supervision under 17)
    "NC-17": 18, // Adults only
    "Unrated": 18, // Treat as adult content when unknown
  };
  return age >= (ageRequirements[mpaCategory] || 18);
};

// Helper function to get MPA badge styling classes
export const getMPABadgeClasses = (mpaCategory: string): string => {
  const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
  const colorClasses: Record<string, string> = {
    "G": "bg-green-100 text-green-800 border border-green-200",
    "PG": "bg-blue-100 text-blue-800 border border-blue-200", 
    "PG-13": "bg-yellow-100 text-yellow-800 border border-yellow-200",
    "R": "bg-red-100 text-red-800 border border-red-200",
    "NC-17": "bg-red-200 text-red-900 border border-red-300",
    "Unrated": "bg-gray-100 text-gray-800 border border-gray-200",
  };
  return `${baseClasses} ${colorClasses[mpaCategory] || colorClasses["Unrated"]}`;
};

export const Years = [
  "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017",
  "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008",
  "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999",
  "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990",
  "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981",
  "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972",
  "1971", "1970", "1969", "1968", "1967", "1966", "1965", "1964", "1963",
  "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954",
  "1953", "1952", "1951", "1950", "1949", "1948", "1947", "1946", "1945",
  "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936",
  "1935", "1934", "1933", "1932", "1931", "1930", "1929", "1928", "1927",
  "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918",
  "1917", "1916", "1915", "1914", "1913", "1912", "1911", "1910", "1909",
  "1908", "1907", "1906", "1905", "1904", "1903", "1902", "1901", "1900"
];

// Define the modern icons first so we can reference its keys in the NavLink type
export const modernIcons = {
  Home: FiHome,
  Movies: FiFilm,
  Watchlist: FiBookmark,
  Likes: FiHeart,
  Profile: FaRegUser,
  Settings: IoSettingsOutline,
  Feeds: FiRss,
  Logout: IoExitOutline,
};

// Legacy icons (keeping this for backward compatibility)
const icons = {
  Home: AiOutlineHome,
  Movies: MdOutlineSubscriptions,
  Watchlist: MdAddToQueue,
  Likes: AiOutlineHeart,
  Profile: AiOutlineUser,
  Settings: AiOutlineSetting,
  Signin: PiSignInBold,
  Feeds: MdOutlineFeed,
};

// Updated categories with proper NavLink typing
export const navCategories: {
  browse: NavLink[];
  library: NavLink[];
  account: NavLink[];
} = {
  browse: [
    { name: "Home", href: "/home", icon: "Home" },
    { name: "Movies", href: "/movies", icon: "Movies" },
    { name: "Feed", href: "/feed", icon: "Feeds" },
  ],  library: [
    { name: "Watchlist", href: "/watchlist", icon: "Watchlist" },
    { name: "Liked", href: "/liked", icon: "Likes" },
  ],  account: [
    { name: "Profile", href: "/profile", icon: "Profile" }, // This will be dynamically set to /${username}
    { name: "Settings", href: "/settings", icon: "Settings" },
  ],
};

// Keep the legacy exports for backward compatibility
export const mainLinks: NavLink[] = [
  { name: "Home", href: "/home", icon: "Home" },
  { name: "Movies", href: "/movies", icon: "Movies" },
  { name: "Watchlist", href: "/watchlist", icon: "Watchlist" }, // Will be dynamically set to /${username}/watchlist
  { name: "Liked", href: "/liked", icon: "Likes" }, // Will be dynamically set to /${username}/liked
  { name: "Feed", href: "/feed", icon: "Feeds" },
];

export const userLinks: NavLink[] = [
  { name: "Profile", href: "/profile", icon: "Profile" }, // Will be dynamically set to /${username}
  { name: "Settings", href: "/settings", icon: "Settings" },
];

// apis endpoints
export const AUTH_URL = "http://cinemate.runasp.net/api/Auth/";

export const IMAGEPOSTER = "https://image.tmdb.org/t/p/original/";

export { icons }; // Export icons for use
