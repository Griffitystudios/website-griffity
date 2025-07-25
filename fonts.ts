import { Poppins } from "next/font/google";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const fortune = localFont({
  src: "./public/font/Daughter_of_Fortune.ttf",
  style: "normal",
  display: "swap",
});
