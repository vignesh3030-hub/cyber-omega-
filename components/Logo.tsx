
import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", withText = false, size = 32 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div style={{ width: size, height: size }} className="relative shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
        >
          {/* Outer Shield */}
          <path
            d="M50 5L10 20V45C10 70 50 95 50 95C50 95 90 70 90 45V20L50 5Z"
            stroke="url(#shield_grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Omega Symbol */}
          <path
            d="M30 65C25 65 20 60 20 50C20 33 33 20 50 20C67 20 80 33 80 50C80 60 75 65 70 65M30 65H15M70 65H85"
            stroke="url(#omega_grad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Eye in Center */}
          <ellipse cx="50" cy="45" rx="15" ry="8" stroke="#06b6d4" strokeWidth="2" />
          <circle cx="50" cy="45" r="4" fill="#06b6d4" />
          
          {/* Circuit Lines */}
          <path d="M50 20V12" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M35 25L30 18" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M65 25L70 18" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />

          <defs>
            <linearGradient id="shield_grad" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06b6d4" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="omega_grad" x1="20" y1="20" x2="80" y2="65" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a855f7" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {withText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-0.5">
            {/* Custom C as a Lock */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
               <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-black text-xl tracking-tighter text-white uppercase italic">yber</span>
          </div>
          <span className="font-black text-xl tracking-[0.15em] text-cyan-400 uppercase leading-none -mt-1">Omega</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
