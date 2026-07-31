import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const TRACK_NAME = 'ORDEM_THEME_TX01.WAV — Ambient Drone Sintetizado';
const USE_AUDIO_FILE = true;
const AUDIO_FILE_PATH = `${import.meta.env.BASE_URL}music/theme.mp3`;

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioElRef = useRef(null);
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const gainRef = useRef(null);

  useEffect(() => {
    if (!USE_AUDIO_FILE) return;
    const audio = new Audio(AUDIO_FILE_PATH);
    audio.loop = true;
    audio.volume = 0.5;
    audioElRef.current = audio;
    return () => audio.pause();
  }, []);

  function buildSynth() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.18;
    master.connect(ctx.destination);

    const freqs = [55, 110.5, 164.8];
    const oscNodes = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 1 ? 'sawtooth' : 'sine';
      osc.frequency.value = f;

      const gain = ctx.createGain();
      gain.gain.value = 0.5 / (i + 1);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 90;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start();
      lfo.start();
      return [osc, lfo];
    });

    ctxRef.current = ctx;
    gainRef.current = master;
    nodesRef.current = oscNodes.flat();
  }

  function teardownSynth() {
    nodesRef.current.forEach((n) => {
      try {
        n.stop();
      } catch (e) {
        // ignore
      }
    });
    nodesRef.current = [];
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
  }

  useEffect(() => {
    return () => teardownSynth();
  }, []);

  function togglePlay() {
    if (USE_AUDIO_FILE && audioElRef.current) {
      if (playing) audioElRef.current.pause();
      else audioElRef.current.play();
      setPlaying(!playing);
      return;
    }

    if (!playing) {
      buildSynth();
      setPlaying(true);
    } else {
      teardownSynth();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (USE_AUDIO_FILE && audioElRef.current) {
      audioElRef.current.muted = nextMuted;
    } else if (gainRef.current) {
      gainRef.current.gain.value = nextMuted ? 0 : 0.18;
    }
  }

  return (
    <div className="music-player panel">
      <div className="music-track-name">
        <span className={`music-marquee ${playing ? 'scrolling' : ''}`}>
          {playing ? `▶ TOCANDO: ${TRACK_NAME}` : `⏸ ${TRACK_NAME}`}
        </span>
      </div>
      <div className="music-controls">
        <button className="music-btn" onClick={togglePlay} title={playing ? 'Pausar' : 'Tocar'}>
          {playing ? '⏸' : '▶'}
        </button>
        <button className="music-btn" onClick={toggleMute} title={muted ? 'Ativar som' : 'Mudo'}>
          {muted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
}
