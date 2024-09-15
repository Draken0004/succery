"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  navLinks, trustedPartners, features, stats, logos, 
  faqs, socialMediaLinks, footerLinks 
} from "./constants/homepageData";

export default function Home() {
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

  const StatsAndLink: React.FC = () => (
    <div className="flex flex-col gap-2 mt-10">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-2">
          <Image src="/about-1.png" alt="About Image 1" width={50} height={50} />
          <div>
            <p className="font-bold">200,000+</p>
            <p>Max User Achieved</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Image src="/about-2.png" alt="About Image 2" width={50} height={50} />
          <div>
            <p className="font-bold">7+</p>
            <p>Regions</p>          
          </div>
        </div>
      </div>
      <Link href="/onboarding" className="text-xl font-bold shadow-md bg-lime-300 hover:bg-lime-100 py-2 px-4 mt-5 rounded-md text-black mr-auto">
        Book Demo
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col">
      <Head>
        <title>Qube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed w-full bg-black text-white pt-5 pb-2">
        <div className="w-full lg:w-2/3 px-5 lg:px-0 flex flex-row justify-between items-center mx-auto">
          <Link href="#" className="flex flex-row items-center gap-3 transition duration-300 ease-in-out transform hover:-translate-y-1">
            <Image src="/qube.png" alt="qube.png" width={50} height={50} />
            <p className="text-lg font-semibold">Qube</p>
          </Link>

          <div className="hidden md:flex flex-row items-center gap-4 xl:gap-10">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.id} className="hover:text-gray-500">{link.label}</Link>
            ))}
          </div>
          
          <Link href="/onboarding" className="hidden md:block font-bold bg-lime-300 hover:bg-lime-100 py-2 px-4 rounded-md text-black">
            Launch App
          </Link>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="bg-white p-2 rounded-md focus:outline-none">
              <Image src={menuOpen ? "/close.png" : "/hamburger.png"} alt="Menu Toggle Icon" width={20} height={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pt-4">
            <nav className="flex flex-col px-5 py-5 border-t border-gray-200">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.id} className="py-2 hover:text-gray-500">{link.label}</Link>
              ))}
              <div className="border-t border-gray-300 my-4" />
              <Link href="/onboarding" className="text-center font-bold bg-lime-300 hover:bg-lime-100 py-2 px-4 rounded-md text-black">
                Launch App
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex flex-col bg-black text-white">

        {/* Home */}
        <section id="#" className="pt-20 px-10 md:pt-52 h-[600px] md:h-screen flex flex-col items-center justify-between">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold mb-6 md:mb-10">Drive Acquisition, Amplify Revenue</h1>
            <h2 className="text-lg md:text-3xl font-semibold mb-2">The Premier Web3 Affiliate Network for Gaming in Asia</h2>
            <p className="text-md md:text-xl">
              Our network connects you with gaming influencers and guilds across Asia,
              <br />
              enabling large-scale audience reach and conversion.
            </p>
          </div>
          <Link href="/onboarding" className="text-xl font-bold shadow-md bg-lime-300 hover:bg-lime-100 py-2 px-4 my-5 md:mb-40 rounded-md text-black">
            Launch App
          </Link>
          <div className="pb-20 border-b border-gray-700 w-full lg:w-2/3">
            <p className="text-xl md:text-3xl font-semibold text-center mb-4">Trusted By</p>
            <div className="flex flex-wrap justify-center gap-6">
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

        {/* About */}
        <section id="about" className="mt-10 py-20 px-10 md:px-20 flex flex-col lg:flex-row">
          <div className="mr-10 md:mr-20 xl:mr-52 pb-5 lg:pb-0">
            <h1 className="text-2xl md:text-5xl font-bold mb-5 lg:mb-10">More than just a tool type of product</h1>
            <p className="text-md md:text-xl">Our expertises will help you launch an unique campaign made only for your game and achieve regional, segmented user acquisition and drive your growth.</p>
            <div className="hidden lg:flex">
              <StatsAndLink />
            </div>
          </div>
          <div className="flex justify-center items-start w-[300px] sm:w-[500px] md:w-[600px] lg:w-[1000px] mx-auto">
            <Image
              src="/ua-number-screen.png"
              alt="UA Number Screen"
              width={500} 
              height={500} 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="lg:hidden">
            <StatsAndLink />
          </div>
        </section>

        {/* Users' Voices */}
        <section id="voices" className="bg-purple-600 text-white py-20 px-10 md:px-20">
          <p className="text-md text-center mb-20">We&apos;re in a good company</p>
          <div className="flex flex-row flex-wrap gap-10 justify-center">
            {logos.map((logo, index) => (
              <Image key={index} src={logo} alt={logo} width={120} height={120} />
            ))}
          </div>
        </section>

        {/* Number of Affiliates */}
        <section id="partners" className="py-20 px-10 md:px-20">
          <h1 className="text-xl md:text-3xl font-bold mb-10">Number of Affiliates</h1>
          <div className="flex flex-col gap-10 items-center">
            <h2 className="text-lg md:text-2xl font-semibold">A powerful network to support your project</h2>
            <p className="text-md md:text-xl">We&apos;re building an amazing network of affiliates to promote your game.</p>
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-slate-50">
              {stats.map((stat, index) => (
                <>
                  {index !== 0 && (
                    <div className="border-l border-2 border-gray-200 min-h-full" />
                  )}
                  <div className="flex flex-col gap-3 py-5 md:py-10 px-10 md:px-20 items-center">
                    <h3 className="text-4xl font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-sky-500">
                        {stat.value}
                      </span>
                    </h3>
                    <p className="text-md font-semibold text-slate-500">{stat.label}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-purple-600 text-white py-20 px-10 md:px-20 mb-10">
          <h1 className="text-xl md:text-3xl font-bold mb-10">FAQ</h1>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-5">
              <div
                className="cursor-pointer text-md lg:text-lg xl:text-xl flex flex-row justify-between font-semibold"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <div className="w-5 h-5">
                  <Image src={faqActiveIndex === index ? "/up-arrow.png" : "/down-arrow.png"} alt="arrow" width={20} height={20} />
                </div>
              </div>
              {faqActiveIndex === index && (
                <p className="text-md mr-8 mb-3">{faq.answer}</p>
              )}
            </div>
          ))}
        </section>

      </main>

      <footer className="bg-purple-600 grid grid-cols-1 lg:grid-cols-4 gap-5 py-20 px-10 md:px-20">
        <div className="lg:col-span-2 flex flex-col items-center gap-3">
          <Link href="#" className="flex flex-row items-center gap-3 transition duration-300 ease-in-out transform hover:-translate-y-1">
            <Image src="/qube.png" alt="qube.png" width={100} height={100} />
            <p className="text-2xl font-bold">Qube</p>
          </Link>
          <div className="flex flex-row gap-5">
            {socialMediaLinks.map((link, index) => (
              <Link key={index} href={link.url} target="_blank" className="bg-white hover:bg-slate-200 p-3 rounded-full inline-flex justify-center items-center h-14 w-14 hover:shadow-xl">
                <Image src={link.src} alt={link.alt} width={30} height={30} />
              </Link>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="flex flex-col items-center lg:items-start gap-5 text-slate-300">
            <h3 className="font-bold text-white text-xl">{category}</h3>
            {links.map(link => (
              <Link key={link.label} href={link.url} target="_blank" className="hover:text-slate-100 hover:font-semibold">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </footer>
    </div>
  );
}