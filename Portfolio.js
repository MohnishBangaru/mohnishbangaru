import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Hi!", "About", "Experience", "Projects", "Get in touch!"];

const Typing = ({ text, speed = 75 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (i < text.length) {
          const next = text.substring(0, i + 1);
          i++;
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);
    return () => {
      clearInterval(interval);
    };
  }, [text, speed]);
  return (
    <span className="relative">
      {displayedText}
      <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/10 blur-md animate-pulse"></span>
    </span>
  );
};

const borderPhases = ["top", "right", "bottom", "left"];

export default function Home() {
  const sectionRefs = useRef({});
  const [activeTab, setActiveTab] = useState("Hi!");
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      for (const tab of tabs) {
        const section = document.getElementById(tab);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
          const sectionTop = window.scrollY + top;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
            setActiveTab(tab);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setPhase((prev) => {
          if (prev >= borderPhases.length - 1) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const glow = document.getElementById("cursor-glow");
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.075), transparent 80%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div id="cursor-glow" className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0 transition duration-100"></div>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#aec6cf] via-[#fce1e4] to-[#fcd5ce]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative w-20 h-20 flex items-center justify-center"
            >
              <span className="text-black font-bold z-10">MB</span>
              <div className="absolute w-full h-full">
                <motion.div className="absolute top-0 left-0 h-1.5 bg-white" initial={{ width: 0 }} animate={phase >= 0 ? { width: "100%" } : {}} transition={{ duration: 0.5, ease: "easeInOut" }} />
                <motion.div className="absolute top-0 right-0 w-1.5 bg-white" initial={{ height: 0 }} animate={phase >= 1 ? { height: "100%" } : {}} transition={{ duration: 0.5, ease: "easeInOut" }} />
                <motion.div className="absolute bottom-0 right-0 h-1.5 bg-white" initial={{ width: 0 }} animate={phase >= 2 ? { width: "100%" } : {}} transition={{ duration: 0.5, ease: "easeInOut" }} />
                <motion.div className="absolute bottom-0 left-0 w-1.5 bg-white" initial={{ height: 0 }} animate={phase >= 3 ? { height: "100%" } : {}} transition={{ duration: 0.5, ease: "easeInOut" }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.main className="min-h-screen bg-gradient-to-br from-[#aec6cf] via-[#fce1e4] to-[#fcd5ce] text-white px-8 py-12 font-sans">
          <header className="sticky top-0 z-50 flex justify-between items-center mb-14 bg-neutral-900/80 backdrop-blur-lg px-8 py-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => document.getElementById("Hi!")?.scrollIntoView({ behavior: 'smooth' })} className="text-neutral-100 font-bold text-lg w-10 h-10 flex items-center justify-center border border-neutral-500 hover:opacity-80 transition">MB</button>
              <button onClick={() => document.getElementById("Home")?.scrollIntoView({ behavior: 'smooth' })} className="text-lg font-semibold tracking-widest text-neutral-300 hover:opacity-80 transition">
                mohnishbangaru.com
              </button>
            </div>
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' })}
                  className={`text-sm font-medium uppercase tracking-wide transition duration-300 hover:text-neutral-100 ${activeTab === tab ? "text-neutral-100 underline underline-offset-4" : "text-neutral-400"}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </header>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {tabs.map((tab) => (
              <section key={tab} id={tab} className="min-h-screen py-20">
                <div className="text-neutral-300 w-full max-w-[90rem] bg-black/60 p-6 rounded-2xl mx-auto">
  {tab !== "Hi!" && <h2 className="text-3xl font-bold mb-6">{tab}</h2>}
                  {tab === "Hi!" && (
  <div className="flex flex-col lg:flex-row gap-10 items-start">
  <div className="flex-1 space-y-6 text-base md:text-lg text-neutral-300">
    <p className="text-2xl md:text-3xl font-bold"><Typing text="Hi! I'm Mohnish Bangaru." speed={40} /></p>
    <p className="text-lg md:text-xl">I'm someone who thrives at the intersection of technology, creativity, and curiosity. My academic focus is rooted in applied machine learning, where I've worked on everything from optimizing deep learning models for edge deployment to developing vision-language systems for healthcare. But what excites me just as much is the broader canvas—how we can design systems that not only work well but feel intuitive and impactful. Outside the lab, you'll find me with a guitar, camera, or basketball—exploring ways to stay expressive, balanced, and always learning.</p>
    <p>Beyond academics, I find creativity and balance through music, photography, and the occasional pickup basketball game. Whether it's jamming on my electric guitar or exploring a new part of the city, I love staying curious and expressive.</p>
    <p>This site is a reflection of both sides of who I am—technically driven and creatively curious. Thanks for stopping by!</p>
  </div>
  <div className="flex-shrink-0 w-full max-w-xs lg:max-w-sm rounded-xl overflow-hidden">
    <div className="relative group">
  <img src="/mnt/data/IMG_5672.jpeg" alt="Mohnish Bangaru" className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105" />
  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    Nature-powered mindset 🌲
  </div>
</div>
  </div>
</div>
)}
                  {tab === "About" && (
  <div className="space-y-4 text-base md:text-lg">
    <p>
      I’m currently pursuing my Master’s in Computer Engineering at NYU’s Tandon School of Engineering, where my focus lies in applied machine learning, deep learning optimization, and computer vision. My academic work has explored areas like quantization-aware training, large language model fine-tuning, and human-AI collaboration across various domains.
    </p>
    <p>
      Prior to grad school, I worked at KPMG as a Data Scientist, where I developed end-to-end pipelines for anomaly detection, ETL automation, and real-time reporting in financial services. My journey has always been driven by curiosity—whether it’s improving model performance or making ML solutions more efficient and deployable.
    </p>
    <p>
      I enjoy building intelligent systems that not only work well in the lab but also scale in the real world. I’m excited by cross-disciplinary challenges and thrive in roles where experimentation, iteration, and impact converge.
    </p>
  </div>
)}
                  {tab === "Experience" && (
  <div className="space-y-6">
    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
      <p className="font-semibold text-white">Graduate Student Data Scientist – New York University (Sep 2023 – Present)</p>
      <ul className="list-disc pl-6 text-sm text-neutral-400 mt-2">
        <li>Built ETL pipelines for 30,000+ survey strengths, reducing processing time by 50%.</li>
        <li>Applied NLP techniques to analyze open-ended text responses on surveys, improving student feedback quality with 25% information gain.</li>
        <li>Designed ML models and Tableau dashboards for what-if simulations related to institute performance.</li>
        <li>Reduced deployment bottlenecks by 60% by implementing Dockerized ML pipelines for A/B testing.</li>
        <li>Initiated onboarding for new hires in ML best practices, SOPs, and the tech stack.</li>
      </ul>
    </div>
    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
      <p className="font-semibold text-white">Data Scientist – KPMG (Apr 2022 – May 2023)</p>
      <ul className="list-disc pl-6 text-sm text-neutral-400 mt-2">
        <li>Directed automation of reporting workflows with Python & ML, saving 264+ hours annually.</li>
        <li>Led a team of 3 to enhance anomaly detection in trading reports, reducing false positives by 40%.</li>
      </ul>
    </div>
    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
      <p className="font-semibold text-white">Analyst – KPMG (Jan 2021 – Apr 2022)</p>
      <ul className="list-disc pl-6 text-sm text-neutral-400 mt-2">
        <li>Revamped SQL queries for real-time data access, improving execution time by 30%.</li>
        <li>Implemented REST APIs to automate deployment, increasing model deployment frequency by 15%.</li>
      </ul>
    </div>
  </div>
)}
                  {tab === "Projects" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Efficient Deep Learning for Edge Deployment</h3>
                        <p className="text-sm text-neutral-400">Trimmed ResNet-50 with quantization-aware training and residual connections. Reduced model size by 50%, memory usage by 65%, and achieved 10× faster inference.</p>
                        <p className="mt-2 text-xs text-neutral-500">Skills: Parameter Reduction · Quantization · Efficient ML</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Medical Expert Question-Answering Model</h3>
                        <p className="text-sm text-neutral-400">Trained a vision-language transformer on 5,000 MIMIC-CXR scans and reports. Achieved 96% diagnostic QA accuracy.</p>
                        <p className="mt-2 text-xs text-neutral-500">Skills: Multimodal fine-tuning · LLMOps · Vision-Language Models</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Fine-tuning LLMs using QLoRA</h3>
                        <p className="text-sm text-neutral-400">Fine-tuned Pythia 6.9B and 12B with Alpaca using QLoRA. Explored performance impact of various LoRA ranks.</p>
                        <p className="mt-2 text-xs text-neutral-500">Skills: Deep Learning · Fine-Tuning LLMs · Experimentation</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Impala Chatbot</h3>
                        <p className="text-sm text-neutral-400">Developed a customizable chatbot framework for general-purpose conversations and user adaptation.</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Voice Automation for YouTube</h3>
                        <p className="text-sm text-neutral-400">Automated YouTube searches and playback with a Python-based voice assistant.</p>
                        <p className="mt-2 text-xs text-neutral-500">Skills: Python</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Visual COVID Dashboard</h3>
                        <p className="text-sm text-neutral-400">Built a real-time R-based dashboard for COVID-19 data visualization using geospatial and temporal insights.</p>
                        <p className="mt-2 text-xs text-neutral-500">Skills: R Programming</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Stock Market Prediction</h3>
                        <p className="text-sm text-neutral-400">Analyzed S&P 500 time-series data to forecast market trends using statistical models.</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Exoplanet Hunting</h3>
                        <p className="text-sm text-neutral-400">Used Kepler time-series data and transit method to identify exoplanet signatures.</p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
                        <h3 className="text-xl font-semibold mb-2">Automated Pothole Detection</h3>
                        <p className="text-sm text-neutral-400">Designed a CV pipeline to detect potholes in road imagery for smart city systems.</p>
                      </div>
                    </div>
                  )}
                  
                  {tab === "Get in touch!" && (
  <div className="text-base md:text-lg space-y-4">
    
    <div className="flex space-x-6 mt-4">
      <a href="mailto:mohnishbangaru@nyu.edu" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-6 h-6 hover:scale-110 transition-transform" />
      </a>
      <a href="https://github.com/mohnishbangaru" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 hover:scale-110 transition-transform" />
      </a>
      <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" className="w-6 h-6 hover:scale-110 transition-transform" />
      </a>
      <a href="https://linkedin.com/in/mohnishbangaru" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition-transform" />
      </a>
    </div>
  </div>
                  )}
                </div>
              </section>
            ))}
          </motion.div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-neutral-200 transition"
          >
            ↑ Top
          </button>
        </motion.main>
      )}
    </>
  );
}
