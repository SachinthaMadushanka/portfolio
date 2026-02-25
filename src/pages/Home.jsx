import React, { useEffect, useRef, useState } from "react";

function Home() {
  const cardRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Typing effect for the name
  const [displayName, setDisplayName] = useState("");
  const fullName = "Sachintha Madushanka";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullName.length) {
        setDisplayName(fullName.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 150);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(59,130,246,0.05)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 py-20 relative"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* LEFT SIDE */}
        <div 
          id="hero-left"
          data-animate
          className={`lg:w-1/2 space-y-6 transition-all duration-1000 ${
            isVisible["hero-left"] ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}
        >
          <span className="inline-flex items-center text-blue-400 font-medium">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-ping"></span>
            👋 Welcome to my portfolio
          </span>

          <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]">
                {displayName}
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full scale-x-0 animate-[slideIn_1s_ease_forwards] [animation-delay:2s]"></span>
            </span>
          </h1>

          <div className="relative">
            <p className="text-lg text-gray-300 mb-2">
              HNDIT Student | Future Senior Software Engineer
            </p>
            <div className="absolute -left-4 top-0 w-1 h-full bg-blue-400 rounded-full animate-pulse"></div>
          </div>

          <p className="text-gray-400 max-w-lg leading-relaxed">
            Building innovative solutions with modern web technologies.
            Passionate about creating seamless user experiences and robust backend systems.
            <span className="block mt-2 text-blue-400/80">#CodeCreateInnovate</span>
          </p>

          <div className="flex gap-4 pt-4 relative">
            <a
              href="/projects"
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                View Projects 
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>

            <a
              href="/contact"
              className="px-8 py-4 rounded-xl border-2 border-gray-500 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 bg-blue-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-6">
            {[
              { name: 'github', url: 'https://github.com' },
              { name: 'linkedin', url: 'https://linkedin.com' },
              { name: 'twitter', url: 'https://twitter.com' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{social.name}</span>
                <span className="text-gray-400 group-hover:text-blue-400 transition-colors text-xl">
                  {social.name === 'github' && '⌨️'}
                  {social.name === 'linkedin' && '🔗'}
                  {social.name === 'twitter' && '🐦'}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Image + Tech Card */}
        <div 
          id="hero-right"
          data-animate
          className={`lg:w-1/2 mt-10 lg:mt-0 flex flex-col items-center lg:items-end gap-20 transition-all duration-1000 delay-300 ${
            isVisible["hero-right"] ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        >
          
          {/* Profile Image with Glow Effect */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 p-1">
              <img
                src="/images/images.jpg"
                alt="Sachintha Madushanka"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 px-4 py-1 rounded-full text-sm border border-blue-400/30 whitespace-nowrap">
              🚀 Open to Work
            </div>
          </div>

          {/* Tech Card */}
          <div
            ref={cardRef}
            className="relative group"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 w-80 shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-blue-500/20">
              
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-blue-400">⚡ Tech Stack</h3>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse [animation-delay:150ms]"></span>
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse [animation-delay:300ms]"></span>
                </div>
              </div>

              <div className="space-y-4">
                <TechItem name="Java" level="90%" icon="☕" />
                <TechItem name="React" level="75%" icon="⚛️" />
                <TechItem name="JavaScript" level="85%" icon="📜" />
                <TechItem name="MySQL" level="70%" icon="🗄️" />
                <TechItem name="HTML/CSS" level="95%" icon="🎨" />
              </div>

              {/* Current Focus */}
              <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-xs text-gray-400 mb-2">CURRENT FOCUS</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Learning Next.js & TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-10 lg:px-20 bg-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-blue-400 text-sm font-medium tracking-wider">GET TO KNOW ME</span>
            <h2 className="text-4xl font-bold mt-2">
              Passionate IT Student &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Future Developer
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div 
              id="about-left"
              data-animate
              className={`space-y-6 transition-all duration-1000 ${
                isVisible["about-left"] ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
              }`}
            >
              <p className="text-gray-400 leading-relaxed">
                Passionate IT student specialized in Java, Web Technologies
                and building structured backend systems with modern UI.
                I love turning complex problems into simple, beautiful designs.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <Feature title="Problem Solver" icon="🧩" />
                <Feature title="Creative Thinker" icon="💡" />
                <Feature title="Team Player" icon="🤝" />
              </div>

              {/* Timeline */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Education</h3>
                <div className="relative pl-6 border-l-2 border-blue-400/30 space-y-4">
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 bg-blue-400 rounded-full border-2 border-slate-900"></div>
                    <p className="font-medium">Higher National Diploma in Information Technology</p>
                    <p className="text-sm text-gray-400">2023 - Present</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 bg-cyan-400 rounded-full border-2 border-slate-900"></div>
                    <p className="font-medium">GCE Advanced Level - Physical Science</p>
                    <p className="text-sm text-gray-400">2020 - 2022</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div 
              id="about-right"
              data-animate
              className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${
                isVisible["about-right"] ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              }`}
            >
              <StatCard value="10+" label="Projects Completed" icon="🚀" />
              <StatCard value="5+" label="Technologies" icon="💻" />
              <StatCard value="100%" label="Commitment" icon="🎯" />
              <StatCard value="24/7" label="Learning" icon="📚" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group z-50 animate-bounce"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Add custom keyframes in style tag */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Enhanced TechItem component
function TechItem({ name, level, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between text-sm mb-1">
        <span className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          {name}
        </span>
        <span className="text-gray-400 font-mono">{level}</span>
      </div>
      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            isHovered ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-blue-500"
          }`}
          style={{ 
            width: level,
            transform: isHovered ? "scaleX(1.05)" : "scaleX(1)",
            transformOrigin: "left",
          }}
        ></div>
      </div>
    </div>
  );
}

// Enhanced Feature component
function Feature({ title, icon }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-blue-400 transition-all duration-300 cursor-default group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <span className={`text-2xl transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
          {icon}
        </span>
        <h4 className="font-semibold text-sm">{title}</h4>
      </div>
      {isHovered && (
        <div className="mt-2 text-xs text-blue-400 text-center animate-[fadeIn_0.3s_ease_forwards]">
          ✓ Experienced
        </div>
      )}
    </div>
  );
}

// Enhanced StatCard component
function StatCard({ value, label, icon }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      let start = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start > numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <div className="group" style={{ perspective: '1000px' }}>
      <div className="bg-slate-800 p-6 rounded-xl text-center border border-slate-700 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 cursor-default">
        <div className="text-3xl mb-2 group-hover:animate-bounce">{icon}</div>
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          {isNaN(parseInt(value)) ? value : count + (value.includes('+') ? '+' : '')}
        </div>
        <div className="text-gray-400 text-sm mt-1">{label}</div>
      </div>
    </div>
  );
}

export default Home;