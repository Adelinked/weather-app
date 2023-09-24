import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  preload: true,
});

export const Footer = () => {
  return (
    <footer
      className={`text-sm mt-[96px] md:mt-[113px] text-gray3 flex justify-center pb-6 ${montserrat.className}`}
    >
      created by &nbsp;
      <a
        href="https://adelinked.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-gray3 font-bold"
      >
        Adelinked
      </a>
      &nbsp;-&nbsp;
      <a
        href="https://devchallenges.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        devChallenges.io
      </a>
    </footer>
  );
};
