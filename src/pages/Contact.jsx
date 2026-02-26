import React, { useState, useRef, useEffect } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  
  const formRef = useRef(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);

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

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3D card hover effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  // Form validation
  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  // Social links data
  const socialLinks = [
    {
      name: 'Email',
      icon: '📧',
      value: 'sachinthamadushanka8@gmail.com',
      link: 'mailto:sachinthamadushanka8@gmail.com',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
      hoverColor: 'hover:bg-red-500/20'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      value: 'linkedin.com/in/sachintha',
      link: 'https://linkedin.com/in/sachintha',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      hoverColor: 'hover:bg-blue-500/20'
    },
    {
      name: 'GitHub',
      icon: '🐙',
      value: 'github.com/sachintha',
      link: 'https://github.com/sachintha',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-500/10',
      hoverColor: 'hover:bg-gray-500/20'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      value: 'twitter.com/sachintha',
      link: 'https://twitter.com/sachintha',
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-500/10',
      hoverColor: 'hover:bg-sky-500/20'
    },
    {
      name: 'Instagram',
      icon: '📷',
      value: 'instagram.com/sachintha',
      link: 'https://instagram.com/sachintha',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      hoverColor: 'hover:bg-purple-500/20'
    },
    {
      name: 'WhatsApp',
      icon: '📱',
      value: 'Sachintha Madushanka',
      link: 'https://wa.me/94716031582',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      hoverColor: 'hover:bg-green-500/20'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden px-4 py-16"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(59,130,246,0.2)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Animated particles - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div 
          data-animate
          id="contact-header"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible['contact-header'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <span className="text-blue-400 text-sm font-medium tracking-wider">GET IN TOUCH</span>
          <h1 className="text-5xl font-bold mt-2 mb-4">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Connect
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
            I'm always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Contact Info Card */}
          <div
            ref={cardRef}
            data-animate
            id="contact-info"
            className={`flex-1 transition-all duration-1000 delay-200 ${
              isVisible['contact-info'] ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
            style={{ perspective: '1000px' }}
          >
            <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 h-full transform transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl">
                  📞
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-sm text-gray-400">Let's start a conversation</p>
                </div>
              </div>

              {/* Contact Links */}
              <div className="space-y-4 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl ${social.bgColor} ${social.hoverColor} transition-all duration-300 group relative overflow-hidden`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <span className="text-2xl group-hover:scale-110 transition-transform">{social.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">{social.name}</p>
                      <p className="text-sm group-hover:text-blue-400 transition-colors">{social.value}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div className="text-center group">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Connections</p>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:scale-110 transition-transform">
                    50+
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Projects</p>
                </div>
                <div className="text-center group">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 group-hover:scale-110 transition-transform">
                    3+
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Years</p>
                </div>
              </div>

              {/* Availability Status */}
              <div className="mt-6 flex items-center gap-2 text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span>Available for freelance work</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            data-animate
            id="contact-form"
            className={`flex-1 transition-all duration-1000 delay-400 ${
              isVisible['contact-form'] ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
              
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Send a Message</h2>
                  <p className="text-sm text-gray-400">I'll get back to you within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name Input */}
                <div className="relative">
                  <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className={`w-full bg-gray-700/50 text-white p-4 rounded-xl outline-none transition-all duration-300 border ${
                        focusedField === 'name' 
                          ? 'border-blue-500 ring-2 ring-blue-500/20' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      required
                    />
                    {formData.name && (
                      <span className="absolute right-4 top-4 text-green-400">✓</span>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      className={`w-full bg-gray-700/50 text-white p-4 rounded-xl outline-none transition-all duration-300 border ${
                        focusedField === 'email' 
                          ? 'border-blue-500 ring-2 ring-blue-500/20' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      required
                    />
                    {formData.email && formData.email.includes('@') && (
                      <span className="absolute right-4 top-4 text-green-400">✓</span>
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label className="block text-sm text-gray-400 mb-1">Your Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`w-full bg-gray-700/50 text-white p-4 rounded-xl outline-none transition-all duration-300 border resize-none ${
                        focusedField === 'message' 
                          ? 'border-blue-500 ring-2 ring-blue-500/20' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`relative mt-4 py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden group ${
                    isSubmitting || !isFormValid
                      ? 'opacity-50 cursor-not-allowed bg-gray-600'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                  disabled={isSubmitting || !isFormValid}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative z-10">Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
                      <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl animate-[fadeIn_0.5s_ease_forwards]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-green-400">Message sent successfully!</p>
                      <p className="text-sm text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Footer */}
              <p className="text-xs text-gray-500 text-center mt-6">
                By sending this message, you agree to our{' '}
                <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* Map or Location Section */}
        <div 
          data-animate
          id="location"
          className={`mt-16 transition-all duration-1000 delay-600 ${
            isVisible['location'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                📍
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-sm text-gray-400">Based in Sri Lanka · Available worldwide</p>
              </div>
            </div>
            
            {/* Timezone and Availability */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400">Timezone</p>
                <p className="font-semibold">GMT+5:30</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400">Response Time</p>
                <p className="font-semibold">&lt; 24h</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400">Languages</p>
                <p className="font-semibold">English, Sinhala</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400">Freelance</p>
                <p className="font-semibold text-green-400">Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group z-50 animate-bounce"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

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
  );
}

export default Contact;