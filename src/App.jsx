import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Home", "About", "Experience", "Projects", "Skills", "Contact"];

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
  const [activeTab, setActiveTab] = useState("Home");
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
            className="min-h-screen flex items-center justify-center bg-neutral-900"
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
              <span className="text-white font-bold z-10">MB</span>
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
        <motion.main className="min-h-screen bg-neutral-900 text-white px-8 py-12 font-sans">
          <header className="sticky top-0 z-50 flex justify-between items-center mb-14 bg-neutral-900/80 backdrop-blur-lg px-8 py-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => document.getElementById("Home")?.scrollIntoView({ behavior: 'smooth' })} className="text-neutral-100 font-bold text-lg w-10 h-10 flex items-center justify-center border border-neutral-500 hover:opacity-80 transition">
                MB
              </button>
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
              <motion.section
                key={tab}
                id={tab}
                className="min-h-screen flex flex-col justify-center px-4 scroll-mt-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {tab === "Home" ? (
                  <h2 className="text-4xl font-bold mb-4 text-neutral-100 max-w-[45%] leading-snug">
                    <Typing text="Hi! I'm Mohnish Bangaru" speed={50} />
                  </h2>
                ) : (
                  <h2 className="text-3xl font-bold mb-4 text-neutral-100">{tab}</h2>
                )}
                <p className="text-neutral-400 max-w-[45%] leading-relaxed">
                  {tab === "Home" && (
                    <>
                      I'm a developer who’s passionate about building intelligent and accessible AI systems. I love working where creativity meets engineering — crafting solutions that not only function flawlessly but also feel intuitive and thoughtful.<br /><br />
                      I'm currently a graduate student at NYU, on the lookout for exciting opportunities as an AI Engineer. I’ve built ML pipelines, deployed production-grade models, and worked cross-functionally to solve real-world problems with data and code.<br /><br />
                      Previously, I’ve contributed to startups, consulting firms, and research labs — shipping everything from anomaly detection tools to mobile apps. I thrive in environments where curiosity drives action, and experimentation is embraced.<br /><br />
                      Outside of work, I enjoy shooting hoops, exploring NYC, or making noise on my electric guitar.
                    </>
                  )}
                  {tab === "About" && (
                    <>I'm currently pursuing my Master’s in Computer Engineering at NYU, where I focus on machine learning, deep learning, and efficient model deployment. I have a passion for solving real-world problems with innovative, data-driven solutions and a drive to explore the boundaries of intelligent systems.</>
                  )}
                  {tab === "Experience" && (
                    <>
                      <strong className="text-neutral-200">Graduate Student Data Scientist – NYU (2023–Present)</strong><br />
                      Spearheaded NLP-based feedback analysis for educational surveys, implemented scalable ETL pipelines, and deployed interactive dashboards using Tableau and Python.<br /><br />
                      <strong className="text-neutral-200">Data Scientist – KPMG (2022–2023)</strong><br />
                      Built anomaly detection systems for trading reports using autoencoders, integrated ML with ETL automation, and improved reporting accuracy for financial clients.<br /><br />
                      <strong className="text-neutral-200">Analyst – KPMG (2021–2022)</strong><br />
                      Enhanced query efficiency across data infrastructure, collaborated with cross-functional teams to automate model deployment and develop data pipelines.
                    </>
                  )}
                  {tab === "Projects" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl">
                      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-700">
                        <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="Wearables" className="w-10 h-10 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Wearable Movement Tracking</h3>
                        <p className="text-neutral-400 text-sm">
                          Built a movement analytics pipeline using IMU sensors to classify shoulder exercise posture with real-time feedback. Integrated with Python and Bluetooth for real-world testing.
                        </p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-700">
                        <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="Startup" className="w-10 h-10 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Startup Success Predictor</h3>
                        <p className="text-neutral-400 text-sm">
                          Modeled NYC startup success based on public mobility, economic indicators, and neighborhood demographics using regression and classification models on Open Data.
                        </p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-700">
                        <img src="https://cdn-icons-png.flaticon.com/512/3649/3649463.png" alt="HCI" className="w-10 h-10 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Human-Computer Interaction Evaluation</h3>
                        <p className="text-neutral-400 text-sm">
                          Conducted a usability audit and heuristic evaluation of a fintech dashboard. Proposed and prototyped improvements using Figma and behavioral UX research techniques.
                        </p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-700">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Raspberry_Pi_Logo.svg" alt="Raspberry Pi" className="w-10 h-10 mb-4" />
  <h3 className="text-xl font-semibold text-white mb-2">Edge Deployment with Quantized ResNet</h3>
                        <p className="text-neutral-400 text-sm">
                          Compressed and optimized ResNet-50 for Raspberry Pi 4 using quantization, resulting in 10× faster inference while preserving 91% accuracy.
                        </p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-700">
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Chest_Xray_PA_3-8-2010.png" alt="MIMIC-CXR" className="w-10 h-10 mb-4 rounded" />
  <h3 className="text-xl font-semibold text-white mb-2">Vision-Language Modeling on MIMIC-CXR</h3>
                        <p className="text-neutral-400 text-sm">
                          Trained transformer-based models on radiology reports and X-ray images to improve diagnostic question answering, achieving 96% accuracy.
                        </p>
                      </div>
                      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg border border-neutral-700">
  <img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="Hugging Face" className="w-10 h-10 mb-4" />
  <h3 className="text-xl font-semibold text-white mb-2">LLM Fine-Tuning with QLoRA</h3>
                        <p className="text-neutral-400 text-sm">
                          Fine-tuned the Pythia 6.9B model using QLoRA and Alpaca dataset for low-resource environments, achieving strong results on QA benchmarks.
                        </p>
                      </div>
                    </div>
                  )}
                  {tab === "Skills" && (
                    <>
                      <strong className="text-neutral-200">Languages:</strong> Python, Java, C++, SQL<br />
                      <strong className="text-neutral-200">Frameworks:</strong> TensorFlow, PyTorch, Core ML, Hugging Face<br />
                      <strong className="text-neutral-200">Tools:</strong> Docker, Tableau, Power BI, Alteryx, Spark<br />
                      <strong className="text-neutral-200">Certifications:</strong> Deep Learning Specialization (Coursera), Alteryx Core Developer
                    </>
                  )}
                  {tab === "Contact" && (
                    <>
                      📧 mohnishbangaru@nyu.edu<br />
                      🔗 <a href="https://linkedin.com/in/mohnishbangaru" className="underline text-white">linkedin.com/in/mohnishbangaru</a>
                    </>
                  )}
                </p>
              </motion.section>
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
