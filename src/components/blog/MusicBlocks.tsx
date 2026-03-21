'use client';

import { useState, useCallback, useRef, type ReactNode } from 'react';
import {
  DrumPads,
  PianoKeys,
  PianoRoll,
  type NoteData,
  type RowConfig,
} from 'elementary-audio-kit/ui';

/**
 * Collapsible source code reveal for interactive examples.
 */
function SourceBlock({ code, children }: { code: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ margin: '32px 0' }}>
      {children}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          marginTop: 12,
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.5)',
          borderRadius: 4,
          padding: '6px 14px',
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
        }}
      >
        {open ? '\u25BE Hide source' : '\u25B8 View source'}
      </button>
      {open && (
        <div
          style={{
            marginTop: 8,
            background: '#111',
            border: '1px solid #333',
            borderRadius: 8,
            padding: 16,
            fontSize: 14,
            lineHeight: 1.6,
            overflowX: 'auto',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
            color: '#e0e0e0',
            whiteSpace: 'pre',
          }}
        >
          {code}
        </div>
      )}
    </div>
  );
}

const PAD_LABELS = [
  'FX 1', 'FX 2', 'FX 3', 'FX 4',
  'Tom 1', 'Tom 2', 'Tom 3', 'Tom 4',
  'CH', 'OH', 'Perc 1', 'Perc 2',
  'Kick', 'Snare', 'Clap', 'Rim',
];

function playDrumSound(ctx: AudioContext, padIndex: number) {
  const label = PAD_LABELS[padIndex] ?? '';
  const t = ctx.currentTime;

  switch (label) {
    case 'Kick': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.35);
      break;
    }
    case 'Snare': {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = 200;
      oscGain.gain.setValueAtTime(0.25, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(oscGain); oscGain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.2);
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
      const noise = ctx.createBufferSource();
      const nGain = ctx.createGain();
      noise.buffer = buf;
      nGain.gain.setValueAtTime(0.5, t);
      nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      noise.connect(nGain); nGain.connect(ctx.destination);
      noise.start(t);
      break;
    }
    case 'Clap': {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const s = i / ctx.sampleRate;
        const burst = (s < 0.01 ? 1 : 0) + (s > 0.015 && s < 0.025 ? 0.8 : 0) +
          (s > 0.03 && s < 0.04 ? 0.6 : 0) + (s > 0.04 ? Math.exp(-(s - 0.04) * 30) : 0);
        data[i] = (Math.random() * 2 - 1) * burst * 0.5;
      }
      const noise = ctx.createBufferSource();
      const gain = ctx.createGain();
      noise.buffer = buf; gain.gain.value = 0.6;
      noise.connect(gain); gain.connect(ctx.destination);
      noise.start(t);
      break;
    }
    case 'Rim': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.08);
      break;
    }
    case 'CH': case 'OH': { // Closed/Open Hat
      const dur = label === 'CH' ? 0.05 : 0.25;
      const decay = label === 'CH' ? 60 : 10;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const s = i / ctx.sampleRate;
        data[i] = (Math.random() * 2 - 1) * Math.exp(-s * decay) * 0.35;
      }
      const noise = ctx.createBufferSource();
      const gain = ctx.createGain(); gain.gain.value = 0.6;
      noise.buffer = buf;
      noise.connect(gain); gain.connect(ctx.destination);
      noise.start(t);
      break;
    }
    case 'Perc 1': case 'Perc 2': {
      const freq = label === 'Perc 1' ? 500 : 700;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.2);
      break;
    }
    case 'Tom 1': case 'Tom 2': case 'Tom 3': case 'Tom 4': {
      const tomIndex = parseInt(label.slice(-1)) - 1;
      const freqs = [200, 160, 120, 90];
      const freq = freqs[tomIndex];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + 0.2);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.3);
      break;
    }
    default: { // FX 1-4
      const fxIndex = parseInt(label.slice(-1)) - 1 || 0;
      const baseFreq = 300 + fxIndex * 100;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = baseFreq;
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 3, t + 0.3);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.4);
    }
  }
}

/**
 * Interactive drum pads for blog posts.
 */
const DRUM_SOURCE = `\`\`\`music drums
kit: 808
\`\`\``;

export function BlogDrumPads() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handlePadTrigger = useCallback((padIndex: number) => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    playDrumSound(audioCtxRef.current, padIndex);
  }, []);

  return (
    <SourceBlock code={DRUM_SOURCE}>
      <div style={{ maxWidth: 360, margin: '0 auto' }}>
        <DrumPads labels={PAD_LABELS} onPadTrigger={handlePadTrigger} defaultKeyboardEnabled={false} />
      </div>
    </SourceBlock>
  );
}

/**
 * Interactive piano keys for blog posts.
 */
const PIANO_SOURCE = `\`\`\`music keys
octaves: 2
sound: piano
\`\`\``;

export function BlogPianoKeys() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscsRef = useRef(new Map<number, { osc: OscillatorNode; gain: GainNode }>());

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    return audioCtxRef.current;
  }, []);

  const handleNoteOn = useCallback((midiNote: number) => {
    const ctx = getCtx();
    const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    activeOscsRef.current.set(midiNote, { osc, gain });
  }, [getCtx]);

  const handleNoteOff = useCallback((midiNote: number) => {
    const active = activeOscsRef.current.get(midiNote);
    if (!active) return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    active.gain.gain.setValueAtTime(active.gain.gain.value, ctx.currentTime);
    active.gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    active.osc.stop(ctx.currentTime + 0.15);
    activeOscsRef.current.delete(midiNote);
  }, []);

  return (
    <SourceBlock code={PIANO_SOURCE}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <PianoKeys
          octaves={2}
          onNoteOn={handleNoteOn}
          onNoteOff={handleNoteOff}
          defaultKeyboardEnabled={false}
        />
      </div>
    </SourceBlock>
  );
}

/**
 * Interactive piano roll for blog posts with a pre-filled C major chord.
 */
const C_MAJOR_ROWS: RowConfig[] = [
  { noteNumber: 60, label: 'C4' },
  { noteNumber: 64, label: 'E4' },
  { noteNumber: 67, label: 'G4' },
];

const C_MAJOR_NOTES: NoteData[] = [
  { noteNumber: 60, velocity: 100, position: 0, duration: 4 },
  { noteNumber: 64, velocity: 100, position: 0, duration: 4 },
  { noteNumber: 67, velocity: 100, position: 0, duration: 4 },
];

const ROLL_SOURCE = `\`\`\`music sequence
tempo: 120
---
C4  0  4
E4  0  4
G4  0  4
\`\`\``;

export function BlogPianoRoll() {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const handleNotePlay = useCallback((noteNumber: number) => {
    const ctx = audioCtx ?? new AudioContext();
    if (!audioCtx) setAudioCtx(ctx);

    const freq = 440 * Math.pow(2, (noteNumber - 69) / 12);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  }, [audioCtx]);

  return (
    <SourceBlock code={ROLL_SOURCE}>
      <PianoRoll
        notes={C_MAJOR_NOTES}
        rows={C_MAJOR_ROWS}
        lengthInBars={1}
        defaultTempo={120}
        onNotePlay={handleNotePlay}
      />
    </SourceBlock>
  );
}
