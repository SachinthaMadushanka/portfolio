import React, { useState, useEffect } from 'react';

function Projects() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});

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

  const projects = [
    {
      id: 1,
      title: "🧹 Cleaning Service Management System",
      description: "Full web-based cleaning service booking and admin system with real-time tracking and payment integration.",
      longDescription: "A comprehensive platform for cleaning service providers to manage bookings, track staff, process payments, and handle customer communications. Includes admin dashboard, customer portal, and mobile-responsive design.",
      technologies: ["JavaScript", "PHP", "MySQL", "HTML", "CSS"],
      category: "web",
      date: "2024",
      image: "/images/cleaning-project.jpg",
      features: ["Online Booking", "Payment Integration", "Admin Dashboard", "Staff Management", "Customer Reviews"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "🐉 Red Dragon",
      description: "Computer shop management system with inventory and billing.",
      longDescription: "Complete inventory management solution for computer hardware stores. Features include stock tracking, supplier management, invoice generation, sales analytics, and customer database.",
      technologies: ["Java", "MySQL", "JDBC"],
      category: "desktop",
      date: "2023",
      image: "/images/reddragon-project.jpg",
      features: ["Inventory Tracking", "Billing System", "Supplier Management", "Sales Reports", "Customer Database"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 3,
      title: "💼 CodePlus",
      description: "Platform to help university students find job opportunities.",
      longDescription: "A job portal specifically designed for university students and fresh graduates. Features include resume builder, job matching algorithm, company profiles, and interview scheduling.",
      technologies: ["JavaScript", "React", "MySQL", "Node.js", "Tailwind CSS"],
      category: "web",
      date: "2024",
      image: "/images/codeplus-project.jpg",
      features: ["Job Matching", "Resume Builder", "Company Profiles", "Application Tracking", "Interview Scheduling"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "⛽ Fuel Management System",
      description: "Full web-based fuel system management and tracking system.",
      longDescription: "Advanced fuel management system for fleet operators and fuel stations. Tracks fuel consumption, manages inventory, generates reports, and provides real-time analytics.",
      technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Chart.js"],
      category: "web",
      date: "2023",
      image: "/images/fuel-project.jpg",
      features: ["Fuel Tracking", "Inventory Management", "Usage Reports", "Fleet Management", "Analytics Dashboard"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      title: "📱 Mobile Shop POS",
      description: "Point of sale system for mobile phone retailers with inventory management.",
      longDescription: "Modern POS system designed for mobile phone shops. Features include barcode scanning, customer management, sales tracking, and multi-branch support.",
      technologies: ["React Native", "Node.js", "MongoDB", "Express"],
      category: "mobile",
      date: "2024",
      image: "/images/pos-project.jpg",
      features: ["Barcode Scanning", "Customer Management", "Multi-branch", "Sales Analytics", "Inventory Alerts"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "🤖 AI Chat Assistant",
      description: "Intelligent chatbot for customer support using natural language processing.",
      longDescription: "AI-powered chatbot that handles customer inquiries, provides product recommendations, and integrates with existing CRM systems. Includes sentiment analysis and learning capabilities.",
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
      category: "ai",
      date: "2024",
      image: "/images/ai-project.jpg",
      features: ["NLP Processing", "Sentiment Analysis", "CRM Integration", "Learning Capabilities", "Multi-language"],
      github: "https://github.com",
      live: "https://example.com",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const technologies = [...new Set(projects.flatMap(p => p.technologies))].sort();
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Color mapping for technology badges
  const techColors = {
    'JavaScript': 'bg-yellow-500/80',
    'PHP': 'bg-purple-500/80',
    'MySQL': 'bg-blue-500/80',
    'HTML': 'bg-orange-500/80',
    'CSS': 'bg-pink-500/80',
    'Java': 'bg-red-500/80',
    'JDBC': 'bg-green-500/80',
    'React': 'bg-cyan-500/80',
    'Node.js': 'bg-green-600/80',
    'Tailwind CSS': 'bg-teal-500/80',
    'React Native': 'bg-indigo-500/80',
    'MongoDB': 'bg-green-700/80',
    'Express': 'bg-gray-500/80',
    'Python': 'bg-blue-600/80',
    'TensorFlow': 'bg-orange-600/80',
    'FastAPI': 'bg-emerald-500/80',
    'PostgreSQL': 'bg-blue-700/80',
    'Chart.js': 'bg-rose-500/80'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-6 py-16 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12" data-animate id="projects-header">
          <span className="text-blue-400 text-sm font-medium tracking-wider">MY WORK</span>
          <h1 className="text-5xl font-bold mt-2 mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project represents my passion for 
            creating innovative solutions and learning new technologies.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-blue-400">{projects.length}+</div>
            <div className="text-gray-400 text-sm">Total Projects</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-purple-400">{technologies.length}+</div>
            <div className="text-gray-400 text-sm">Technologies</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-green-400">{new Set(projects.map(p => p.category)).size}</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">2024</div>
            <div className="text-gray-400 text-sm">Latest Project</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Technology Quick Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {technologies.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => setSearchTerm(tech)}
                className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 hover:bg-white/10 transition-colors border border-white/10"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-animate
              id={`project-${project.id}`}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-700 ${
                isVisible[`project-${project.id}`] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Card Content */}
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {project.date}
                  </span>
                </div>

                {/* Project Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`${techColors[tech] || 'bg-gray-500/80'} text-white px-2 py-1 rounded-full text-xs transition-transform hover:scale-110 cursor-default`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">KEY FEATURES</p>
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="text-xs bg-white/5 px-2 py-1 rounded-full text-gray-300">
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="text-xs bg-white/5 px-2 py-1 rounded-full text-gray-300">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-white/5 rounded-lg text-sm text-center hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-sm text-center hover:from-blue-600 hover:to-cyan-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live
                  </a>
                </div>

                {/* Hover Details Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 px-6 py-2 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
              
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedProject.color} bg-opacity-20`}>
                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-gray-300">{selectedProject.description}</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">DETAILED DESCRIPTION</h4>
                  <p className="text-gray-300">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">TECHNOLOGIES USED</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className={`${techColors[tech] || 'bg-gray-500/80'} text-white px-3 py-1 rounded-full text-sm`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">KEY FEATURES</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-center hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-center hover:from-blue-600 hover:to-cyan-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Add keyframe animations */}
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
    </div>
  );
}

export default Projects;