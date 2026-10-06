import React from "react";

export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function CubeLogoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cube-logo-top" x1="6" y1="4" x2="26" y2="15.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="cube-logo-left" x1="6" y1="9.75" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="cube-logo-right" x1="26" y1="9.75" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Top Face (Sky Cyan) */}
      <path
        d="M16 3.5 L26.5 9.5 L16 15.5 L5.5 9.5 Z"
        fill="url(#cube-logo-top)"
        stroke="#060709"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Left Face (Deep Cyan) */}
      <path
        d="M5.5 9.5 L16 15.5 L16 27.5 L5.5 21.5 Z"
        fill="url(#cube-logo-left)"
        stroke="#060709"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Right Face (Slate Obsidian) */}
      <path
        d="M26.5 9.5 L26.5 21.5 L16 27.5 L16 15.5 Z"
        fill="url(#cube-logo-right)"
        stroke="#060709"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Center Inset Crease */}
      <line x1="16" y1="15.5" x2="16" y2="27.5" stroke="#060709" strokeWidth="0.8" />
    </svg>
  );
}
