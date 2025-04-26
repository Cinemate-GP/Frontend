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

export interface NavLink {
  name: string;
  href: string;
  icon: keyof typeof icons;
}

// geners
export const Geners = [
  
  {
    Id: 0,
    Name: "Adventure",
  },
  {
    Id: 1,
    Name: "Animation",
  },
  {
    Id: 2,
    Name: "Children",
  },
  {
    Id: 3,
    Name: "Comedy",
  },
  {
    Id: 4,
    Name: "Crime",
  },
  {
    Id: 5,
    Name: "Documentary",
  },
  {
    Id: 6,
    Name: "Drama",
  },
  {
    Id: 7,
    Name: "Fantasy",
  },
  {
    Id: 8,
    Name: "Film-Noir",
  },
  {
    Id: 9,
    Name: "Horror",
  },
  {
    Id: 10,
    Name: "Musical",
  },
  {
    Id: 11,
    Name: "Mystery",
  },
  {
    Id: 12,
    Name: "Romance",
  },
  {
    Id: 13,
    Name: "Sci-Fi",
  },
  {
    Id: 14,
    Name: "Thriller",
  },
  {
    Id: 15,
    Name: "War",
  },
  {
    Id: 16,
    Name: "Western",
  },
];

// MPA
export const MPA  = [
  "12", "13+", "16", "16+", "18", "18+",
  "AO", "Atp", "Btl", "C", "E", "EM", "F",
  "G", "GP", "K-13", "K-14", "K-16", "K-8", "M", "M/PG",
  "MA-17", "N/A", "NC-17", "Not Rated", "o.Al.", "Open",
  "PD", "PG", "PG-13", "R", "TV-13", "TV-14",
  "TV-G", "TV-MA", "TV-PG", "TV-Y", "TV-Y7", "TV-Y7-FV",
  "U", "Unrated", "X"
]
;

export const Years = [
  "1874", "1875", "1876", "1877", "1878", "1879", "1880", "1881", "1882", "1883",
  "1884", "1885", "1886", "1887", "1888", "1889", "1890", "1891", "1892", "1893",
  "1894", "1895", "1896", "1897", "1898", "1899", "1900", "1901", "1902", "1903",
  "1904", "1905", "1906", "1907", "1908", "1909", "1910", "1911", "1912", "1913",
  "1914", "1915", "1916", "1917", "1918", "1919", "1920", "1921", "1922", "1923",
  "1924", "1925", "1926", "1927", "1928", "1929", "1930", "1931", "1932", "1933",
  "1934", "1935", "1936", "1937", "1938", "1939", "1940", "1941", "1942", "1943",
  "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953",
  "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963",
  "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973",
  "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983",
  "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993",
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003",
  "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013",
  "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023",
  "2024"
];
;

// Define the available icons
const icons = {
  Home: AiOutlineHome,
  Movies: MdOutlineSubscriptions,
  Watchlist: MdAddToQueue,
  Likes: AiOutlineHeart,
  Profile: AiOutlineUser,
  Settings: AiOutlineSetting,
  Signin: PiSignInBold,
  Feeds: MdOutlineFeed
};

export const mainLinks: NavLink[] = [
  { name: "Home", href: "/pages", icon: "Home" },
  { name: "Movies", href: "/pages/movies", icon: "Movies" },
  { name: "Watchlist", href: "/pages/profile/watchlist", icon: "Watchlist" },
  { name: "Liked", href: "/pages/profile/liked", icon: "Likes" },
  { name: "Feed", href: "/pages/feed", icon: "Feeds" },
];

export const userLinks: NavLink[] = [
  { name: "Profile", href: "/pages/profile", icon: "Profile" },
  { name: "Settings", href: "/pages/settings", icon: "Settings" },
];

// apis endpoints
export const AUTH_URL = "http://cinemate.runasp.net/api/Auth/";


export const IMAGEPOSTER = "https://image.tmdb.org/t/p/original/";

export { icons }; // Export icons for use
