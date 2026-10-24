export function Icon({ name, size = 28, fill = 0 }: { name: string; size?: number; fill?: 0 | 1 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: 'Material Symbols Rounded Variable',
        fontSize: size,
        lineHeight: 1,
        fontVariationSettings: `'FILL' ${fill}, 'wght' 500, 'opsz' 40`,
        fontFeatureSettings: "'liga'",
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      {name}
    </span>
  );
}

/** Inline icon sized to flow with body text (replaces emoji in running copy). */
export const I = ({ n }: { n: string }) => <Icon name={n} size={24} />;
