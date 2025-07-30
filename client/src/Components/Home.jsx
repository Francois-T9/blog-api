import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import User from "./User.jsx";

export default function Home() {
  return (
    <div data-theme="light" className="home w-full h-full  flex flex-col ">
      <Header />
      <User />

      <Footer />
    </div>
  );
}
