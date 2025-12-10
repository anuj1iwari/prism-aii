import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Settings, 
  Plus, 
  Search, 
  LayoutGrid, 
  Users, 
  Zap, 
  Globe, 
  Image as ImageIcon, 
  Mic, 
  Send, 
  MoreHorizontal, 
  ChevronDown, 
  X, 
  Lock, 
  Check, 
  Menu,
  Cpu,
  Sparkles,
  Bot,
  BrainCircuit,
  Feather,
  ArrowRight,
  PlayCircle,
  FolderCog,
  FileText,
  Paperclip,
  Sun,
  Moon,
  LogIn,
  Triangle, 
  Activity, 
  Brain,    
  Network,  
  Layers,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types Definitions (Strict TypeScript) ---
interface Model {
  id: string;
  name: string;
  version: string;
  icon: React.ReactNode;
  color: string;
  premium: boolean;
  provider: string;
}

interface Message {
  role: 'user' | 'assistant' | 'synthesis_process' | 'synthesis';
  content: string;
  timestamp: Date;
  modelId?: string;
  modelName?: string;
}

interface Feature {
  title: string;
  desc: string;
  icon: React.ReactElement;
  gradient: string;
  image: string;
  points: string[];
}

// --- Legal Content Data ---
const TERMS_CONTENT = `1. Introduction\nWelcome to Prism AI. By accessing or using our platform, you agree to be bound by these Terms and Conditions.\n\n2. Services Provided\nWe provide an AI-powered aggregator platform offering access to multiple Large Language Models (LLMs) including but not limited to ChatGPT, Gemini, Claude, and others for chat, content generation, and analysis.\n\n3. Subscription Plans & Pricing\n- Monthly Plan: $12/month\n- Yearly Plan: $120/year (Save ~16%)\nPrices are subject to change with prior notice. Your subscription grants you access to premium models and features as described on the pricing page.`;
const PRIVACY_CONTENT = `1. Introduction\nThis Privacy Policy explains how Prism AI collects, uses, and protects your personal information.\n\n2. Information We Collect\n- Account Information: Name, email address, and profile picture.\n- Payment Data: Transaction history (processed by third-party providers).\n- Usage Data: Chat logs, generated content, IP address, device type, and browser information.`;

// --- Custom Aesthetic Prism Logo ---
const PrismLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 0.5L12.5 2L14 2.5L12.5 3L12 4.5L11.5 3L10 2.5L11.5 2L12 0.5Z" fill="white" className="opacity-60 animate-pulse" />
    <circle cx="4" cy="18" r="0.4" fill="white" className="opacity-40" />
    <circle cx="20" cy="5" r="0.4" fill="white" className="opacity-40" />
    <path d="M11 4L3 20h16L11 4z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M-2 14l10-4" stroke="white" strokeWidth="1.2" className="opacity-80" />
    <path d="M8 10l5 0" stroke="white" strokeWidth="1.2" className="opacity-50" />
    <g>
      <path d="M13 10l11-5" stroke="#FF4D4D" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
      <path d="M13 10l11-3.2" stroke="#FF964D" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
      <path d="M13 10l11-1.4" stroke="#FFD94D" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
      <path d="M13 10l11 0.4" stroke="#4DFF69" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
      <path d="M13 10l11 2.2" stroke="#4D9FFF" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
      <path d="M13 10l11 4" stroke="#6D4DFF" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
      <path d="M13 10l11 5.8" stroke="#B54DFF" strokeWidth="0.8" strokeLinecap="round" className="opacity-90" />
    </g>
  </svg>
);

