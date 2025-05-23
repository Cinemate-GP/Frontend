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
  { Id: 1, Name: "Comedy" },
  { Id: 2, Name: "Drama" },
  { Id: 3, Name: "Adventure" },
  { Id: 4, Name: "Romance" },
  { Id: 5, Name: "Sci-Fi" },
  { Id: 6, Name: "Horror" },
  { Id: 7, Name: "Thriller" },
  { Id: 8, Name: "Animation" },
  { Id: 9, Name: "Fantasy" },
  { Id: 10, Name: "Mystery" },
  { Id: 11, Name: "Crime" },
  { Id: 12, Name: "Documentary" },
];

// MPA
export const MPA = [
  "G", // General Audiences
  "TV-Y", // All Children
  "TV-Y7", // Older Children
  "TV-Y7-FV", // Fantasy Violence
  "PG", // Parental Guidance
  "TV-G", // General Audience (TV)
  "TV-PG", // Parental Guidance (TV)
  "PG-13", // Parents Strongly Cautioned
  "TV-13", // Some programs may be inappropriate
  "TV-14", // Parents Strongly Cautioned (TV)
  "R", // Restricted
  "M", // Mature (older term)
  "MA-17", // Mature Audiences
  "TV-MA", // Mature Audience Only
  "NC-17", // No One 17 and Under Admitted
  "X", // Adults Only
  "Unrated", // No official rating
  "Not Rated", // Alternate form
  "N/A", // Not Available
];

export const Years = [
  "1874",
  "1875",
  "1876",
  "1877",
  "1878",
  "1879",
  "1880",
  "1881",
  "1882",
  "1883",
  "1884",
  "1885",
  "1886",
  "1887",
  "1888",
  "1889",
  "1890",
  "1891",
  "1892",
  "1893",
  "1894",
  "1895",
  "1896",
  "1897",
  "1898",
  "1899",
  "1900",
  "1901",
  "1902",
  "1903",
  "1904",
  "1905",
  "1906",
  "1907",
  "1908",
  "1909",
  "1910",
  "1911",
  "1912",
  "1913",
  "1914",
  "1915",
  "1916",
  "1917",
  "1918",
  "1919",
  "1920",
  "1921",
  "1922",
  "1923",
  "1924",
  "1925",
  "1926",
  "1927",
  "1928",
  "1929",
  "1930",
  "1931",
  "1932",
  "1933",
  "1934",
  "1935",
  "1936",
  "1937",
  "1938",
  "1939",
  "1940",
  "1941",
  "1942",
  "1943",
  "1944",
  "1945",
  "1946",
  "1947",
  "1948",
  "1949",
  "1950",
  "1951",
  "1952",
  "1953",
  "1954",
  "1955",
  "1956",
  "1957",
  "1958",
  "1959",
  "1960",
  "1961",
  "1962",
  "1963",
  "1964",
  "1965",
  "1966",
  "1967",
  "1968",
  "1969",
  "1970",
  "1971",
  "1972",
  "1973",
  "1974",
  "1975",
  "1976",
  "1977",
  "1978",
  "1979",
  "1980",
  "1981",
  "1982",
  "1983",
  "1984",
  "1985",
  "1986",
  "1987",
  "1988",
  "1989",
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
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
  ],
  library: [
    { name: "Watchlist", href: "/profile/watchlist", icon: "Watchlist" },
    { name: "Liked", href: "/profile/liked", icon: "Likes" },
  ],
  account: [
    { name: "Profile", href: "/profile", icon: "Profile" },
    { name: "Settings", href: "/settings", icon: "Settings" },
  ],
};

// Keep the legacy exports for backward compatibility
export const mainLinks: NavLink[] = [
  { name: "Home", href: "/home", icon: "Home" },
  { name: "Movies", href: "/movies", icon: "Movies" },
  { name: "Watchlist", href: "/profile/watchlist", icon: "Watchlist" },
  { name: "Liked", href: "/profile/liked", icon: "Likes" },
  { name: "Feed", href: "/feed", icon: "Feeds" },
];

export const userLinks: NavLink[] = [
  { name: "Profile", href: "/profile", icon: "Profile" },
  { name: "Settings", href: "/settings", icon: "Settings" },
];

// apis endpoints
export const AUTH_URL = "http://cinemate.runasp.net/api/Auth/";

export const IMAGEPOSTER = "https://image.tmdb.org/t/p/original/";

export { icons }; // Export icons for use
