export default function StatBlock({ value, label, tone = "light" }: { value: string; label: string; tone?: "light" | "dark" }) {
  return (
    <div>
      <p className={`font-display text-4xl uppercase tracking-tightest md:text-5xl ${tone === "dark" ? "text-paper" : "text-ink"}`}>
        {value}
      </p>
      <p className={`eyebrow mt-1 ${tone === "dark" ? "text-ink-mid" : "text-ink-mid"}`}>{label}</p>
    </div>
  );
}
