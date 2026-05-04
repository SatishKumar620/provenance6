import "./styles/globals.css";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ClubsGrid from "./components/ClubsGrid.jsx";
import EventPool from "./components/EventPool.jsx";
import Glimpses from "./components/Glimpses.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClubsGrid />
        <EventPool />
        <Glimpses />
      </main>
      <Footer />
    </>
  );
}
