import localFont from "next/font/local";
// import "./globals.css";
import RentalBusinessHeader from "@/components/rental_business/RentalBusinessHeader";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Rental Business Appication ",
  description: "Vehicle rental application powered by Nextjs and Django.",
};

export default function RentalBusinessRootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        /> */}
      </head>
      <body>

        {/* <RentalBusinessHeader /> */}
        <main>{children}</main>

      </body>
    </html>
  );
}