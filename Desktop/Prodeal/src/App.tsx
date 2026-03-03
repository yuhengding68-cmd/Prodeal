import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Globe,
  Factory,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  PackageSearch,
  Ship,
  Menu,
  X,
  Search,
  Star,
  PlayCircle,
} from "lucide-react";

const Logo = ({ theme = "light" }: { theme?: "light" | "dark" }) => {
  const textColor = theme === "light" ? "text-slate-900" : "text-white";

  return (
    <div className="flex items-center gap-2.5">
      <span className={`text-xl font-bold tracking-tight ${textColor}`}>
        Prodeal
      </span>
    </div>
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo theme="light" />

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
            >
              Pricing
            </a>
            <button onClick={onOpenModal} className="bg-slate-900 hover:bg-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <a
                href="#pricing"
                className="text-base font-medium text-slate-600"
              >
                Pricing
              </a>
              <button onClick={() => { setIsOpen(false); onOpenModal(); }} className="bg-purple-600 text-white px-5 py-3 rounded-xl text-base font-medium mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob" />
        <motion.div style={{ y: y2 }} className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
        <motion.div style={{ y: y1 }} className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-400/20 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100/50 border border-purple-200 text-purple-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              B2B Sourcing Platform
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Your Direct Link to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                China's Top Factories
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
              Backed by our family-owned cargo ship company, we offer unparalleled logistics advantages. We connect overseas e-commerce merchants with verified, high-quality manufacturing partners to scale your business seamlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 group">
                Find a Factory
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                ))}
              </div>
              <p>
                Trusted by{" "}
                <span className="text-slate-900 font-bold">2,000+</span>{" "}
                merchants
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Abstract visual representation of connecting merchants to factories */}
            <motion.div style={{ rotate }} className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-indigo-50 rounded-full blur-3xl opacity-70"></div>

              {/* Center Globe */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-100 z-10"
              >
                <Globe
                  size={80}
                  className="text-purple-500 opacity-20 absolute"
                />
                <div className="text-center">
                  <span className="block text-3xl font-bold text-slate-900">
                    Prodeal
                  </span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Hub
                  </span>
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              {[
                {
                  icon: Factory,
                  color: "text-orange-500",
                  bg: "bg-orange-100",
                  label: "Factory",
                  delay: 0,
                },
                {
                  icon: PackageSearch,
                  color: "text-emerald-500",
                  bg: "bg-emerald-100",
                  label: "QC Check",
                  delay: 1.5,
                },
                {
                  icon: Ship,
                  color: "text-purple-500",
                  bg: "bg-purple-100",
                  label: "Logistics",
                  delay: 3,
                },
                {
                  icon: TrendingUp,
                  color: "text-indigo-500",
                  bg: "bg-indigo-100",
                  label: "Growth",
                  delay: 4.5,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: item.delay,
                  }}
                  className="absolute top-0 left-0 w-full h-full origin-center pointer-events-none"
                >
                  <motion.div
                    animate={{ rotate: [360, 0] }} // Counter-rotate to keep upright
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                      delay: item.delay,
                    }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-auto"
                  >
                    <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-2 w-24 transform hover:scale-110 transition-transform cursor-pointer">
                      <div
                        className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}
                      >
                        <item.icon size={20} className={item.color} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Connecting Lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: "500+", label: "Verified Factories" },
    { value: "10k+", label: "Products Sourced" },
    { value: "99%", label: "Quality Pass Rate" },
    { value: "50+", label: "Countries Served" },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: Factory,
      title: "Direct Sourcing",
      description:
        "Cut out the middlemen. Connect directly with manufacturers to get the best prices and control over your product.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: ShieldCheck,
      title: "Verified Partners",
      description:
        "Every factory on our platform undergoes a rigorous 50-point inspection for quality, capacity, and compliance.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Scalable Production",
      description:
        "Whether you need 500 units or 50,000, we match you with partners capable of growing alongside your business.",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Ship,
      title: "End-to-End Logistics",
      description:
        "From factory floor to your warehouse. We handle customs, freight forwarding, and final mile delivery.",
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Prodeal?
          </h2>
          <p className="text-lg text-slate-600">
            We remove the friction from international manufacturing, giving you
            the confidence to build your brand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
            >
              <div
                className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Submit Requirements",
      description:
        "Tell us about your product, target price, and quantity. Upload tech packs or reference images.",
    },
    {
      number: "02",
      title: "Factory Matching",
      description:
        "Our algorithm and sourcing experts match you with 3-5 verified factories that fit your exact needs.",
    },
    {
      number: "03",
      title: "Sampling & Approval",
      description:
        "Receive samples, request revisions, and approve the final golden sample before mass production.",
    },
    {
      number: "04",
      title: "Production & Delivery",
      description:
        "We monitor production, perform quality control checks, and handle shipping to your destination.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 mb-12">
              A streamlined process designed to get your products manufactured
              and delivered with zero headaches.
            </p>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 relative"
                >
                  {index !== steps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-[-2rem] w-px bg-slate-200"></div>
                  )}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Manufacturing Process"
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Production Status</div>
                    <div className="text-emerald-300 text-sm">On Schedule</div>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div
                    className="bg-emerald-400 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-white/80">
                  <span>Mass Production</span>
                  <span>75% Complete</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-purple-600"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to scale your e-commerce business?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of merchants who have streamlined their supply chain
            and increased margins with Prodeal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onOpenModal} className="bg-white text-purple-600 hover:bg-slate-50 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl flex items-center justify-center gap-2">
              Start Sourcing Now
              <ArrowRight size={20} />
            </button>
            <button onClick={onOpenModal} className="bg-purple-700/50 hover:bg-purple-700 text-white border border-purple-400/50 px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center">
              Talk to an Expert
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const cases = [
    {
      title: "TechGear: 35% Cost Reduction",
      category: "Cost Savings",
      description: "We helped a US-based electronics accessory brand switch from a trading company to a direct factory, reducing their unit cost from $12 to $7.80 while improving packaging quality.",
      metric: "35%",
      metricLabel: "Margin Increase",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "LuxeHome: Solved Freight Nightmares",
      category: "Logistics Solution",
      description: "Facing 4-week delays with their previous forwarder, LuxeHome switched to our integrated logistics network. We consolidated shipments from 3 factories, cutting shipping time by 12 days.",
      metric: "12 Days",
      metricLabel: "Faster Delivery",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
        ></motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real Results for Real Brands</h2>
          <p className="text-lg text-slate-600">See how we help businesses lower costs and solve complex logistics challenges.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                    {item.category}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{item.metric}</div>
                    <div className="text-xs text-slate-500 font-medium uppercase">{item.metricLabel}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Founder, EcoLife",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "I was skeptical about sourcing directly from China, but Prodeal made it incredibly safe. The factory they found for our bamboo cutlery is top-notch. Quality control is no longer a headache for us.",
      stars: 5
    },
    {
      name: "David Chen",
      role: "Ops Director, TechAccessories",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "The logistics support is a game changer. We used to have shipments stuck in customs for weeks. Prodeal's team handled everything, and our last shipment arrived 5 days early.",
      stars: 5
    },
    {
      name: "Marcus Thorne",
      role: "CEO, UrbanWear",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "We were overpaying our previous supplier by 40%. Prodeal negotiated a better rate with a factory that actually has better ethical standards. The ROI on their consultation fee was instant.",
      stars: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Product Manager, HomeStyle",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "Communication was my biggest worry. Prodeal's team bridged the language gap perfectly. I feel like I have a local team on the ground in Shenzhen.",
      stars: 4
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-400/10 to-indigo-400/10 rounded-full blur-[100px] pointer-events-none"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by E-commerce Leaders</h2>
          <p className="text-lg text-slate-600">Don't just take our word for it. Here's what our partners have to say.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.stars ? "currentColor" : "none"} className={i < review.stars ? "" : "text-slate-200"} />
                ))}
              </div>
              <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                  <div className="text-xs text-slate-500">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const LegalModal = ({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto text-slate-600 leading-relaxed space-y-4">
          {content}
        </div>
      </motion.div>
    </div>
  )
}

