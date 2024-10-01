import Image from "next/image";
import { Kalam } from "next/font/google";
import Link from 'next/link';

const kalam = Kalam({ weight: "700", subsets: ["latin"] });
//travel agent feature 
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className={`${kalam.className} text-5xl font-bold text-green-800 mb-4`}>
            EcoExplore
          </h1>
          <p className="text-xl text-gray-700">
            AI-powered sustainable travel planning for eco-conscious explorers
          </p>
        </header>

        <div className="flex justify-center mb-12">
          <Link href="/dashboard">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
              Get Started
            </button>
          </Link>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[
            { title: "Personalized Itineraries", icon: "🗺️" },
            { title: "Carbon Footprint Calculator", icon: "🌱" },
            { title: "Local Community Support", icon: "🤝" },
            { title: "Conservation Spotlight", icon: "🦁" },
            { title: "Sustainable Transport", icon: "🚲" },
            { title: "Green Accommodations", icon: "🏡" },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                Experience sustainable travel with our {feature.title.toLowerCase()} feature.
              </p>
            </div>
          ))}
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Coming Soon</h2>
          <p className="text-xl text-gray-700">
            Virtual Reality Previews: Immersive sustainable experience teasers
          </p>
        </section>

        <footer className="text-center text-gray-600">
          <p>© 2024 EcoExplore. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
