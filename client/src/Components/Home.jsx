import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Home() {
  return (
    <div className=" w-full h-full  flex flex-col ">
      <Header />
      <div className="h-full p-3">
        <h1>HomePage</h1>
        {/* if login say hello to username */}
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
          dignissimos eveniet inventore sed explicabo sunt laborum veniam
          eligendi illo velit impedit dolorum, ab, nihil ratione voluptate porro
          maxime dolorem nostrum et dolor temporibus exercitationem, pariatur
          iste. Alias, et. Sunt magnam laudantium iure similique, fugit fuga
          delectus atque impedit ipsa eaque?
        </p>
      </div>
      <Footer />
    </div>
  );
}
