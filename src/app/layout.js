import localFont from "next/font/local";
import "../styles/globals.css";
import "bulma/css/bulma.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Covid19 Dashboard",
  description: "An interactive COVID-19 dashboard that allows users to explore real-time data, including cases, deaths, and recoveries by country. Empowering users with essential information to make informed decisions during the pandemic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
