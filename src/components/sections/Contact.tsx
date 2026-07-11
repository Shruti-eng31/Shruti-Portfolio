"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, MapPin, Mail, Terminal, Scan } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission with glitchy delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 w-full relative z-10 bg-[#020202] overflow-hidden min-h-screen flex items-center">
      
      {/* Abstract Topographic Lines Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Secure Channel Open
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-4 text-white">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#7000FF]">Contact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
          
          {/* Holographic Radar / Contact Info */}
          <motion.div 
            style={{ y }}
            className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center"
          >
            {/* Scanning Radar Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <div className="w-[300px] h-[300px] rounded-full border border-primary/20 relative animate-[spin_10s_linear_infinite]">
                <div className="w-1/2 h-1/2 absolute top-0 left-1/2 origin-bottom-left bg-gradient-to-br from-primary/30 to-transparent clip-triangle" />
              </div>
              <div className="absolute w-[200px] h-[200px] rounded-full border border-primary/40 border-dashed animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute w-[100px] h-[100px] rounded-full border-2 border-primary/60" />
            </div>

            {/* Info Cards floating over radar */}
            <div className="relative z-10 flex flex-col gap-6 w-full max-w-sm">
              <motion.div 
                whileHover={{ x: 10 }}
                className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary backdrop-blur-xl bg-black/60 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Scan className="text-primary" size={20} />
                  <h4 className="font-mono text-sm tracking-widest text-gray-400 uppercase">Coordinates</h4>
                </div>
                <p className="text-xl font-bold text-white pl-9">Greater Noida, India</p>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="glass-panel p-6 rounded-2xl border-l-4 border-l-[#7000FF] backdrop-blur-xl bg-black/60 shadow-[0_0_30px_rgba(112,0,255,0.1)]"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Mail className="text-[#7000FF]" size={20} />
                  <h4 className="font-mono text-sm tracking-widest text-gray-400 uppercase">Comm Link</h4>
                </div>
                <a href="mailto:professionalshrutisingh@gmail.com" className="text-lg md:text-xl font-bold text-white pl-9 hover:text-primary transition-colors truncate block">
                  professionalshrutisingh@gmail.com
                </a>
              </motion.div>

              <div className="flex gap-4 mt-4 ml-4">
                <a href="https://linkedin.com/in/shrutitechcse" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://github.com/shrutitechcse" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-white hover:text-[#7000FF] hover:border-[#7000FF]/50 transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(112,0,255,0.4)]">
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Cyberpunk Terminal Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full relative group"
          >
            {/* Glow Behind Form */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-[#7000FF] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative glass-panel rounded-3xl overflow-hidden bg-black/80 backdrop-blur-2xl border border-white/10">
              
              {/* Form Header */}
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-primary" />
                  <span className="font-mono text-sm tracking-widest text-white uppercase">Message_Protocol.exe</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono tracking-widest text-gray-400 uppercase">IDENTIFIER [NAME]</label>
                    <input 
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all placeholder:text-white/20"
                      placeholder="Enter designation..."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-mono tracking-widest text-gray-400 uppercase">RETURN PATH [EMAIL]</label>
                    <input 
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all placeholder:text-white/20"
                      placeholder="Enter comm address..."
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-mono tracking-widest text-gray-400 uppercase">DATA HEAD [SUBJECT]</label>
                  <input 
                    type="text" id="subject" name="subject" required
                    value={formData.subject} onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all placeholder:text-white/20"
                    placeholder="Transmission subject..."
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono tracking-widest text-gray-400 uppercase">PAYLOAD [MESSAGE]</label>
                  <textarea 
                    id="message" name="message" required rows={4}
                    value={formData.message} onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all resize-none placeholder:text-white/20"
                    placeholder="Transmit your data here..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className={`w-full mt-4 relative overflow-hidden group flex items-center justify-center px-8 py-4 font-mono font-bold text-sm tracking-widest uppercase transition-all rounded-lg border 
                    ${submitted ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 
                      isSubmitting ? 'bg-primary/20 border-primary text-primary animate-pulse' : 
                      'bg-white/5 border-primary text-primary hover:bg-primary hover:text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]'}`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? "> ENCRYPTING & SENDING..." : submitted ? "> TRANSMISSION SUCCESSFUL" : "> TRANSMIT_DATA"} 
                    {!isSubmitting && !submitted && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                  {/* Glitch hover effect */}
                  {!submitted && !isSubmitting && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-0" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
