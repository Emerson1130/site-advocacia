import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';

function formatTime(seconds: number) {
  const wholeSeconds = Math.floor(Number.isFinite(seconds) ? seconds : 0);
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, '0')}`;
}

export function TestimonialAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(63);
  const [error, setError] = useState(false);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        setError(false);
        await audio.play();
      } catch {
        setError(true);
      }
    } else {
      audio.pause();
    }
  };

  const seekTo = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
  };

  return <div className="testimonial-audio">
    <audio
      ref={audioRef}
      preload="metadata"
      onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
      onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => { setPlaying(false); seekTo(0); }}
      onError={() => setError(true)}
    >
      <source src="/audio/depoimento-cliente.ogg" type='audio/ogg; codecs="opus"' />
      <source src="/audio/depoimento-cliente.mp3" type="audio/mpeg" />
    </audio>
    <img src="/reference/faixa-som.svg" alt="" aria-hidden="true" />
    <button
      className="testimonial-audio-toggle"
      type="button"
      onClick={togglePlayback}
      aria-label={playing ? 'Pausar depoimento em áudio' : 'Reproduzir depoimento em áudio'}
    >{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button>
    <input
      className="testimonial-audio-seek"
      type="range"
      min="0"
      max={duration}
      step="0.1"
      value={currentTime}
      onChange={event => seekTo(Number(event.currentTarget.value))}
      aria-label="Posição do depoimento em áudio"
      aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
      style={{ '--audio-progress': `${duration > 0 ? (currentTime / duration) * 100 : 0}%` } as CSSProperties}
    />
    <span className="testimonial-audio-time" aria-hidden="true">{formatTime(currentTime)} / {formatTime(duration)}</span>
    {error && <span className="testimonial-audio-error" role="alert">Não foi possível reproduzir o áudio.</span>}
  </div>;
}