// --- Prism Synthesis Card Component ---
const PrismSynthesisCard = ({ query, isDark }: { query: string; isDark: boolean }) => {
  const [status, setStatus] = useState<'analyzing' | 'synthesizing' | 'complete'>('analyzing'); 
  const [progress, setProgress] = useState(0);
  const [finalResult, setFinalResult] = useState('');

  const aiModels = [
    { name: 'Alpha', icon: Brain, color: 'text-blue-400' },
    { name: 'Beta', icon: Cpu, color: 'text-green-400' },
    { name: 'Gamma', icon: Zap, color: 'text-yellow-400' },
    { name: 'Delta', icon: Network, color: 'text-purple-400' },
    { name: 'Epsilon', icon: Layers, color: 'text-pink-400' },
    { name: 'Zeta', icon: Activity, color: 'text-red-400' },
    { name: 'Eta', icon: Sparkles, color: 'text-cyan-400' },
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 60 && status === 'analyzing') setStatus('synthesizing');
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus('complete');
        // Smart Synthesis Logic
        const q = query.toLowerCase();
        let answer = "";
        if(q.includes("hello") || q.includes("hi")) {
            answer = `PrismAI Synthesis Complete.\n\nQuery: "${query}"\n\nAll 7 models have acknowledged your greeting. The consensus is a polite and helpful welcome.\n\nCombined Response:\n"Hello! We are Prism AI, a unified intelligence consisting of 7 distinct neural nodes. We are ready to assist you with coding, creative writing, analysis, or general queries. How can we help you today?"`;
        } else {
            answer = `PrismAI Synthesis Complete.\n\nQuery: "${query}"\n\nIs vishay par 7 alag-alag AI models (GPT, Gemini, Claude, etc.) ka data compare kiya gaya hai.\n\nKey Insight:\nJahan Model GPT aur Claude ne detailed explanation di, wahin Perplexity ne real-time web sources provide kiye. PrismAI ne in sabhi virudhabhas (contradictions) ko hata kar yeh final nishkarsh nikala hai.\n\nFinal Recommendation:\nProceed with the implementation but keep the 'Model Alpha' constraints in mind.`;
        }
        setFinalResult(answer);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [query, status]);

  if (status === 'complete') {
    return (
      <div className="w-full mt-4 animate-in fade-in duration-500">
         <div className={`relative group max-w-3xl`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className={`relative ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border rounded-2xl p-6 shadow-xl`}>
              <div className={`flex items-start justify-between mb-4 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'} pb-3`}>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg"><Triangle className="w-5 h-5 text-purple-500 fill-purple-500" /></div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>PrismAI Result</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Synthesis of 7 Models • Confidence 99.8%</p>
                  </div>
                </div>
              </div>
              <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <p className={`whitespace-pre-line leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{finalResult}</p>
              </div>
            </div>
          </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg mx-auto py-8 text-center animate-in fade-in duration-500`}>
      <div className="relative w-40 h-40 mx-auto mb-6">
        <div className={`absolute inset-0 rounded-full border-2 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Triangle className={`w-12 h-12 ${isDark ? 'text-white' : 'text-black'} transition-all duration-500 ${status === 'synthesizing' ? 'animate-pulse drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'opacity-50'}`} />
        </div>
        {aiModels.map((ai, index) => {
          const angle = (index / 7) * 2 * Math.PI;
          const radius = 70;
          const x = Math.cos(angle) * radius + 80 - 10; 
          const y = Math.sin(angle) * radius + 80 - 10;
          return (
            <div key={index} className={`absolute transition-all duration-500 transform ${status === 'synthesizing' ? 'scale-0 opacity-0 translate-x-[80px] translate-y-[80px]' : 'scale-100 opacity-100'}`} style={{ left: status === 'synthesizing' ? '50%' : `${x}px`, top: status === 'synthesizing' ? '50%' : `${y}px` }}>
              <ai.icon className={`w-5 h-5 ${ai.color} animate-pulse`} />
            </div>
          );
        })}
      </div>
      <h2 className={`text-xl font-light mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{status === 'analyzing' ? 'Comparing 7 Neural Nodes...' : 'Synthesizing Single Output...'}</h2>
      <div className={`w-64 h-1 mx-auto ${isDark ? 'bg-slate-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
        <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-150 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

// --- Helper for "Smart" Responses ---
const generateSmartResponse = (modelName: string | undefined, query: string) => {
    const q = query.toLowerCase();
    const name = modelName || 'AI';
    if (q.includes('hello') || q.includes('hi')) return `Hello! I am ${name}. Ready to assist you.`;
    if (q.includes('code') || q.includes('python') || q.includes('react')) return `[${name}] Here is a code snippet based on your request:\n\`\`\`javascript\nconsole.log("Hello from ${name}");\n\`\`\``;
    if (q.includes('image')) return `[${name}] I can generate images. Please describe the scene in detail.`;
    if (q.includes('analysis')) return `[${name}] Analysis complete. The data suggests a strong correlation between X and Y.`;
    return `[${name}] Based on my training data, here is the answer to "${query}". This is a simulated response for demonstration.`;
};

// --- Constants ---
const MODELS: Model[] = [
  { id: 'gpt', name: 'ChatGPT', version: 'ChatGPT 5', icon: <Bot className="w-5 h-5" />, color: 'text-green-400', premium: true, provider: 'OpenAI' },
  { id: 'gemini', name: 'Gemini', version: 'Gemini 2.5 Pro', icon: <Sparkles className="w-5 h-5" />, color: 'text-blue-400', premium: true, provider: 'Google' },
  { id: 'deepseek', name: 'DeepSeek', version: 'DeepSeek', icon: <BrainCircuit className="w-5 h-5" />, color: 'text-indigo-400', premium: false, provider: 'DeepSeek' },
  { id: 'perplexity', name: 'Perplexity', version: 'Perplexity', icon: <Globe className="w-5 h-5" />, color: 'text-teal-400', premium: true, provider: 'Perplexity' },
  { id: 'anthropic', name: 'Anthropic', version: 'Claude 3.7', icon: <Feather className="w-5 h-5" />, color: 'text-orange-400', premium: true, provider: 'Anthropic' },
  { id: 'xai', name: 'xAI', version: 'Grok 4', icon: <X className="w-5 h-5" />, color: 'text-gray-500 dark:text-white', premium: true, provider: 'xAI' },
  { id: 'blackbox', name: 'Blackbox', version: 'Blackbox AI', icon: <Cpu className="w-5 h-5" />, color: 'text-purple-500', premium: false, provider: 'Blackbox' },
];

const MODEL_CHARACTERISTICS = {
    left: [
        { name: "ChatGPT 5", tag: "All Rounder Explainer", desc: "Great for questions, brainstorming, and clear step-by-step explanations", icon: <Bot className="w-6 h-6 text-emerald-400" />, color: "border-emerald-500/30" },
        { name: "Claude Sonnet 4", tag: "Co-Writing Master", desc: "Refines polished emails, essays, and scripts while keeping your style.", icon: <Feather className="w-6 h-6 text-orange-400" />, color: "border-orange-500/30" },
        { name: "Gemini 2.5 Pro", tag: "Long Context Master", desc: "Handles long documents and images, tracking full context and details.", icon: <Sparkles className="w-6 h-6 text-blue-400" />, color: "border-blue-500/30" }
    ],
    right: [
        { name: "Perplexity Sonar Pro", tag: "Live Web Researcher", desc: "Delivers fresh answers and news from credible, real-time sources.", icon: <Globe className="w-6 h-6 text-teal-400" />, color: "border-teal-500/30" },
        { name: "DeepSeek", tag: "Reasoning Specialist", desc: "Excels at logic, math, and coding with clear, detailed solutions.", icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />, color: "border-indigo-500/30" },
        { name: "Grok 4", tag: "Creative Powerhouse", desc: "Bold, unconventional ideas and punchy copy for trend-focused content.", icon: <X className="w-6 h-6 text-white" />, color: "border-gray-500/30" }
    ]
};

const LANDING_FEATURES: Feature[] = [
  { title: "Compare All Premium AIs at Once", desc: "Free AI models often deliver restricted and inferior answers. With Prism AI, you get access to multiple top-tier premium models, all in one place.", icon: <LayoutGrid className="w-6 h-6 text-purple-400" />, gradient: "from-purple-500/20 to-blue-500/20", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop", points: ["Save hours of manual comparison", "Customize your AI team instantly", "Never miss the most accurate answer again"] },
  { title: "Consensus & Prism Engine", desc: "The Prism Engine is designed to automatically select the most suitable AI model for your query, delivering a seamless and efficient experience.", icon: <Zap className="w-6 h-6 text-emerald-400" />, gradient: "from-emerald-500/20 to-green-500/20", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop", points: ["Faster decisions via automatic best-model selection", "Request alternatives without leaving the conversation", "Unified context across models"] },
  { title: "Prompt Boost", desc: "No need to craft the perfect question. Just write what you want, hit Enhance Prompt, and watch every AI respond with smarter, richer answers.", icon: <Sparkles className="w-6 h-6 text-amber-400" />, gradient: "from-amber-500/20 to-orange-500/20", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop", points: ["Turn rough ideas into perfect prompts", "Get 10x better responses instantly", "No prompt engineering skills needed"] },
  { title: "Avatars & Custom Personas", desc: "Introducing a brand-new feature: Avatars. Choose who you want to interact with — whether it's legendary figures or a dedicated expert team.", icon: <Users className="w-6 h-6 text-pink-400" />, gradient: "from-pink-500/20 to-rose-500/20", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop", points: ["Engage with historical figures", "Build a personalized expert team", "Get tailored advice and insights"] },
  { title: "Generate Images & Audio", desc: "Bring your creative ideas to life with AI-powered image generation and fast, accurate audio transcription.", icon: <ImageIcon className="w-6 h-6 text-cyan-400" />, gradient: "from-cyan-500/20 to-blue-500/20", image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2000&auto=format&fit=crop", points: ["Generate high-quality images", "Get instant, clear transcripts", "Effortlessly edit outputs"] },
  { title: "Custom Projects", desc: "Create unique projects with tailored system guidelines. Set 'Marketing Mode' or 'Code Review Mode' once.", icon: <FolderCog className="w-6 h-6 text-red-400" />, gradient: "from-red-500/20 to-orange-500/20", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop", points: ["One-time setup keeps all AI replies on-brand", "Instantly switch modes across chats", "Maintain consistent tone and rules"] }
];

const FAQS = [
  { q: "How is Prism AI different from subscribing to each AI separately?", a: "Prism AI brings together the world’s most powerful AI models — Grok 4, ChatGPT 5, Gemini 2.5 Pro, DeepSeek, Claude Sonnet 4, and Perplexity Sonar Pro — in one place." },
  { q: "Can I choose which AI models to use?", a: "Yes! You can toggle AI models on or off at any time during your chat and turn them back on later without losing your chat history." },
  { q: "Do I get unlimited messages?", a: "You get 3,000,000 tokens per month with your subscription." },
  { q: "Do you offer refunds?", a: "No. All payments are non-refundable, regardless of usage. You may cancel any time to stop future billing (see our Terms & Conditions)." },
  { q: "How can I manage or cancel my subscription?", a: "Log in to Prism AI, go to Settings, and select your subscription management option." },
  { q: "Will I get free upgrades when new AI versions are released?", a: "Yes! If ChatGPT releases Model 6 or another AI provider launches a higher version, you will get access at no extra cost." }
];

const CARDS = [
  { title: 'Albert Einstein', desc: 'Revolutionized science, imagination beyond known limits.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg' },
  { title: 'Career Coach', desc: 'Assists in achieving career goals with guidance and planning.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const HERO_STATES = [
  { text: "One Chat.", subtext: "Unified Interface for all models.", type: 'chat' },
  { text: "One Subscription.", subtext: "Pay once, access everything.", type: 'sub' },
];

const Switch = ({ isOn, onToggle, id }: { isOn: boolean; onToggle: (val: boolean) => void; id: string }) => (
  <motion.div
    className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer ${isOn ? 'bg-gradient-to-r from-blue-500 to-green-400' : 'bg-gray-700'}`}
    onClick={(e) => {
      e.stopPropagation();
      onToggle(!isOn);
    }}
    layoutId={`switch-${id}`}
  >
    <motion.div
      className="bg-white w-5 h-5 rounded-full shadow-md"
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      animate={{ x: isOn ? 20 : 0 }}
    />
  </motion.div>
);

const TypewriterText = ({ text, speed = 20 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{displayedText}</span>;
};

const LandingSection = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`max-w-7xl mx-auto px-6 py-24 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'signin' | 'chat'>('landing'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModelModal, setShowModelModal] = useState(false);
  const [, setShowPaymentModal] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | null>(null); 
    
  const [activeModels, setActiveModels] = useState<string[]>(MODELS.map(m => m.id));
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMultiChat, setIsMultiChat] = useState(true); 
  const [isSuperFiesta, setIsSuperFiesta] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);

  // Login State
  const [email, setEmail] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Dynamic Title & Favicon Effect ---
  useEffect(() => {
    // 1. Set Page Title
    document.title = "Prism AI | Unified Intelligence";

    // 2. Set Dynamic Favicon
    const setFavicon = () => {
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2334d399'/%3E%3Cstop offset='100%25' stop-color='%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='8' fill='url(%23g)'/%3E%3Cpath d='M16 6L6 24h20L16 6z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E`;
    };
    setFavicon();
  }, []);

  useEffect(() => {
    if (view === 'landing') {
      const interval = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % HERO_STATES.length);
      }, 4000); 
      return () => clearInterval(interval);
    }
  }, [view]);

  const theme = {
    bg: isDark ? 'bg-[#050505]' : 'bg-gray-50',
    text: isDark ? 'text-white' : 'text-gray-900',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    border: isDark ? 'border-white/10' : 'border-black/10',
    cardBg: isDark ? 'bg-[#111]' : 'bg-white',
    navBg: isDark ? 'bg-[#050505]/80' : 'bg-white/80',
    hoverBg: isDark ? 'hover:bg-white/5' : 'hover:bg-black/5',
    inputBg: isDark ? 'bg-[#161616]' : 'bg-gray-100',
    sidebarBg: isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50',
    chatUserBubble: isDark ? 'bg-[#2a2a2a]' : 'bg-blue-600 text-white',
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignIn = (provider: string) => {
    if (provider === 'email' && !email.trim()) {
        alert("Please enter a valid email address.");
        return;
    }
    setProcessing(true);
    setTimeout(() => {
        setProcessing(false);
        setView('chat');
    }, 1500); 
  };

  const toggleModel = (id: string) => {
    const model = MODELS.find(m => m.id === id);
    if (model?.premium && !isPremium) {
      if (!activeModels.includes(id)) {
        alert("This model is locked! Please click 'Upgrade' in the modal to unlock.");
        return;
      }
    }
    
    if (activeModels.includes(id)) {
      setActiveModels(activeModels.filter(m => m !== id));
    } else {
      setActiveModels([...activeModels, id]);
    }
  };

  const handleModelClick = (model: Model) => {
    if (model.premium && !isPremium) {
        alert("This model is locked! Please click 'Upgrade' to unlock.");
        return;
    }
    toggleModel(model.id);
  };

  const handleUpgrade = () => {
      setIsPremium(true);
      alert("🎉 Premium Activated! All 7 Models Unlocked.");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setAttachment(e.target.files[0]);
          setShowAttachMenu(false);
      }
  };

  const triggerFileInput = () => {
      fileInputRef.current?.click();
  };

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;
    
    const content = attachment ? `[Attached: ${attachment.name}] ${input}` : input;
    const userMsg: Message = { role: 'user', content: content, timestamp: new Date() };
    
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setAttachment(null);
    setProcessing(true);
    
    if (isSuperFiesta) {
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'synthesis_process', 
                content: currentInput,
                timestamp: new Date()
            }]);
            setProcessing(false);
        }, 500);
        return;
    }

    setTimeout(() => {
      const modelsToReply = isMultiChat ? activeModels : [activeModels[0]];
      const newResponses: Message[] = modelsToReply.map(modelId => {
        const modelInfo = MODELS.find(m => m.id === modelId);
        return {
          role: 'assistant',
          modelId,
          modelName: modelInfo?.name,
          content: generateSmartResponse(modelInfo?.name, currentInput),
          timestamp: new Date()
        };
      });
      setMessages(prev => [...prev, ...newResponses]);
      setProcessing(false);
    }, 1000);
  };

  const AttachMenu = ({ dropUp = true }) => (
    <motion.div 
      initial={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 }}
      className={`absolute ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'} left-0 w-64 ${theme.cardBg} border ${theme.border} rounded-xl shadow-2xl overflow-hidden z-30 flex flex-col py-2`}
    >
      <button onClick={triggerFileInput} className={`flex items-center gap-3 px-4 py-2.5 ${theme.hoverBg} ${theme.text} text-sm transition-colors`}><Paperclip className="w-4 h-4 text-emerald-500" /> Attach Files</button>
      <div className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-wider ${theme.textMuted}`}>Generate</div>
      <button onClick={triggerFileInput} className={`flex items-center gap-3 px-4 py-2.5 ${theme.hoverBg} ${theme.text} text-sm transition-colors`}><ImageIcon className="w-4 h-4 text-blue-400" /> Image</button>
      <button className={`flex items-center gap-3 px-4 py-2.5 ${theme.hoverBg} ${theme.text} text-sm transition-colors`}><FileText className="w-4 h-4 text-orange-400" /> Document</button>
    </motion.div>
  );

  const LegalModal = ({ title, content, onClose }: { title: string; content: string; onClose: () => void }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl max-h-[85vh] ${theme.cardBg} rounded-2xl border ${theme.border} shadow-2xl flex flex-col overflow-hidden`}
      >
        <div className={`p-6 border-b ${theme.border} flex justify-between items-center`}>
          <h2 className={`text-xl font-bold ${theme.text}`}>{title}</h2>
          <button onClick={onClose} className={`p-2 ${theme.hoverBg} rounded-full transition-colors`}>
            <X className={`w-5 h-5 ${theme.textMuted}`} />
          </button>
        </div>
        <div className={`p-6 overflow-y-auto text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed whitespace-pre-wrap`}>
          {content}
        </div>
        <div className={`p-4 border-t ${theme.border} ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
          <button onClick={onClose} className={`w-full py-2.5 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} font-bold rounded-xl`}>
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (view === 'landing') {
    return (
      <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-emerald-500/30 scroll-smooth transition-colors duration-300`}>
        <style>{`@keyframes shine { 100% { left: 125%; } } @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
        <nav className={`fixed top-0 w-full z-50 ${theme.navBg} backdrop-blur-md border-b ${theme.border} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                <PrismLogo className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg tracking-tight leading-none">Prism AI</span>
              </div>
            </div>
            <div className={`hidden md:flex items-center gap-8 text-sm ${theme.textMuted} font-medium`}>
              <button onClick={() => scrollToSection('features')} className={`hover:${theme.text} transition-colors`}>Features</button>
              <button onClick={() => scrollToSection('pricing')} className={`hover:${theme.text} transition-colors`}>Pricing</button>
              <button onClick={() => scrollToSection('faq')} className={`hover:${theme.text} transition-colors`}>FAQ</button>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full ${theme.hoverBg} transition-colors`}>{isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}</button>
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setView('signin')} className="relative px-6 py-2 rounded-full font-bold text-sm overflow-hidden group"><span className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500 to-blue-600 group-hover:from-emerald-400 group-hover:to-blue-500 transition-all" /><span className="relative z-10 text-white flex items-center gap-2">Log In <LogIn className="w-4 h-4" /></span></motion.button>
            </div>
          </div>
        </nav>

        <div className="relative pt-32 pb-20 overflow-hidden">
           <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] ${!isDark && 'opacity-50'}`} />
           <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] ${!isDark && 'opacity-50'}`} />
           <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className={`inline-block py-1 px-3 rounded-full bg-white/5 border ${theme.border} text-gray-300 text-xs font-bold tracking-wider mb-6`}>
                Designed & Built by <a href="https://anujtiwari.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Anuj Tiwari</a>
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight min-h-[160px] md:min-h-[180px]">World's Most Powerful AIs. <br /><AnimatePresence mode="wait"><motion.span key={HERO_STATES[heroIndex].text} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 block">{HERO_STATES[heroIndex].text}</motion.span></AnimatePresence></h1>
              <p className={`text-xl ${theme.textMuted} mb-10 max-w-2xl mx-auto leading-relaxed`}>Stop switching tabs. Access GPT-5, Gemini 2.5 Pro, Claude Sonnet 4, and more in a single, unified interface.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => setView('signin')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-lg font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">Start Free Trial <ArrowRight className="w-5 h-5" /></button>
                <button className={`w-full sm:w-auto px-8 py-4 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'} border ${theme.border} rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2`}><PlayCircle className="w-5 h-5" /> Watch Demo</button>
              </div>
            </motion.div>
            <div className="relative mt-20 h-[400px] md:h-[500px] w-full max-w-5xl mx-auto">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={`absolute inset-0 rounded-xl border border-emerald-500/30 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} shadow-2xl shadow-emerald-900/20 overflow-hidden flex flex-col items-center justify-center p-8`}>
                   <div className="text-center mb-8">
                     <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><PrismLogo className="w-8 h-8 text-emerald-400" /></div>
                     <h3 className="text-2xl font-bold mb-2">Prism Pro Subscription</h3>
                     <p className={theme.textMuted}>Unlock the power of 7 premium AIs</p>
                   </div>
                   <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
                     {MODELS.map((m) => (
                       <div key={m.id} className={`${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'} ${m.id === 'blackbox' ? 'col-start-2' : ''} p-3 rounded-lg border ${theme.border} flex items-center gap-3`}>
                         <div className={`w-8 h-8 rounded-md flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-white border border-gray-200'} ${m.color}`}>{m.icon}</div>
                         <div className="flex-1"><div className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{m.name}</div><div className="text-[10px] text-gray-500">Unlocked</div></div>
                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       </div>
                     ))}
                   </div>
                   <div className="mt-8 flex items-center gap-4">
                     <div className="text-4xl font-bold">$12<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                     <button onClick={() => scrollToSection('pricing')} className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold text-sm">Start Now</button>
                   </div>
                </motion.div>
            </div>
          </div>
        </div>

        <div id="features" className={`${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'} border-y ${theme.border} scroll-mt-20 relative transition-colors duration-300`}>
           <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">One Window. Six Perspectives. <br /><span className={theme.textMuted}>Achieve Optimal Efficiency.</span></h2>
            <p className={`${theme.textMuted} max-w-2xl mx-auto`}>Scroll down to see how Prism AI transforms your workflow.</p>
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
             {LANDING_FEATURES.map((feature, idx) => (
               <div key={idx} className="sticky top-0 h-screen flex items-center justify-center" style={{ zIndex: idx + 1, top: '80px', marginBottom: idx === LANDING_FEATURES.length - 1 ? '100px' : '0' }}>
                 <div className={`${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} rounded-3xl border ${theme.border} shadow-2xl overflow-hidden w-full h-[550px] flex flex-col transition-colors duration-300`}>
                    <div className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-4 md:gap-8 p-6 md:p-8 h-full`}>
                      <div className="flex-1 space-y-4 overflow-y-auto max-h-full pr-2">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center border ${theme.border} shadow-lg flex-shrink-0`}>{React.cloneElement(feature.icon, { className: "w-5 h-5 md:w-6 md:h-6 text-white" })}</div>
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight">{feature.title}</h3>
                        <p className={`${theme.textMuted} text-sm md:text-base leading-relaxed`}>{feature.desc}</p>
                        <ul className="space-y-2 mt-2">{feature.points.map((point, i) => (<li key={i} className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /><span>{point}</span></li>))}</ul>
                      </div>
                      <div className="flex-1 w-full self-stretch flex items-center justify-center h-[250px] md:h-full overflow-hidden rounded-2xl border ${theme.border} relative group shadow-lg">
                           <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/80 via-black/20 to-transparent' : 'from-white/80 via-white/20 to-transparent'} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                           <div className="absolute bottom-4 left-4 right-4">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${theme.border} ${isDark ? 'bg-black/40 text-white' : 'bg-white/40 text-black'} text-xs font-medium`}>{React.cloneElement(feature.icon, { className: "w-3 h-3" })}<span>{feature.title}</span></div>
                           </div>
                      </div>
                    </div>
                 </div>
               </div>
             ))}
          </div>
          <div className="h-[20vh]"></div>
        </div>

        <LandingSection id="pricing" className="text-center scroll-mt-20">
           <h2 className="text-3xl md:text-5xl font-bold mb-4">Get 7 Premium AI Models <br /> for Half the Price of One</h2>
           <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-12 overflow-hidden">
               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent -translate-x-full" style={{ animation: 'shimmer 2s infinite linear' }} />
               <span className="relative z-10 flex items-center gap-2"><span>🔥</span> Limited time: Save 90% compared to individual subscriptions</span>
           </div>
           <div className="flex flex-col md:flex-row gap-6 items-center max-w-6xl mx-auto">
                <div className={`md:w-1/3 w-full ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} rounded-3xl p-8 border ${theme.border} text-left opacity-80 scale-95`}>
                     <h3 className="font-bold text-lg mb-1">Individual AI Subscriptions</h3>
                     <div className="text-3xl font-bold text-red-400 mb-2">$110 <span className="text-lg text-gray-500 font-normal line-through">($10,000)</span></div>
                     <p className={`text-xs ${theme.textMuted} mb-6`}>What you're paying now</p>
                     <div className="space-y-4">
                         {MODELS.slice(0,5).map((m,i) => (
                             <div key={i} className="flex justify-between text-sm"><span className="flex items-center gap-2">{m.icon} {m.name}</span> <span className="text-red-400">$20/mo</span></div>
                         ))}
                     </div>
                </div>
                 <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center z-10 -my-6 md:-mx-6 md:my-0 shrink-0 shadow-xl"><span className="font-bold text-gray-500 text-xs">VS</span></div>
                <div className={`md:flex-1 w-full bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl p-1 border border-emerald-500/30 relative overflow-hidden shadow-2xl shadow-emerald-900/20`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500" />
                    <div className="bg-[#0a0a0a] rounded-[22px] p-8 h-full relative">
                        <div className="flex items-center gap-2 mb-8">
                             <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center"><PrismLogo className="w-5 h-5 text-white" /></div>
                             <span className="font-bold text-xl text-white">Prism AI</span>
                        </div>
                        <div className="flex gap-4 mb-8">
                            <div className="flex-1 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/20 transition-all">
                                 <div className="text-2xl font-bold text-white">₹999<span className="text-sm font-normal text-gray-500">/Month</span></div>
                                 <div className="text-sm text-gray-500 mt-1">Monthly</div>
                            </div>
                            <div className="flex-1 border border-emerald-500/50 bg-emerald-500/5 rounded-xl p-4 relative cursor-pointer">
                                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full">MOST POPULAR</div>
                                 <div className="text-2xl font-bold text-white">₹8,999<span className="text-sm font-normal text-gray-500">/Year</span></div>
                                 <div className="text-xs text-emerald-400 mt-1">Yearly (Save 25%)</div>
                                 <div className="w-4 h-4 rounded-full bg-emerald-500 ml-auto mt-2 flex items-center justify-center"><Check className="w-3 h-3 text-black" /></div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <button onClick={() => setShowPaymentModal(true)} className="relative overflow-hidden w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 group">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" style={{ animation: 'shimmer 2s infinite linear' }} />
                                <span className="relative z-10 flex items-center gap-2">Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                            </button>
                            <div className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5 font-medium"><Lock className="w-3 h-3 text-emerald-500" /> Payments are processed by TagMango using Razorpay & Stripe</div>
                        </div>

                        <div className="relative bg-gradient-to-r from-yellow-600/20 to-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 mb-8 flex items-center justify-center gap-2 text-xs font-bold text-yellow-500 tracking-wide overflow-hidden">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -translate-x-full" style={{ animation: 'shimmer 2.5s infinite linear' }} />
                            <span className="relative z-10 flex items-center gap-2"><span>🎁</span> ULTIMATE PROMPTBOOK & COMMUNITY ACCESS</span>
                        </div>

                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-500" /></div>All premium AI models & Super Fiesta</div>
                            <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-500" /></div>Side-by-side comparison</div>
                            <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-500" /></div>3 million tokens/month</div>
                            <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-500" /></div>Instant prompt enhancement</div>
                            <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-500" /></div>Image generation & Audio transcription</div>
                            <div className="flex items-center gap-3 text-gray-300 text-sm"><div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3 h-3 text-emerald-500" /></div>Avatars - your personalised expert team</div>
                        </div>
                    </div>
                </div>
           </div>
        </LandingSection>

        <section className={`py-32 ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'} overflow-hidden relative`}>
             <div className="max-w-7xl mx-auto px-6 relative z-10">
                 <div className="text-center mb-20"><h2 className="text-3xl md:text-5xl font-bold mb-4">Pick the best characteristics <br /> of each AI model</h2></div>
                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-16">
                     <div className="flex flex-col gap-6 w-full md:w-1/3">
                        {MODEL_CHARACTERISTICS.left.map((model, idx) => (
                             <div key={idx} className={`relative p-6 rounded-2xl border ${theme.border} ${theme.cardBg} hover:border-emerald-500/50 transition-colors group`}>
                                 <div className="flex items-center gap-4 mb-3"><div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10`}>{model.icon}</div><div><h3 className="font-bold text-lg">{model.name}</h3><span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{model.tag}</span></div></div>
                                 <p className={`text-sm ${theme.textMuted} leading-relaxed`}>{model.desc}</p>
                                 <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-[2px] bg-gradient-to-r from-emerald-500/50 to-transparent" /><div className="hidden md:block absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-emerald-500 translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             </div>
                        ))}
                     </div>
                     <div className="relative w-64 h-64 flex items-center justify-center shrink-0 my-8 md:my-0">
                         <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[ping_3s_linear_infinite]" /><div className="absolute inset-4 rounded-full border border-emerald-500/30 animate-[ping_3s_linear_infinite_1s]" /><div className="absolute inset-8 rounded-full border border-emerald-500/40 animate-[ping_3s_linear_infinite_2s]" /><div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl" />
                         <div className="relative z-10 w-32 h-32 bg-black rounded-full border border-emerald-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]"><PrismLogo className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" /></div>
                     </div>
                     <div className="flex flex-col gap-6 w-full md:w-1/3">
                        {MODEL_CHARACTERISTICS.right.map((model, idx) => (
                             <div key={idx} className={`relative p-6 rounded-2xl border ${theme.border} ${theme.cardBg} hover:border-emerald-500/50 transition-colors group text-left`}>
                                 <div className="flex items-center justify-start gap-4 mb-3 flex-row"><div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 order-2 lg:order-1`}>{model.icon}</div><div className="order-1 lg:order-2"><h3 className="font-bold text-lg">{model.name}</h3><span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{model.tag}</span></div></div>
                                 <p className={`text-sm ${theme.textMuted} leading-relaxed`}>{model.desc}</p>
                                 <div className="hidden md:block absolute top-1/2 -left-8 w-8 h-[2px] bg-gradient-to-l from-emerald-500/50 to-transparent" /><div className="hidden md:block absolute top-1/2 -left-8 w-2 h-2 rounded-full bg-emerald-500 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                             </div>
                        ))}
                     </div>
                 </div>
             </div>
        </section>

        <LandingSection id="faq" className="scroll-mt-20">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2></div>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((item, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`${theme.cardBg} border ${theme.border} rounded-xl overflow-hidden cursor-pointer ${theme.hoverBg} transition-colors shadow-sm`}>
                <div className="p-6 flex justify-between items-center gap-4"><h3 className="font-bold text-lg">{item.q}</h3><ChevronDown className={`w-5 h-5 ${theme.textMuted} transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} /></div>
                <AnimatePresence>{openFaq === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><div className={`px-6 pb-6 ${theme.textMuted} leading-relaxed border-t ${theme.border} pt-4`}>{item.a}</div></motion.div>)}</AnimatePresence>
              </div>
            ))}
          </div>
        </LandingSection>

        <section className="py-32 relative overflow-hidden">
             <div className={`absolute inset-0 ${isDark ? 'bg-[#050505]' : 'bg-gray-900'} z-0`} />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
             <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">Ready to experience smarter & <br /> more accurate AI answers?</h2>
                 <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Gain an edge with our exclusive Promptbook, designed to provide you with tailored insights and guidance across every industry and subject.</p>
                 <button onClick={() => setView('signin')} className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 opacity-100 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                    <span className="relative flex items-center gap-2 text-lg">Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                 </button>
                 <div className="mt-24 flex flex-col items-center gap-3 opacity-80">
                     <PrismLogo className="w-8 h-8 text-emerald-400" /><span className="text-white text-lg font-bold">Prism AI</span>
                     <div className="flex items-center gap-2 text-xs text-gray-500 mt-2"><Send className="w-3 h-3" /> support@prismai.ai</div>
                 </div>
             </div>
        </section>

        <footer className={`border-t ${theme.border} ${isDark ? 'bg-[#020202]' : 'bg-white'} py-8 text-xs ${theme.textMuted}`}>
           <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex gap-6"><a href="#" onClick={(e) => { e.preventDefault(); setActiveLegalDoc('privacy'); }} className={`hover:${theme.text} transition-colors`}>Privacy Policy</a><a href="#" onClick={(e) => { e.preventDefault(); setActiveLegalDoc('terms'); }} className={`hover:${theme.text} transition-colors`}>Terms & Conditions</a></div>
             <div>© 2025 Prism AI. All rights reserved.</div>
           </div>
        </footer>
        <AnimatePresence>
          {activeLegalDoc && <LegalModal title={activeLegalDoc === 'privacy' ? "Privacy Policy" : "Terms & Conditions"} content={activeLegalDoc === 'privacy' ? PRIVACY_CONTENT : TERMS_CONTENT} onClose={() => setActiveLegalDoc(null)} />}
        </AnimatePresence>
      </div>
    );
  }

  // --- Sign In & Chat Views ---
  // (Rest of the component handles Sign In and Chat views using same strict types)
  if (view === 'signin') {
      return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4 font-sans ${theme.text} relative overflow-hidden transition-colors duration-300`}>
        <div className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] ${!isDark && 'opacity-60'}`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] ${!isDark && 'opacity-60'}`} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`w-full max-w-md ${theme.cardBg} border ${theme.border} rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10`}>
          <button onClick={() => setView('landing')} className={`absolute top-4 left-4 ${theme.textMuted} hover:${theme.text}`}><ArrowRight className="w-5 h-5 rotate-180" /></button>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20"><PrismLogo className="w-8 h-8 text-white" /></div>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">Log In to Prism</h1>
            <p className={`${theme.textMuted} text-sm`}>Choose how you would like to log in</p>
          </div>

          <button onClick={() => handleSignIn('google')} className={`w-full ${isDark ? 'bg-[#1a1a1a] hover:bg-[#252525]' : 'bg-gray-100 hover:bg-gray-200'} ${theme.text} font-medium py-3 px-4 rounded-lg border ${theme.border} flex items-center justify-center gap-3 transition-all duration-200 mb-6 group`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            {processing ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="relative flex py-2 items-center mb-6"><div className={`flex-grow border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}></div><span className={`flex-shrink-0 mx-4 text-xs ${theme.textMuted} uppercase tracking-widest`}>Or continue with email</span><div className={`flex-grow border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}></div></div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className={`text-xs ${theme.textMuted} ml-1`}>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className={`w-full ${theme.inputBg} border ${theme.border} rounded-lg px-4 py-3 ${theme.text} focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${isDark ? 'placeholder-gray-600' : 'placeholder-gray-400'}`}
              />
            </div>
            <button onClick={() => handleSignIn('email')} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20">
              <span className="text-sm">{processing ? "Verifying..." : "Log In with Email"}</span>
            </button>
          </div>
        </motion.div>
      </div>
      );
  }

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#0f0f0f] text-gray-100' : 'bg-white text-gray-900'} overflow-hidden font-sans transition-colors duration-300`}>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 150 }}
            className={`w-[280px] ${theme.sidebarBg} border-r ${theme.border} flex flex-col flex-shrink-0 z-20`}
          >
            {/* Sidebar content */}
            <div className="p-5 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-900/20">
                <PrismLogo className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col justify-center">
                <span className={`font-bold text-lg tracking-tight leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>Prism AI</span>
                <span className={`text-[10px] ${theme.textMuted} font-medium tracking-wider mt-0.5 flex items-center gap-1`}>
                    Designed & Built by <a href="https://anujtiwari.vercel.app/" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-bold hover:underline`}>Anuj Tiwari</a>
                </span>
              </div>
            </div>

            <div className="px-4 mb-4">
              <div className={`${isDark ? 'bg-[#161616] text-gray-400' : 'bg-white border-gray-200 text-gray-500'} flex items-center gap-2 px-3 py-2.5 rounded-lg border ${theme.border} focus-within:${theme.text} focus-within:${isDark ? 'border-white/10' : 'border-gray-300'} transition-colors`}>
                <Search className="w-4 h-4" />
                <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm w-full placeholder-current" />
              </div>
            </div>

            <div className="px-4 mb-6">
              <button className={`w-full flex items-center gap-2 text-sm font-medium ${theme.textMuted} hover:${theme.text} ${theme.hoverBg} px-3 py-2 rounded-lg transition-colors`}>
                <MessageSquare className="w-4 h-4" /> New chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-6">
              <div>
                <div className={`flex items-center justify-between text-xs font-semibold ${theme.textMuted} uppercase tracking-wider mb-3 px-2`}>
                  <span>Avatars</span>
                  <div className="flex gap-1">
                    <Plus className={`w-3 h-3 cursor-pointer hover:${theme.text}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className={`flex items-center gap-3 px-2 py-2 rounded-lg ${theme.hoverBg} cursor-pointer text-sm ${theme.textMuted} hover:${theme.text} transition-colors`}>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
                    <span>Creative Writer</span>
                  </div>
                </div>
              </div>

              <div>
                <div className={`flex items-center justify-between text-xs font-semibold ${theme.textMuted} uppercase tracking-wider mb-3 px-2`}>
                  <span>Projects</span>
                  <Plus className={`w-3 h-3 cursor-pointer hover:${theme.text}`} />
                </div>
              </div>
            </div>

            <div className={`p-4 border-t ${theme.border} ${theme.sidebarBg}`}>
              <div className={`${theme.cardBg} rounded-xl p-4 border ${theme.border} mb-4`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-medium text-sm ${theme.text}`}>{isPremium ? "Premium Plan" : "Free Plan"}</h3>
                </div>
                <div className={`text-xs ${theme.textMuted} mb-3`}>{isPremium ? "Unlimited Access" : "0 / 3 messages used"}</div>
                <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} h-1 rounded-full mb-3 overflow-hidden`}>
                  <div className={`w-0 ${isPremium ? 'w-full bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-green-500'} h-full transition-all`} />
                </div>
                {!isPremium && <button 
                  onClick={() => setIsPremium(true)}
                  className={`w-full py-2 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white border-gray-200 hover:bg-gray-50'} border ${theme.border} rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors ${theme.text}`}
                >
                  <Zap className="w-3 h-3 text-yellow-400" /> Upgrade plan
                </button>}
              </div>

              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">AT</div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${theme.text}`}>Anuj Tiwari</div>
                </div>
                <Settings className={`w-4 h-4 ${theme.textMuted} hover:${theme.text} cursor-pointer`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col relative min-w-0">
        <header className={`h-16 border-b ${theme.border} ${theme.navBg} backdrop-blur-md flex items-center justify-between px-4 z-10 sticky top-0`}>
          <div className="flex items-center gap-2">
             {!isSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(true)} className={`p-2 ${theme.hoverBg} rounded-lg`}>
                  <Menu className={`w-5 h-5 ${theme.textMuted}`} />
                </button>
             )}
             <div className="flex items-center gap-4 overflow-x-auto no-scrollbar max-w-[70vw] md:max-w-[60vw] lg:max-w-[70vw]">
               {activeModels.map((id) => {
                 const model = MODELS.find(m => m.id === id);
                 return (
                   <div key={id} className={`flex-shrink-0 flex items-center gap-2 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'} border ${theme.border} rounded-full pl-2 pr-3 py-1.5`}>
                     <div className={`${model?.color}`}>{model?.icon}</div>
                     <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-nowrap`}>{model?.version}</span>
                     <Switch isOn={true} onToggle={() => toggleModel(id)} id={`top-${id}`} />
                   </div>
                 );
               })}
               <button onClick={() => setShowModelModal(true)} className={`flex-shrink-0 w-8 h-8 rounded-full border border-dashed ${isDark ? 'border-gray-600 hover:bg-white/5' : 'border-gray-300 hover:bg-black/5'} flex items-center justify-center transition-all`}>
                 <Plus className={`w-4 h-4 ${theme.textMuted}`} />
               </button>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded-lg ${theme.hoverBg} transition-colors`}>{isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}</button>
             <button onClick={() => setView('landing')} className={`text-xs ${theme.textMuted} hover:${theme.text} px-3 py-1`}>Log out</button>
            {isPremium && <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 border border-yellow-500/30 px-2 py-1 rounded bg-yellow-500/10">PRO</span>}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 relative">
          <div className={`absolute inset-0 bg-[linear-gradient(to_right,${isDark ? '#80808012' : '#00000008'}_1px,transparent_1px),linear-gradient(to_bottom,${isDark ? '#80808012' : '#00000008'}_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none`} />

          {messages.length === 0 ? (
            <div className="max-w-5xl mx-auto h-full flex flex-col items-center justify-center pb-20">
              <div className="flex items-center gap-3 mb-8">
                 <motion.button 
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setIsMultiChat(!isMultiChat)}
                   className={`px-4 py-2 rounded-full border flex items-center gap-2 text-sm font-medium transition-all ${isMultiChat ? (isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-black/5 border-black/10 text-black') : 'bg-transparent border-white/10 text-gray-500'}`}
                 >
                   <LayoutGrid className="w-4 h-4" /> Multi-Chat {isMultiChat ? "(ON)" : "(OFF)"}
                 </motion.button>
                 <motion.button 
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setIsSuperFiesta(!isSuperFiesta)}
                   className={`px-4 py-2 rounded-full border flex items-center gap-2 text-sm font-medium transition-all ${isSuperFiesta ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-500/30 text-emerald-500' : 'bg-transparent border-white/10 text-gray-500'}`}
                 >
                    <Zap className={`w-4 h-4 ${isSuperFiesta ? 'text-emerald-500 fill-emerald-500' : ''}`} /> Prism Synthesis
                 </motion.button>
              </div>

              <div className={`w-full max-w-2xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} border ${theme.border} rounded-2xl p-2 shadow-2xl mb-12 relative group`}>
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur ${input ? 'opacity-60' : ''}`}></div>
                <div className={`relative ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} rounded-xl flex items-center gap-3 p-2`}>
                    <div className="relative">
                        <button onClick={() => setShowAttachMenu(!showAttachMenu)} className={`p-2 ${theme.hoverBg} rounded-lg ${theme.textMuted} transition-colors ${showAttachMenu ? theme.text : ''}`}>
                            <Plus className={`w-5 h-5 ${showAttachMenu ? 'rotate-45' : ''} transition-transform`} />
                        </button>
                        <AnimatePresence>
                            {showAttachMenu && <AttachMenu dropUp={false} />}
                        </AnimatePresence>
                    </div>

                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isSuperFiesta ? "Ask Prism to synthesize a definitive answer..." : "Ask me anything..."}
                        className={`flex-1 bg-transparent border-none outline-none ${theme.text} placeholder-gray-500 h-10`}
                    />
                    <div className="flex items-center gap-1">
                        <button className={`p-2 ${theme.hoverBg} rounded-lg ${theme.textMuted}`}><Mic className="w-4 h-4" /></button>
                        <button onClick={handleSend} className={`p-2 rounded-lg transition-all ${input.trim() || attachment ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : `${theme.hoverBg} ${theme.textMuted} cursor-not-allowed`}`}>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {/* File Attachment Preview */}
                {attachment && (
                    <div className="absolute -top-12 left-0 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                        <Paperclip className="w-3 h-3" /> {attachment.name}
                        <button onClick={() => setAttachment(null)}><X className="w-3 h-3 hover:text-white" /></button>
                    </div>
                )}
              </div>

              <div className="w-full max-w-4xl px-4">
                <div className="flex justify-between items-end mb-4">
                    <h2 className={`text-lg font-semibold ${theme.text}`}>Explore</h2>
                    <button className={`text-sm ${theme.textMuted} hover:${theme.text} flex items-center gap-1`}>See more <div className="w-4 h-4 rotate-[-90deg]">&darr;</div></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CARDS.map((card, i) => (
                        <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }} className={`${isDark ? 'bg-[#161616]' : 'bg-white'} border ${theme.border} rounded-2xl p-5 flex gap-5 cursor-pointer ${theme.hoverBg} transition-all group relative overflow-hidden shadow-sm`}>
                            <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-white/5' : 'from-black/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className={`w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 ${theme.border} group-hover:border-emerald-500/50 transition-colors`}>
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 z-10">
                                <h3 className={`font-bold ${theme.text} mb-1 group-hover:text-emerald-500 transition-colors`}>{card.title}</h3>
                                <p className={`text-sm ${theme.textMuted} leading-relaxed`}>{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={`max-w-6xl mx-auto pb-32 ${isMultiChat ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-6'}`}>
                {messages.map((msg, idx) => {
                    if (msg.role === 'user') {
                        return (
                            <div key={idx} className={`${isMultiChat ? 'col-span-full' : ''} flex justify-end mb-6`}>
                                <div className={`${theme.chatUserBubble} px-4 py-3 rounded-2xl rounded-tr-sm max-w-2xl border ${theme.border} shadow-sm`}>
                                    {msg.content}
                                </div>
                            </div>
                        )
                    } else if (msg.role === 'synthesis_process') {
                        return (
                           <div key={idx} className="col-span-full mb-6">
                              <PrismSynthesisCard query={msg.content} isDark={isDark} />
                           </div>
                        );
                    } else if (msg.role === 'synthesis') {
                        return null; 
                    } else {
                        const model = MODELS.find(m => m.id === msg.modelId);
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`${isMultiChat ? 'w-full h-full' : 'max-w-3xl'} ${theme.cardBg} border ${theme.border} rounded-2xl p-5 flex flex-col gap-3 hover:border-emerald-500/20 transition-colors shadow-sm`}
                            >
                                <div className={`flex items-center justify-between border-b ${theme.border} pb-3 mb-1`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`${model?.color || 'text-gray-400'}`}>{model?.icon}</div>
                                        <span className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{msg.modelName}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className={`${theme.textMuted} hover:${theme.text}`}><MoreHorizontal className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className={`${theme.text} text-sm leading-relaxed flex-grow`}>
                                    <TypewriterText text={msg.content} speed={5} />
                                </div>
                            </motion.div>
                        );
                    }
                })}
                {processing && (
                    <div className="col-span-full flex justify-center py-4">
                        <div className={`flex items-center gap-2 ${theme.textMuted} text-sm`}>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Cpu className="w-4 h-4" />
                            </motion.div>
                            Processing across Neural Nodes...
                        </div>
                    </div>
                )}
            </div>
          )}

           {messages.length > 0 && (
               <div className="absolute bottom-6 left-4 right-4 max-w-4xl mx-auto">
                    <div className={`relative ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'} border ${theme.border} rounded-2xl p-2 shadow-2xl`}>
                        {attachment && (
                            <div className="absolute -top-12 left-0 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                                <Paperclip className="w-3 h-3" /> {attachment.name}
                                <button onClick={() => setAttachment(null)}><X className="w-3 h-3 hover:text-white" /></button>
                            </div>
                        )}
                        <div className={`relative ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} rounded-xl flex items-center gap-3 p-2`}>
                            <div className="relative">
                                <button onClick={() => setShowAttachMenu(!showAttachMenu)} className={`p-2 ${theme.hoverBg} rounded-lg ${theme.textMuted} transition-colors ${showAttachMenu ? theme.text : ''}`}>
                                    <Plus className={`w-5 h-5 ${showAttachMenu ? 'rotate-45' : ''} transition-transform`} />
                                </button>
                                <AnimatePresence>
                                    {showAttachMenu && <AttachMenu dropUp={true} />}
                                </AnimatePresence>
                            </div>
                            <input 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={isSuperFiesta ? "Ask Prism to synthesize a definitive answer..." : "Send a follow up..."}
                                className={`flex-1 bg-transparent border-none outline-none ${theme.text} placeholder-gray-500 h-10`}
                            />
                            <button onClick={handleSend} className={`p-2 rounded-lg transition-all ${input.trim() || attachment ? 'bg-emerald-500 text-white' : `${theme.hoverBg} ${theme.textMuted}`}`}>
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
               </div>
           )}
        </main>
      </div>

      <AnimatePresence>
        {showModelModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModelModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg ${theme.cardBg} border ${theme.border} rounded-2xl shadow-2xl z-50 overflow-hidden`}
            >
                <div className={`p-6 border-b ${theme.border} flex justify-between items-center`}>
                    <div>
                        <h3 className={`text-lg font-bold ${theme.text}`}>Customize your chat AI model preferences</h3>
                        <p className={`text-sm ${theme.textMuted}`}>Easily update your selections anytime in the settings</p>
                    </div>
                    <button onClick={() => setShowModelModal(false)} className={`${theme.textMuted} hover:${theme.text}`}><X className="w-5 h-5" /></button>
                </div>
                <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                    {MODELS.map((model) => (
                        <div 
                            key={model.id} 
                            onClick={() => handleModelClick(model)}
                            className={`flex items-center justify-between p-3 ${theme.hoverBg} rounded-xl transition-colors group cursor-pointer`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'} ${model.color}`}>
                                    {model.icon}
                                </div>
                                <div>
                                    <div className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{model.name}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-xs ${theme.textMuted} font-medium ${isDark ? 'bg-black/40' : 'bg-gray-200'} px-2 py-1 rounded-md border ${theme.border}`}>{model.version}</span>
                                {model.premium && !isPremium ? (
                                    <Lock className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <Switch 
                                        isOn={activeModels.includes(model.id)} 
                                        onToggle={() => toggleModel(model.id)} 
                                        id={`modal-${model.id}`}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`p-4 ${isDark ? 'bg-[#111]' : 'bg-gray-50'} border-t ${theme.border} space-y-3`}>
                    <button onClick={() => setShowModelModal(false)} className={`w-full ${isDark ? 'bg-[#333] hover:bg-[#444] text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'} font-medium py-3 rounded-xl transition-colors`}>
                        Update preferences
                    </button>
                    {!isPremium && (
                        <button onClick={handleUpgrade} className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 animate-pulse">
                            <Zap className="w-4 h-4 fill-current" /> Upgrade to Unlock All Models
                        </button>
                    )}
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}