"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { 
  navLinks, trustedPartners, calendlyLink, 
  achievements, clientLogos, 
  faqs, socialMediaLinks, footerLinks,
} from "./constants/homepageData";

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

  // Get search parameters from the URL
  const searchParams = useSearchParams();
  // State to track if the role in query parameter is "affiliate"
  const [isAffiliate, setIsAffiliate] = useState(false);

  useEffect(() => {
    // Retrieve the "role" parameter from the searchParams
    const role = searchParams.get("role");
    // Set isAffiliate to true if "role" is "affiliate"
    setIsAffiliate(role === "affiliate");
  }, [searchParams]); // Run effect whenever searchParams changes

  const [faqActiveIndex, setFaqActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (faqActiveIndex === index) {
      setFaqActiveIndex(null);
    } else {
      setFaqActiveIndex(index);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // ============= BEGIN CLIENT LOGO MANAGEMENT =============
  const SCROLL_INTERVAL = 10;
  const SCROLL_SPEED = 1;
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  
  useEffect(() => {
    const scrollElement = scrollRef.current;
    let scrollAmount = 0;
  
    // Set up interval to scroll the element
    const scrollInterval = setInterval(() => {
      if (scrollElement) {
        // Increment the scroll position by the defined scroll speed
        scrollElement.scrollLeft += SCROLL_SPEED;
        scrollAmount += SCROLL_SPEED;
  
        // Get the middle position of the scroll (to identify which logo is in the center)
        const middlePosition = scrollElement.scrollLeft + scrollElement.clientWidth / 2;
  
        // Calculate the width of each logo (including the duplicated logos for continuous scrolling)
        const logoWidth = scrollElement.scrollWidth / (clientLogos.length * 2);
  
        // Determine which logo is currently in the middle of the screen
        const currentIndex = Math.floor(middlePosition / logoWidth) % clientLogos.length;
  
        // Set the active dot (index) to reflect the current logo in the middle
        setActiveDot(currentIndex);
  
        // Reset the scroll to the beginning when it reaches the end
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, SCROLL_INTERVAL);
  
    // Clean up the interval on component unmount or update
    return () => clearInterval(scrollInterval);
  }, []);  
  // ============= END CLIENT LOGO MANAGEMENT =============

  const LaunchAppButton: React.FC = () => (
    <Link
      href="/onboarding"
      className="font-bold md:text-xl bg-lime-300 hover:bg-lime-100 py-2 px-8 rounded-md text-black"
    >
      Launch App
    </Link>
  );

  return (
    <div className="flex flex-col bg-black text-white">
      <Head>
        <title>Qube</title>
        <link rel="icon" href="/qube.png" />
      </Head>

      {/* Navbar */}
      <header className="fixed w-full pt-5 pb-2 z-10 bg-black">
        <div className="w-full lg:w-11/12 px-5 lg:px-0 flex flex-row justify-between items-center mx-auto">
          {/* Qube Icon Image */}
          <Link
            href="#"
            className="flex flex-row items-center gap-3 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <Image
              src="/qube.png"
              alt="qube.png"
              width={35}
              height={35}
            />
            <p className="text-3xl font-semibold font-corporate">Qube</p>
          </Link>

          {/* Menu Items */}
          <div className="hidden lg:flex flex-row items-center gap-4 xl:gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.id}
                className="hover:text-gray-500"
              >
                {link.label}
              </Link>
            ))}
            {/* Conditionally render an additional link based on isAffiliate */}
            <Link 
              href={isAffiliate ? BASE_URL : `${BASE_URL}?role=affiliate`}
              className="hover:text-gray-500"
            >
              {isAffiliate ? "Publisher" : "KOL/Guild"}
            </Link>
          </div>

          {/* Launch Button */}
          <div className="hidden lg:block">
            <LaunchAppButton />
          </div>

          {/* Menu Toggle Icon */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <Image
                src={menuOpen 
                  ? "/assets/common/close-white.png" 
                  : "/assets/common/menu-white.png"
                }
                alt="Menu Toggle Icon"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>

        {/* Toggle Menu */}
        {menuOpen && (
          <div className="lg:hidden pt-4">
            <nav className="flex flex-col p-5 border-t border-gray-200">
              {navLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.id} 
                  className="py-2 hover:text-gray-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Conditionally render an additional link based on isAffiliate in mobile view */}
              <Link 
                href={isAffiliate ? BASE_URL : `${BASE_URL}?role=affiliate`}
                className="py-2 hover:text-gray-500"
                onClick={() => setMenuOpen(false)}
              >
                {isAffiliate ? "Publisher" : "KOL/Guild"}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex flex-col">

        {/* Home */}
        <section id="#" className="mb-14 md:mb-24 pt-28 md:pt-52 px-10 lg:px-0 h-[600px] md:h-screen flex flex-col items-center justify-between">
          {/* Intro Text */}
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold mb-6 md:mb-10 relative">
              <span className="relative inline-block">
                {isAffiliate ? "Ready to Amplify" : "Drive Acquisition,"}
                {/* Underline Image */}
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-[-5px] w-[200px] md:w-[400px]">
                  <img
                    src="/assets/homepage/blue-stylized-underline.png"
                    alt="Stylized Underline"
                    className="w-full"
                  />
                </div>
              </span>
              {isAffiliate ? " Your Influence ?" : " Amplify Revenue"}
            </h1>
            <h2 className="text-lg md:text-3xl mb-5">
              {isAffiliate
                ? "Elevate your influence and connect with impactful audiences"
                : "Ready to Grow with a Network that Rewards Results?"
              }
            </h2>
            <p className="text-md md:text-xl">
              {isAffiliate
                ? "Collaborate with Qube to access a powerful network for gaming brands."
                : "Our network connects you with gaming influencers and guilds across Asia,"
              }
              <br className="hidden md:block" />
              <span className="ml-1 md:ml-0">
                {isAffiliate
                  ? "Amplify your reach and strengthen your presence in the Web3 world."
                  : "enabling large-scale audience reach and conversion."
                }
              </span>
            </p>
          </div>
          {/* Launch Button */}
          <div className="my-16">
            <LaunchAppButton />
          </div>
          {/* Trusted Partners */}
          <div className="pb-10 md:pb-48 border-b border-gray-700 w-full lg:w-11/12">
            <p className="text-xl md:text-3xl text-center mb-4">Trusted By</p>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-10">
              {trustedPartners.map((partner, index) => (
                <div key={index} className="flex items-center space-x-2 md:space-x-4">
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="w-8 md:w-12 h-8 md:h-12 rounded-full"
                  />
                  <span className="font-semibold">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About 1 */}
        <section id="about" className="pt-40 pb-10 lg:py-28 px-10 lg:px-0 lg:w-11/12 lg:mx-auto flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* Text */}
          <div className="flex-1 text-center lg:text-start">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-5 lg:mb-10">
              {isAffiliate ? "Connect with " : "Build Partnerships"}
              <br className="hidden lg:block" />
              {!isAffiliate && (
                <>
                  <span className="mx-2 lg:mx-0">that</span>
                  <br className="hidden lg:block" />
                </>
              )}
              {isAffiliate ? "the top web3 games" : "Amplify your reach"}
            </h1>
            <p className="text-md md:text-xl">
              {isAffiliate
                ? "Get an opportunity to work with the best games in this industry now."
                : "Identify the best KOL/Guild/Community with audiences aligned to enhance your game growth."
              }
            </p>
          </div>
          {/* Image */}
          <Image
            src={`/assets/homepage/image-${isAffiliate ? "4" : "1"}.png`}
            alt={`Image ${isAffiliate ? "4" : "1"}`}
            width={600}
            height={600}
            quality={100}
            className="flex-1 w-full h-auto object-cover"
          />
        </section>

        {/* About 2 */}
        <section className="py-10 px-10 lg:px-0 lg:w-11/12 lg:mx-auto flex flex-col gap-7 lg:gap-0 lg:flex-row-reverse lg:items-center">
          {/* Text */}
          <div className="flex-1 text-center lg:text-start">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-5 lg:mb-10">
              {isAffiliate
                ? "Turn your influence "
                : "Pay Only for "
              }
              <br className="hidden lg:block" />
              {isAffiliate
                ? "into revenue"
                : "Measurable Results"
              }
            </h1>
            <p className="text-md md:text-xl">
              {isAffiliate
                ? "Have you built a thriving community without knowing how to generate income? We're here to support you!"
                : "Benefit from a performance-based model where you only pay for successful conversions and measurable outcomes."
              }
            </p>
          </div>
          {/* Image */}
          <Image
            src={`/assets/homepage/image-${isAffiliate ? "5" : "2"}.png`}
            alt={`Image ${isAffiliate ? "5" : "2"}`}
            width={600}
            height={600}
            quality={100}
            className="flex-1 w-full h-auto object-cover"
          />
        </section>

        {/* About 3 */}
        <section className="py-10 px-10 lg:px-0 lg:w-11/12 lg:mx-auto flex flex-col gap-7 lg:gap-0 lg:flex-row lg:items-center">
          {/* Text */}
          <div className="flex-1 text-center lg:text-start">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-5 lg:mb-10">
              {isAffiliate
                ? "Track Your Impact "
                : "Access Campaign "
              }
              <br className="hidden lg:block" />
              {isAffiliate
                ? "with Qube Analytics"
                : "Analytics & Reporting"
              }
            </h1>
            <p className="text-md md:text-xl">
              {isAffiliate
                ? "Track engagement, reach, and conversions to measure success and optimize future strategies. Make data-driven decisions to maximize your community's impact."
                : "Identify best KOL/Guild/Community with audiences aligned to enhance your game growth."
              }
            </p>
          </div>
          {/* Image */}
          <Image
            src={`/assets/homepage/image-${isAffiliate ? "6" : "3"}.png`}
            alt={`Image ${isAffiliate ? "6" : "3"}`}
            width={600}
            height={600}
            quality={100}
            className="flex-1 w-full h-auto object-cover"
          />
        </section>

        {/* Achievements */}
        <section id="achievements" className="pt-28 pb-20 px-10 lg:px-0 lg:w-11/12 lg:mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-5 lg:mb-10">Achievements</h1>
          {/* Achievement Cards */}
          <div className="flex flex-col lg:flex-row gap-12 px-5 py-14 rounded-lg justify-around bg-lime-400 text-black font-bold text-lg md:text-3xl">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-lg py-5 lg:px-5 xl:px-10 flex-1">
                <p className="mb-5">{achievement.count}</p>
                <p>{achievement.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Clients */}
        <section id="clients" className="pt-28 pb-20">
          <h1 className="text-2xl md:text-5xl font-bold mb-5 lg:mb-10 text-center">Our Clients</h1>
          {/* Client Logo Auto Scroll */}
          <div className="overflow-x-auto" ref={scrollRef}>
            <div className="flex items-center justify-start space-x-6 px-6">
              {clientLogos.concat(clientLogos).map((logo, index) => (
                <div key={index} className="p-4 flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Dots Indicator */}
          <div className="flex justify-center items-center mt-4">
            {clientLogos.map((_, index) => (
              <div
                key={index}
                className={`rounded-full mx-2 ${
                  activeDot === index ? "bg-lime-300 h-5 w-5" : "bg-gray-400 h-3 w-3"
                }`}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="pt-28 pb-20 w-11/12 lg:w-2/3 mx-auto">
          {/* Toggle Title */}
          <h1 className="text-2xl md:text-5xl font-bold mb-5 lg:mb-10 text-center">
            <span className="block md:hidden">FAQ</span>
            <span className="hidden md:block">Frequently Asked Questions</span>
          </h1>
          {/* Q&As */}
          <div className="p-10 md:px-20">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-5">
                <div
                  className="cursor-pointer text-md lg:text-lg xl:text-2xl flex flex-row justify-between font-semibold"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <div className="w-5 md:w-7 h-5 md:h-7 md:p-1 bg-white rounded-full">
                    <Image
                      src={faqActiveIndex === index 
                        ? "/assets/common/arrow-upward-black.png" 
                        : "/assets/common/arrow-downward-black.png"
                      }
                      alt="up/down arrow"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                {faqActiveIndex === index && (
                  <p className="text-md mr-8 mb-3">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us */}
        <section className="md:hidden w-11/12 mx-auto rounded-md text-center font-bold text-3xl bg-lime-300 text-black p-10">
          <p>Let&apos;s grab some<br />time and explore!</p>
          <Link href={calendlyLink} target="_blank">
            <button className="text-white text-xl bg-black rounded-lg shadow-md w-full py-4 mt-10">
              Contact Us
            </button>
          </Link>
        </section>

      </main>

      <footer className="w-11/12 mx-auto mt-20">
        {/* Footer Contents */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 mb-16">
          {/* Logo & Social Links */}
          <div className="lg:w-1/2 flex flex-col gap-5">
            <Link
              href="#"
              className="flex flex-row items-center gap-3 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Image
                src="/qube.png"
                alt="qube.png"
                width={35}
                height={35}
              />
              <p className="text-3xl font-bold font-corporate">Qube</p>
            </Link>
            <div className="flex flex-row gap-5">
              {socialMediaLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  className="bg-white hover:bg-slate-200 rounded-full inline-flex justify-center items-center h-7 w-7 p-2 hover:shadow-xl"
                >
                  <Image
                    src={link.src}
                    alt={link.alt}
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
            <p>The strongest growth driver for your<br />game.<br />Launch Campaign and Acquire<br />targeted users.</p>
          </div>
          {/* Other Links */}
          <div className="flex flex-row gap-10 md:gap-16 lg:gap-28">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-5">
                <h3 className="font-bold text-lime-300 text-xl">{category}</h3>
                {links.map(link => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    className="hover:text-slate-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Border & Copyright */}
        <div className="border-b border-gray-700" />
        <p className="text-center text-gray-500 py-10 text-sm md:text-md lg:text-lg">
          © Copyright 2024, All Rights Reserved by Ceed Inc.
        </p>
      </footer>

    </div>
  );
}