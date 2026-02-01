import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Sparkles, 
  Shield, 
  Clock, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  Award,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BackToTop from '../components/back_the_top_btn';

const About = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const stats = [
    { number: '10K+', label: 'Active Workers', icon: Users },
    { number: '50K+', label: 'Jobs Completed', icon: CheckCircle },
    { number: '4.8/5', label: 'Average Rating', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Every worker is verified and background-checked to ensure your safety and peace of mind.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Speed & Efficiency',
      description: 'Get instant matches with available workers in your area. Fast response times guaranteed.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'We build strong local communities by connecting neighbors with trusted service providers.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Fair Pricing',
      description: 'Transparent pricing with no hidden fees. Pay fairly for quality service every time.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'Lucid was founded with a vision to revolutionize how people find trusted local services.',
      icon: Sparkles
    },
    {
      year: '2024',
      title: 'Rapid Growth',
      description: 'Expanded to 15 major cities across Ghana, connecting thousands of workers and clients.',
      icon: TrendingUp
    },
    {
      year: '2025',
      title: 'Innovation',
      description: 'Launched advanced matching algorithms and real-time tracking features.',
      icon: Target
    },
    {
      year: 'Future',
      title: 'Global Vision',
      description: 'Planning expansion across West Africa and introducing new service categories.',
      icon: MapPin
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="font-semibold">About Lucid</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Connecting Communities,
              <span className="block bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                One Service at a Time
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're on a mission to make trusted, quality services accessible to everyone in your neighborhood.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Link to="/Service">
              <button 
                className="group bg-white text-blue-700 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
              </button>
              </Link>
              <Link to="/signup">
              <button 
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:bg-orange-700 transition-all duration-300"
              >
                Join as Worker
              </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f9fafb" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 mb-4 group-hover:shadow-lg transition-shadow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Lucid was born from a simple observation: finding reliable, trustworthy service providers shouldn't be a challenge. We saw neighbors struggling to find good plumbers, electricians, and cleaners, while skilled workers struggled to find consistent work.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We built Lucid to bridge this gap. By combining technology with community trust, we've created a platform where quality service providers can thrive and customers can find help whenever they need it.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Verified Workers</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Instant Matching</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Secure Payments</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="values" className="py-20 bg-gray-50 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Lucid
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-white animate-on-scroll">
        <div className="max-w-5xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.timeline ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From humble beginnings to transforming communities
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`relative mb-12 ${isEven ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'}`}
                >
                  <div className={`flex items-center gap-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg z-10">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content card */}
                    <div className={`ml-24 md:ml-0 ${isEven ? 'md:mr-16' : 'md:ml-16'} flex-1`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600">
                        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-3">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Experience the Lucid Difference?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of satisfied customers who have found their perfect service provider
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/Service">
            <button 
              onClick={scrollToTop}
              className="group bg-white text-blue-700 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Browse Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <Link to="/signup">
            <button 
              onClick={scrollToTop}
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:bg-orange-700 transition-all duration-300"
            >
              Get Started
            </button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <BackToTop />
    </div>
  );
};

export default About;