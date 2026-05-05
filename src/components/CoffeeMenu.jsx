import { COFFEES } from '../coffees'

function StrengthIndicator({ strength }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-1.5 rounded-full"
          style={{ backgroundColor: i < strength ? '#6f4e37' : '#e8d8c4' }}
        />
      ))}
    </div>
  )
}

export default function CoffeeMenu({ selectedId, onSelect, disabled }) {
  return (
    <div className="w-full">
      <h2 className="text-xs font-semibold text-coffee-400 uppercase tracking-widest mb-3">
        Kaffeeauswahl
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {COFFEES.map((coffee) => (
          <button
            key={coffee.id}
            onClick={() => !disabled && onSelect(coffee)}
            disabled={disabled}
            className={[
              'coffee-card text-left',
              selectedId === coffee.id ? 'selected' : '',
              disabled ? 'disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="text-2xl">{coffee.emoji}</span>
            <p className="font-semibold text-coffee-700 mt-2 text-sm">{coffee.name}</p>
            <p className="text-coffee-400 text-xs">{coffee.description}</p>
            <StrengthIndicator strength={coffee.strength} />
          </button>
        ))}
      </div>
    </div>
  )
}
