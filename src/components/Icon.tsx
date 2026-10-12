type IconName = "arrow-left" | "download" | "external" | "print";

// Reused line icons live in `public/icons/` (Rune-style, paper-and-ink:
// 24px grid, 1.8 stroke, round caps, currentColor).
// Header's moon/sun + X logo stay inline — one-offs with fixed sizes.
export default function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <span className="icon" aria-hidden="true">
      <img
        src={`/icons/${name}.svg`}
        width={size}
        height={size}
        alt=""
        draggable={false}
      />
    </span>
  );
}
