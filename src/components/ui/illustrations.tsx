import { motion } from 'framer-motion';

function CarSearchIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="20" y="55" width="160" height="70" rx="12" className="fill-zinc-800" />
      <rect x="35" y="65" width="60" height="8" rx="4" className="fill-zinc-600" />
      <rect x="35" y="80" width="100" height="6" rx="3" className="fill-zinc-700" />
      <circle cx="55" cy="105" r="10" className="fill-zinc-700" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="145" cy="105" r="10" className="fill-zinc-700" stroke="currentColor" strokeWidth="1.5" />
      <rect x="35" y="92" width="40" height="4" rx="2" className="fill-zinc-700" />
      <circle cx="130" cy="40" r="25" className="fill-zinc-800" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="130" cy="40" r="10" className="fill-zinc-700" />
      <path d="M130 30V40L137 45" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <rect x="135" y="92" width="30" height="4" rx="2" className="fill-zinc-600" />
    </svg>
  );
}

function BellIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="60" y="25" width="80" height="80" rx="20" className="fill-zinc-800" />
      <path
        d="M100 45C93 45 86 52 86 60V72L81 79H119L114 72V60C114 52 107 45 100 45Z"
        className="fill-zinc-600"
      />
      <path
        d="M96 82C96 84.2 97.8 86 100 86C102.2 86 104 84.2 104 82"
        className="fill-zinc-500"
      />
      <circle cx="100" cy="45" r="4" className="fill-danger" />
      <path
        d="M60 110L72 95H128L140 110H60Z"
        className="fill-zinc-700"
      />
      <path
        d="M50 130L67 110H133L150 130H50Z"
        className="fill-zinc-700"
        opacity="0.5"
      />
      <circle cx="165" cy="30" r="15" className="fill-zinc-800" />
      <path d="M160 25L170 35M170 25L160 35" className="stroke-zinc-600" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HeartIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M100 125L55 87C37 72 30 51 40 35C50 19 72 15 85 27C92 33 96 42 100 48C104 42 108 33 115 27C128 15 150 19 160 35C170 51 163 72 145 87L100 125Z"
        className="fill-zinc-800"
      />
      <path
        d="M100 115L62 82C47 70 41 53 49 40C57 27 74 24 85 34C91 40 94 47 100 55C106 47 109 40 115 34C126 24 143 27 151 40C159 53 153 70 138 82L100 115Z"
        className="fill-zinc-700"
      />
      <path
        d="M100 105L69 79C58 69 53 56 58 45C63 34 75 32 83 40C87 44 90 50 100 60C110 50 113 44 117 40C125 32 137 34 142 45C147 56 142 69 131 79L100 105Z"
        stroke="#F59E0B"
        strokeWidth="1.5"
        className="fill-zinc-800/50"
      />
    </svg>
  );
}

function SearchIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="90" cy="80" r="35" className="fill-zinc-800" stroke="currentColor" strokeWidth="2" />
      <circle cx="90" cy="80" r="20" className="fill-zinc-700" />
      <path d="M115 108L135 128" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="140" y="55" width="20" height="6" rx="3" className="fill-zinc-700" />
      <rect x="140" y="65" width="14" height="6" rx="3" className="fill-zinc-600" />
      <rect x="140" y="75" width="18" height="6" rx="3" className="fill-zinc-700" />
    </svg>
  );
}

function RocketIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.g
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M100 20C85 45 65 65 60 90L100 130L140 90C135 65 115 45 100 20Z"
          className="fill-zinc-800"
        />
        <path
          d="M100 30C89 50 73 66 69 86L100 118L131 86C127 66 111 50 100 30Z"
          className="fill-zinc-700"
        />
        <circle cx="100" cy="75" r="12" className="fill-zinc-600" />
        <circle cx="100" cy="75" r="5" className="fill-zinc-500" />
      </motion.g>
      <motion.circle
        cx="155"
        cy="35"
        r="3"
        className="fill-primary"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="170"
        cy="55"
        r="2"
        className="fill-primary-light"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.circle
        cx="45"
        cy="40"
        r="2.5"
        className="fill-primary"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      />
    </svg>
  );
}

export { CarSearchIllustration, BellIllustration, HeartIllustration, SearchIllustration, RocketIllustration };