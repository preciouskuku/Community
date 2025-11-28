"use client" // Added as requested

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar" // Assuming Navbar is correctly styled

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Assuming Navbar has a white/light background for the Meetup feel */}
      <Navbar />

      {/* Meetup-style Hero Section - Two-column layout with image on the right */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text and CTAs Column */}
          <div className="md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#004A55] leading-tight"> {/* Meetup uses bold, punchy colors and text */}
              Dive into what you love. <span className="block text-[#ED1C4C]">Connect with community.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0">
              Whatever your interest, from hiking and reading to networking and skill-building, there are thousands of people who share it on Community Portal.
            </p>

            <div className="flex gap-4 flex-col sm:flex-row justify-center md:justify-start pt-4">
              <Link
                href="/auth/login"
                className="px-8 py-4 bg-[#ED1C4C] text-white font-bold rounded-lg shadow-md hover:bg-[#D51842] transition-colors text-lg"
              >
                Sign Up
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-4 border-2 border-[#004A55] text-[#004A55] font-bold rounded-lg hover:bg-[#004A55] hover:text-white transition-colors text-lg"
              >
                Find an Event
              </Link>
            </div>
          </div>

          {/* Image/Illustration Column */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            
            <div className="w-full max-w-md h-72 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-medium border border-gray-300">
              

<img src="/download.jpg" alt="grop of people " />

            </div>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* Feature/Category Section - Focused on what users can do */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#004A55]">
          How Community Portal Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🔎", title: "Find an event", desc: "Browse thousands of community events happening near you." },
            { icon: "🤝", title: "Start a group", desc: "Bring people together to share their passions and ideas." },
            { icon: "✨", title: "Explore topics", desc: "From technology to wellness, find groups on any subject." },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 border border-gray-100 rounded-xl transition-shadow duration-300 hover:shadow-lg">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Optionally add a Footer component here for complete Meetup style */}

    </div>
  )
}