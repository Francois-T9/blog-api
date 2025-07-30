import githubImage from "../assets/github.svg";
import linkedinImage from "../assets/linkedin.svg";
import emailImage from "../assets/email.svg";

export default function Footer() {
  return (
    <div className="footer  bg-gray-200 p-5  flex justify-between">
      <div className="links flex gap-2  ">
        <a href="https://github.com/Francois-T9" target="_blank">
          <img
            className="w-8 h-8 hover:opacity-75 transition"
            src={githubImage}
            alt=""
          />
        </a>
        <a
          href="https://www.linkedin.com/in/francois-thullier/"
          target="_blank"
        >
          <img
            className="w-8 h-8 hover:opacity-75 transition"
            src={linkedinImage}
            alt=""
          />
        </a>
        <a href="mailto:francois.thullier98@gmail.com" target="_blank">
          <img
            className="w-8 h-8 hover:opacity-75 transition"
            src={emailImage}
            alt=""
          />
        </a>
      </div>
      <p>Francois Thullier 2025</p>
    </div>
  );
}
