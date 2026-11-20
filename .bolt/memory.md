# Project memory

## Product intent & audience

- Birthday gift website for **Roqaya (رقيّة)** from **Mahmoud (محمود)** — a romantic, emotional digital gift.
- Language: **Egyptian Arabic**, RTL layout throughout.
- Audience: single recipient (Roqaya); designed to feel personal, magical, and unforgettable.

## Brand personality & voice

- Romantic, warm, dreamy, premium — not generic birthday template.
- Egyptian colloquial Arabic phrasing (e.g. "كل سنة وانتي طيبة يا رقيّة", "افتحي هديتك", "اتمني أمنية").
- Emotional storytelling tone; heartfelt but elegant.

## Visual design & UX direction

- **Palette:** soft pink, purple, white, pastel gradients + gold accents.
- **Style:** glassmorphism cards, glowing elements, floating hearts/stars/particles, subtle confetti.
- **Typography:** elegant Arabic fonts; handwritten-style for the letter.
- **Imagery:** SVG-drawn illustrations used as temporary photo placeholders (image service unavailable); real photos go in `public/` and swap via `src/data.ts`.
- **Layout:** mobile-first, fully responsive, RTL.
- **Animations:** Framer Motion — smooth page transitions, reveal-on-scroll, typewriter letter, gift-box open, candle-blow, final surprise glow/confetti.
- **Sections:** password gate → intro gift box → birthday hero (animated cake, 5 blowable candles) → polaroid photo gallery (click-to-expand) → handwritten letter (typewriter) → memories timeline → interactive hearts + hidden gift → final surprise button.
- **Music:** floating player bottom of screen; multi-track support; no autoplay initially. Egyptian happy birthday tune auto-plays after password entry. Opening a gallery photo auto-requests "بحبك" (Rami Sabry). Audio files user-supplied via file upload; filename containing "بحبك" used for recognition.
- **Accessibility:** interactive buttons all functional, keyboard-friendly where reasonable.

## Decisions, constraints & rationale

- **Stack:** React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide React.
- **Path alias:** `@/` → `src/`.
- **Content centralization:** all text/images/timeline data in `src/data.ts` for easy customization.
- **SVG placeholders** instead of external image service — keeps build self-contained, no broken images.
- **Reusable components** built for each section (password gate, intro, hero, cake, gallery, letter, timeline, hearts, music player, final surprise).
- **Password gate:** site requires password **LOVE** before any content is revealed; unlocks site and triggers birthday tune.
- **Copyright constraint:** copyrighted songs (e.g. "بحبك") cannot be bundled; user must supply audio files manually. Auto-play requests fire on user interactions (password submit, photo open) to comply with browser autoplay policies.
- Build verified — type check and production build pass cleanly.
- Deploy target: Vercel.

## Open questions & assumptions

- Real photos to be added by user into `public/`; current SVG placeholders assumed acceptable initially.
- Music audio files (birthday tune + "بحبك") assumed user-supplied; filename matching used for track recognition.
- Timeline dates currently sample — user may want real dates for Roqaya & Mahmoud's memories.
- Letter body text is sample romantic text — user may want to personalize.
- Egyptian happy birthday tune source/track not yet specified — user may want a specific version or file.