export default function CupDisplay({ coffee, progress, status }) {
  const fillHeight = progress * 0.55
  const foamVisible = coffee?.foamColor && progress > 80

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <svg
        width="140"
        height="160"
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Untertasse */}
        <ellipse cx="70" cy="148" rx="52" ry="8" fill="#e8d8c4" />

        {/* Tassen-Körper */}
        <path
          d="M28 55 L38 140 Q70 148 102 140 L112 55 Z"
          fill="white"
          stroke="#d4bfa8"
          strokeWidth="2"
        />

        {/* Henkel */}
        <path
          d="M112 70 Q135 70 135 95 Q135 120 112 120"
          fill="none"
          stroke="#d4bfa8"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Kaffee-Füllung */}
        {status !== 'idle' && (
          <>
            <clipPath id="cup-clip">
              <path d="M30 57 L39 138 Q70 146 101 138 L110 57 Z" />
            </clipPath>
            <rect
              x="28"
              y={140 - fillHeight * 1.5}
              width="84"
              height={fillHeight * 1.5 + 10}
              fill={coffee?.cupColor ?? '#6f4e37'}
              clipPath="url(#cup-clip)"
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Milchschaum */}
            {foamVisible && coffee?.foamColor && (
              <ellipse
                cx="70"
                cy={140 - fillHeight * 1.5 + 4}
                rx="38"
                ry="8"
                fill={coffee.foamColor}
                clipPath="url(#cup-clip)"
                style={{ transition: 'all 0.3s ease' }}
              />
            )}
          </>
        )}

        {/* Tassen-Rand */}
        <ellipse cx="70" cy="55" rx="42" ry="7" fill="white" stroke="#d4bfa8" strokeWidth="2" />

        {/* Dampf-Animation */}
        {status === 'brewing' && (
          <>
            <g className="animate-pulse">
              <path d="M55 45 Q58 35 55 25" stroke="#c4a882" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
              <path d="M70 42 Q73 30 70 20" stroke="#c4a882" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
              <path d="M85 45 Q88 35 85 25" stroke="#c4a882" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            </g>
          </>
        )}
      </svg>

      {status === 'idle' && (
        <p className="text-coffee-300 text-sm mt-2 font-medium">Wähle deinen Kaffee</p>
      )}
      {status === 'brewing' && coffee && (
        <p className="text-coffee-500 text-sm mt-2 font-medium animate-pulse">
          {coffee.name} wird gebrüht...
        </p>
      )}
      {status === 'done' && coffee && (
        <p className="text-coffee-600 text-sm mt-2 font-semibold">
          Genieße deinen {coffee.name}!
        </p>
      )}
    </div>
  )
}
