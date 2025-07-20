import React from 'react'

type TimeIllustrationProps = {
  className?: string
  animated?: boolean
}

export const MorningIllustration: React.FC<TimeIllustrationProps> = ({ className = '', animated = false }) => (
  <svg
    className={className}
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sky gradient */}
    <defs>
      <linearGradient id="morningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FCD34D" />
      </linearGradient>
      <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect width="400" height="200" fill="url(#morningGradient)" />

    {/* Sun */}
    <circle
      cx="320"
      cy="60"
      r="30"
      fill="url(#sunGradient)"
      className={animated ? 'animate-pulse' : ''}
    />

    {/* Sun rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
      <line
        key={index}
        x1={320 + Math.cos((angle * Math.PI) / 180) * 40}
        y1={60 + Math.sin((angle * Math.PI) / 180) * 40}
        x2={320 + Math.cos((angle * Math.PI) / 180) * 50}
        y2={60 + Math.sin((angle * Math.PI) / 180) * 50}
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
        className={animated ? 'animate-pulse' : ''}
        style={animated ? { animationDelay: `${index * 0.1}s` } : {}}
      />
    ))}

    {/* Mountains */}
    <polygon
      points="0,200 80,120 160,140 240,100 320,130 400,110 400,200"
      fill="#065F46"
      opacity="0.8"
    />
    <polygon
      points="0,200 100,140 200,160 300,120 400,140 400,200"
      fill="#047857"
      opacity="0.6"
    />

    {/* Birds */}
    {animated && (
      <>
        <path
          d="M100 80 Q105 75 110 80 Q105 85 100 80"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
          className="animate-bounce"
          style={{ animationDuration: '3s', animationDelay: '0.5s' }}
        />
        <path
          d="M120 90 Q125 85 130 90 Q125 95 120 90"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
          className="animate-bounce"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        />
      </>
    )}
  </svg>
)

export const AfternoonIllustration: React.FC<TimeIllustrationProps> = ({ className = '', animated = false }) => (
  <svg
    className={className}
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="afternoonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect width="400" height="200" fill="url(#afternoonGradient)" />

    {/* Sun */}
    <circle
      cx="200"
      cy="50"
      r="25"
      fill="#FCD34D"
      className={animated ? 'animate-pulse' : ''}
    />

    {/* Clouds */}
    <g className={animated ? 'animate-pulse' : ''} style={animated ? { animationDuration: '4s' } : {}}>
      <ellipse cx="80" cy="70" rx="30" ry="15" fill="white" opacity="0.9" />
      <ellipse cx="100" cy="65" rx="25" ry="12" fill="white" opacity="0.9" />
      <ellipse cx="320" cy="80" rx="35" ry="18" fill="white" opacity="0.8" />
      <ellipse cx="340" cy="75" rx="28" ry="14" fill="white" opacity="0.8" />
    </g>

    {/* City skyline */}
    <rect x="0" y="150" width="60" height="50" fill="#374151" />
    <rect x="70" y="130" width="40" height="70" fill="#4B5563" />
    <rect x="120" y="140" width="50" height="60" fill="#374151" />
    <rect x="180" y="120" width="45" height="80" fill="#4B5563" />
    <rect x="235" y="135" width="55" height="65" fill="#374151" />
    <rect x="300" y="145" width="40" height="55" fill="#4B5563" />
    <rect x="350" y="130" width="50" height="70" fill="#374151" />

    {/* Windows */}
    {Array.from({ length: 20 }, (_, i) => (
      <rect
        key={i}
        x={15 + (i % 8) * 45}
        y={155 + Math.floor(i / 8) * 20}
        width="8"
        height="8"
        fill="#FCD34D"
        opacity="0.7"
        className={animated ? 'animate-pulse' : ''}
        style={animated ? { animationDelay: `${i * 0.2}s` } : {}}
      />
    ))}
  </svg>
)

export const EveningIllustration: React.FC<TimeIllustrationProps> = ({ className = '', animated = false }) => (
  <svg
    className={className}
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="eveningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="50%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect width="400" height="200" fill="url(#eveningGradient)" />

    {/* Setting sun */}
    <circle
      cx="350"
      cy="140"
      r="40"
      fill="#FCD34D"
      opacity="0.9"
      className={animated ? 'animate-pulse' : ''}
    />

    {/* Horizon line */}
    <line x1="0" y1="160" x2="400" y2="160" stroke="#92400E" strokeWidth="2" />

    {/* Trees silhouette */}
    <polygon
      points="50,160 60,120 70,160"
      fill="#1F2937"
    />
    <polygon
      points="80,160 95,100 110,160"
      fill="#1F2937"
    />
    <polygon
      points="130,160 140,130 150,160"
      fill="#1F2937"
    />

    {/* Street lights */}
    {animated && Array.from({ length: 4 }, (_, i) => (
      <g key={i}>
        <line
          x1={100 + i * 80}
          y1="160"
          x2={100 + i * 80}
          y2="140"
          stroke="#374151"
          strokeWidth="3"
        />
        <circle
          cx={100 + i * 80}
          cy="135"
          r="5"
          fill="#FCD34D"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      </g>
    ))}
  </svg>
)

export const NightIllustration: React.FC<TimeIllustrationProps> = ({ className = '', animated = false }) => (
  <svg
    className={className}
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#312E81" />
      </linearGradient>
    </defs>

    {/* Night sky */}
    <rect width="400" height="200" fill="url(#nightGradient)" />

    {/* Moon */}
    <circle
      cx="320"
      cy="60"
      r="25"
      fill="#E5E7EB"
      className={animated ? 'animate-pulse' : ''}
      style={animated ? { animationDuration: '3s' } : {}}
    />

    {/* Moon craters */}
    <circle cx="315" cy="55" r="3" fill="#D1D5DB" opacity="0.7" />
    <circle cx="325" cy="65" r="2" fill="#D1D5DB" opacity="0.7" />

    {/* Stars */}
    {Array.from({ length: 15 }, (_, i) => (
      <circle
        key={i}
        cx={30 + (i * 27) % 350}
        cy={20 + (i * 13) % 100}
        r="1.5"
        fill="white"
        className={animated ? 'animate-pulse' : ''}
        style={animated ? { animationDelay: `${i * 0.3}s`, animationDuration: '2s' } : {}}
      />
    ))}

    {/* City at night */}
    <rect x="0" y="140" width="400" height="60" fill="#111827" />

    {/* Building windows (lit up) */}
    {Array.from({ length: 25 }, (_, i) => (
      <rect
        key={i}
        x={10 + (i % 10) * 38}
        y={145 + Math.floor(i / 10) * 15}
        width="6"
        height="8"
        fill={Math.random() > 0.3 ? '#FCD34D' : '#1F2937'}
        opacity="0.8"
        className={animated && Math.random() > 0.7 ? 'animate-pulse' : ''}
        style={animated ? { animationDelay: `${i * 0.1}s` } : {}}
      />
    ))}
  </svg>
)