const Footer = ({ onOpenTerms, onOpenPrivacy }: { onOpenTerms: () => void, onOpenPrivacy: () => void }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <Logo theme="dark" />
            </div>
            <p className="text-sm text-slate-400 text-center md:text-left max-w-xs">
              Your direct link to China's top factories. Scale your e-commerce
              business with confidence.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <button onClick={onOpenTerms} className="hover:text-white transition-colors">Terms</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Privacy</button>
            <a href="mailto:contact@prodeal.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-center items-center gap-4">
          <p>© {new Date().getFullYear()} Prodeal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Pricing = ({ onSelectPlan }: { onSelectPlan: (plan: string) => void }) => {
  return (
    <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-400/10 rounded-[100%] blur-[80px] -translate-y-1/2 pointer-events-none"
      ></motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-slate-600">Choose the consultation plan that best fits your sourcing needs.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative flex flex-col">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic Consultation</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-extrabold text-slate-900">$39</span>
              <span className="text-slate-500 font-medium">/ session</span>
            </div>
            <p className="text-slate-600 mb-8">Perfect for getting started and understanding the sourcing landscape.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-500 shrink-0" size={20} /><span>30-minute expert consultation</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-500 shrink-0" size={20} /><span>Initial factory matching</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-500 shrink-0" size={20} /><span>Basic market analysis</span></li>
            </ul>
            <button onClick={() => onSelectPlan('Basic $39')} className="w-full py-4 rounded-xl font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 transition-colors">
              Choose Basic
            </button>
          </div>
          {/* Plan 2 */}
          <div className="bg-purple-600 rounded-3xl p-8 shadow-xl border border-purple-500 relative flex flex-col text-white transform md:-translate-y-4">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Premium Sourcing</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-extrabold">$129</span>
              <span className="text-purple-200 font-medium">/ session</span>
            </div>
            <p className="text-purple-100 mb-8">Comprehensive sourcing strategy and direct factory connections.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-300 shrink-0" size={20} /><span className="text-purple-50">Deep-dive consultation</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-300 shrink-0" size={20} /><span className="text-purple-50">Direct introduction to 3-5 verified factories</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-300 shrink-0" size={20} /><span className="text-purple-50">Detailed cost breakdown & logistics plan</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-purple-300 shrink-0" size={20} /><span className="text-purple-50">Priority email support</span></li>
            </ul>
            <button onClick={() => onSelectPlan('Premium $129')} className="w-full py-4 rounded-xl font-bold text-purple-600 bg-white hover:bg-slate-50 transition-colors shadow-lg">
              Choose Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const PaymentModal = ({ isOpen, onClose, selectedPlan }: { isOpen: boolean, onClose: () => void, selectedPlan: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Consultation Request</h3>
            <p className="text-sm text-slate-500 mt-1">Plan: <span className="font-semibold text-purple-600">{selectedPlan || 'Not selected'}</span></p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto">
          <form className="space-y-5" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const birthday = formData.get('birthday') as string;
            const email = formData.get('email') as string;
            const whatsapp = formData.get('whatsapp') as string;
            const description = formData.get('description') as string;

            try {
              const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  plan: selectedPlan || 'Basic $39',
                  name,
                  birthday,
                  email,
                  whatsapp,
                  description
                }),
              });

              const data = await response.json();
              if (data.url) {
                window.location.href = data.url;
              } else {
                alert(data.error || 'Failed to create checkout session');
              }
            } catch (error) {
              console.error('Error:', error);
              alert('An error occurred. Please try again.');
            }
          }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input name="name" required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
              <input name="birthday" required type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input name="email" required type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">WhatsApp Number</label>
              <input name="whatsapp" required type="text" placeholder="+1 234 567 890" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Problem Description</label>
              <textarea name="description" required placeholder="Please describe your sourcing needs or challenges..." rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none" />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2">
                Proceed to Payment <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={14} /> Secure payment processing
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'canceled' | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setPaymentStatus('success');
    }
    if (query.get('canceled')) {
      setPaymentStatus('canceled');
    }
  }, []);

  const openModal = (plan = '') => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-purple-200 selection:text-purple-900 relative">
      {/* Global Light Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-400/10 blur-[100px] mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-400/10 blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
        <div className="absolute top-[40%] left-[60%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-400/10 blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <Navbar onOpenModal={() => openModal()} />

      {paymentStatus === 'success' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 size={20} />
          <span className="font-medium">Payment successful! We'll be in touch shortly.</span>
          <button onClick={() => setPaymentStatus(null)} className="ml-2 hover:text-emerald-200"><X size={16} /></button>
        </div>
      )}

      {paymentStatus === 'canceled' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4">
          <span className="font-medium">Payment was canceled. You can try again when you're ready.</span>
          <button onClick={() => setPaymentStatus(null)} className="ml-2 hover:text-orange-200"><X size={16} /></button>
        </div>
      )}

      <main>
        <Hero onOpenModal={() => openModal()} />
        <CaseStudies />
        <Testimonials />
        <Pricing onSelectPlan={openModal} />
      </main>
      <Footer onOpenTerms={() => setIsTermsOpen(true)} onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      <AnimatePresence>
        {isModalOpen && (
          <PaymentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedPlan={selectedPlan}
          />
        )}
        {isTermsOpen && (
          <LegalModal
            isOpen={isTermsOpen}
            onClose={() => setIsTermsOpen(false)}
            title="Terms of Service"
            content={
              <>
                <p><strong>1. Acceptance of Terms</strong><br />By accessing and using Prodeal's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                <p><strong>2. Services Description</strong><br />Prodeal provides B2B sourcing consultation and factory matching services. We connect merchants with manufacturing partners in China. We act as a facilitator and consultant, not as the manufacturer.</p>
                <p><strong>3. User Responsibilities</strong><br />You agree to provide accurate information regarding your product requirements and business details. You are responsible for final approval of samples and production quality standards.</p>
                <p><strong>4. Payment Terms</strong><br />Consultation fees are non-refundable once the service has commenced. Payment is processed securely via Stripe. Additional manufacturing costs are separate and paid directly to factories or via our escrow service as agreed.</p>
                <p><strong>5. Limitation of Liability</strong><br />Prodeal is not liable for manufacturing defects, shipping delays, or intellectual property disputes arising from your engagement with third-party factories, though we strive to vet all partners rigorously.</p>
              </>
            }
          />
        )}
        {isPrivacyOpen && (
          <LegalModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
            title="Privacy Policy"
            content={
              <>
                <p><strong>1. Information Collection</strong><br />We collect information you provide directly to us, such as your name, email address, phone number, and product requirements when you fill out our consultation forms.</p>
                <p><strong>2. Use of Information</strong><br />We use your information to provide sourcing services, communicate with you about your projects, and match you with suitable manufacturing partners.</p>
                <p><strong>3. Data Protection</strong><br />We implement security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except to trusted partners who assist us in operating our website or conducting our business.</p>
                <p><strong>4. Third-Party Services</strong><br />We use Stripe for payment processing. Your payment information is processed securely by Stripe and is subject to their privacy policy and terms of service.</p>
                <p><strong>5. Contact Us</strong><br />If you have any questions about this Privacy Policy, please contact us at contact@prodeal.com.</p>
              </>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
