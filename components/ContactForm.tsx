"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setFileName(null);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-pulse/30 bg-pulse/5 p-8">
        <p className="font-display text-2xl uppercase tracking-tightest text-ink">Brief received</p>
        <p className="mt-2 text-sm text-ink-mid">
          Thanks — someone from the studio will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Which vertical?</label>
        <div className="flex flex-wrap gap-4">
          {["Experiential Marketing", "Digital Marketing", "Not sure yet"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-graphite">
              <input type="radio" name="vertical" value={opt} required className="accent-signal" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">
          Tell us about the project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm text-graphite outline-none transition-colors focus:border-pulse"
        />
      </div>

      <div>
        <label className="eyebrow mb-2 block">Upload a brief (optional)</label>
        <label
          htmlFor="brief"
          className="flex cursor-pointer items-center justify-between rounded-lg border border-dashed border-ink/20 px-4 py-4 text-sm text-ink-mid transition-colors hover:border-pulse"
        >
          <span>{fileName ?? "PDF, DOC, or slides — up to 15MB"}</span>
          <span className="font-mono text-xs uppercase text-pulse">Browse</span>
        </label>
        <input
          id="brief"
          name="brief"
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-signal disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send brief"}
      </button>

      {status === "error" && (
        <p className="font-mono text-xs uppercase tracking-wide text-signal">
          Something went wrong — email us directly at hello@planninglabs.in
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm text-graphite outline-none transition-colors focus:border-pulse"
      />
    </div>
  );
}
