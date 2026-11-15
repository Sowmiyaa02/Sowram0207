import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Gift,
  Grid3x3,
  Heart,
  MapPin,
  Maximize2,
  Pause,
  Play,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import { SowRamContent } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface MemoriesProps {
  content: SowRamContent;
  onProceedToFinalSurprise: () => void;
}

export function Memories({
  content,
  onProceedToFinalSurprise,
}: MemoriesProps) {
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [unwrappedVideos, setUnwrappedVideos] = useState<Record<string, boolean>>({});

  const { memories } = content;
  const photos = memories.photos;
  const videos = memories.videos || [
    {
      id: 'v-1',
      url: '/videos/video_1.mp4',
      title: 'SowRam Reel #1: Our Pure Love & Memories 💚',
      caption:
        'Every sweet smile, bus ride, giggle, and romantic song with you, Ramesh! Our journey captured in motion. 🎬✨',
      date: 'Special Memories',
    },
    {
      id: 'v-2',
      url: '/videos/video_2.mp4',
      title: 'SowRam Reel #2: Forever & Always Together ❤️',
      caption:
        'Holding you tight and smiling like there is nobody else in the universe. Happy Birthday my king! 🎂💚🌷',
      date: 'Happy Birthday My Love',
    },
    {
      id: 'v-3',
      url: '/videos/video_3.mp4',
      title: 'Another Special SowRam Memory ❤️',
      caption:
        'Our precious moments, cute smiles, bike rides, and sweet song journey together. Forever SowRam! 🎬✨',
      date: 'SowRam Precious Moments',
    },
  ];

  const handleUnwrapVideo = (vidId: string) => {
    setUnwrappedVideos((prev) => ({ ...prev, [vidId]: true }));
    setPlayingVideoId(vidId);
    soundEngine.pauseMusic();
    soundEngine.playSparkle();
    soundEngine.playSuccess();
    try {
      confetti({
        particleCount: 95,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#10b981', '#f59e0b', '#fb7185', '#ffffff'],
      });
    } catch {
      // ignore confetti error
    }
  };

  const filteredPhotos = photos.filter(
    (p) => filter === 'all' || p.category === filter
  );

  useEffect(() => {
    let timer: number | null = null;
    if (viewMode === 'slideshow' && autoAdvance && filteredPhotos.length > 0) {
      timer = window.setInterval(() => {
        setSlideIdx((prev) => (prev + 1) % filteredPhotos.length);
      }, 3500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [viewMode, autoAdvance, filteredPhotos.length]);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    soundEngine.playSparkle();
  };

  const closeLightbox = () => setLightboxIdx(null);

  const nextLightbox = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx(
        (lightboxIdx - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#080205] via-[#09150e] to-[#040905]">
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-soft"
            style={{
              top: `${(i * 18) % 90}%`,
              left: `${(i * 22) % 94}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${5 + (i % 3)}s`,
              opacity: 0.35 + (i % 4) * 0.15,
            }}
          >
            <span className="text-xl sm:text-3xl text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
              {i % 2 === 0 ? '💚' : '❤️'}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 backdrop-blur-md mb-6 shadow-lg shadow-emerald-950/60">
          <Camera className="w-4 h-4 text-emerald-300" />
          <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold font-mono">
            {memories.subtitle} &amp; Couple Videos 🎬
          </span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-rose-100 to-amber-200 mb-4 drop-shadow-md">
          {memories.headline}
        </h2>

        <div className="max-w-2xl mx-auto space-y-2.5 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light mb-8">
          {memories.introParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Couple Videos */}
        <div className="w-full mb-14 text-left">
          <div className="flex items-center justify-between gap-3 mb-6 px-2 border-b border-emerald-500/30 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
                  Our Love Story in Motion 🎬❤️
                </h3>
                <p className="text-xs text-emerald-300/80 font-mono">
                  Real videos of Ramesh &amp; Sowmiyaa • Watch with love! 💚
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300">
              {videos.length} Videos Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {videos.map((vid, idx) => {
              const isUnwrapped = Boolean(unwrappedVideos[vid.id]);
              return isUnwrapped ? (
                <div
                  key={vid.id}
                  className="glass-panel-emerald rounded-3xl border-2 border-emerald-400/50 overflow-hidden shadow-2xl flex flex-col bg-black/85 backdrop-blur-xl group hover:border-emerald-300/70 transition-all duration-300 animate-fade-in"
                >
                  <div className="relative aspect-9/16 sm:aspect-16/10 w-full bg-black overflow-hidden flex items-center justify-center">
                    <video
                      src={vid.url}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                      onPlay={() => {
                        setPlayingVideoId(vid.id);
                        soundEngine.pauseMusic();
                      }}
                      onPause={() => {
                        if (playingVideoId === vid.id) setPlayingVideoId(null);
                      }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="text-lg font-serif-luxury font-bold text-white group-hover:text-amber-200 transition-colors">
                          {vid.title}
                        </h4>
                        <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light mb-3">
                        {vid.caption}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-300 font-mono pt-3 border-t border-emerald-500/20">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{vid.date || 'SowRam Forever'}</span>
                      </span>
                      <span className="text-[11px] text-amber-300/90">
                        Gift #{idx + 1} Opened 🎁
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => handleUnwrapVideo(vid.id)}
                  className="glass-panel rounded-3xl border-2 border-amber-400/40 hover:border-amber-300/80 overflow-hidden shadow-2xl flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-[#1f0812]/95 via-[#13060d]/95 to-[#07140d]/95 backdrop-blur-xl group cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] text-center min-h-[340px]"
                >
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-300/35 text-amber-200 text-xs font-mono font-semibold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Video Surprise Gift #{idx + 1}</span>
                  </div>

                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 my-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                    <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-rose-800 via-red-700 to-rose-600 shadow-2xl border-2 border-amber-300/50 relative flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-md" />
                      <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 shadow-md" />
                      <div className="relative z-10 w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-amber-200/40 shadow-lg">
                        <Gift className="w-7 h-7 text-amber-200 animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 w-full">
                    <h4 className="text-base sm:text-lg font-serif-luxury font-bold text-white group-hover:text-amber-200 transition-colors">
                      Special SowRam Surprise #{idx + 1} 🎬
                    </h4>
                    <p className="text-xs text-rose-200/75 font-light">
                      Tap to unwrap and play this secret memory video!
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/60 border border-amber-200/40">
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Unwrap &amp; Play Gift #{idx + 1} 🎁</span>
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Marquee strip */}
        <div className="w-full overflow-hidden py-4 mb-10 relative">
          <div className="flex gap-4 w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
            {[...photos, ...photos].map((photo, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx % photos.length)}
                className="w-40 sm:w-52 aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-2 border-emerald-400/40 shrink-0 cursor-pointer group relative bg-black transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] text-rose-100 font-medium truncate">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters + View Mode */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-black/60 border border-emerald-500/30 rounded-2xl backdrop-blur-md">
            {[
              { id: 'all', label: `All Photos (${photos.length})` },
              { id: 'romantic', label: 'Romantic Memories 🌹' },
              { id: 'favourite', label: 'Favourite Photos ❤️' },
              { id: 'special', label: 'Special SowRam 💚' },
              { id: 'funny', label: 'Fun Moments 🤭' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  setSlideIdx(0);
                  soundEngine.playSparkle();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-rose-600 text-white shadow-md shadow-emerald-950'
                    : 'text-rose-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-black/60 border border-emerald-500/30 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => {
                setViewMode('grid');
                soundEngine.playSparkle();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-rose-200/60 hover:text-white'
              }`}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              <span>Polaroids</span>
            </button>

            <button
              onClick={() => {
                setViewMode('slideshow');
                soundEngine.playSparkle();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'slideshow'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-rose-200/60 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Slideshow</span>
            </button>
          </div>
        </div>

        {/* Polaroids Grid */}
        {viewMode === 'grid' && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {filteredPhotos.map((photo, idx) => {
              const rotations = [
                'rotate-1',
                '-rotate-1',
                'rotate-2',
                '-rotate-2',
                'rotate-0',
              ];
              const rot = rotations[idx % rotations.length];
              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(idx)}
                  className={`polaroid-card p-3 sm:p-4 rounded-2xl text-slate-900 cursor-pointer transform ${rot} hover:rotate-0 hover:scale-105 transition-all duration-300 relative group shadow-2xl border-2 border-emerald-400/20 hover:border-emerald-400/60`}
                >
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-emerald-100/90 border border-emerald-300/40 rounded-xs shadow-xs backdrop-blur-xs z-10 opacity-80" />
                  <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-slate-900 mb-3 shadow-inner">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-left px-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif-luxury font-bold text-slate-900 text-base sm:text-lg truncate">
                        {photo.title}
                      </h4>
                      {photo.isFavorite && (
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2 font-light">
                      {photo.caption}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-rose-500" />
                        {photo.date || 'Sweet Day'}
                      </span>
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {photo.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Slideshow View */}
        {viewMode === 'slideshow' && filteredPhotos.length > 0 && (
          <div className="w-full max-w-4xl glass-panel-emerald p-4 sm:p-8 rounded-3xl border border-emerald-400/40 mb-12 shadow-2xl relative bg-black/80 backdrop-blur-xl">
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-black/80 shadow-2xl mb-4 group">
              <img
                src={filteredPhotos[slideIdx].url}
                alt={filteredPhotos[slideIdx].title}
                className="w-full h-full object-contain sm:object-cover"
              />
              <button
                onClick={() =>
                  setSlideIdx(
                    (slideIdx - 1 + filteredPhotos.length) %
                      filteredPhotos.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setSlideIdx((slideIdx + 1) % filteredPhotos.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 sm:p-6 text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold mb-1 block">
                  Memory {slideIdx + 1} of {filteredPhotos.length}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-1">
                  {filteredPhotos[slideIdx].title}
                </h3>
                <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl font-light">
                  {filteredPhotos[slideIdx].caption}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 text-sm text-rose-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAutoAdvance(!autoAdvance)}
                  className="p-2 rounded-full bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-200 border border-emerald-400/30 transition-all cursor-pointer"
                  title={autoAdvance ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {autoAdvance ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-emerald-200" />
                  )}
                </button>
                <span className="text-xs text-emerald-300/80 font-mono">
                  {autoAdvance ? 'Auto-advancing' : 'Paused'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[240px] sm:max-w-md py-1">
                {filteredPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSlideIdx(idx)}
                    className={`w-9 h-9 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      slideIdx === idx
                        ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxIdx !== null && filteredPhotos[lightboxIdx] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-400/50 mb-4 bg-black">
                <img
                  src={filteredPhotos[lightboxIdx].url}
                  alt={filteredPhotos[lightboxIdx].title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>
              <div className="text-center max-w-xl px-4">
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-1">
                  {filteredPhotos[lightboxIdx].title}
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/90 mb-2 font-light">
                  {filteredPhotos[lightboxIdx].caption}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-emerald-300">
                  <span>{filteredPhotos[lightboxIdx].date}</span>
                  {filteredPhotos[lightboxIdx].location && (
                    <span>• {filteredPhotos[lightboxIdx].location}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onProceedToFinalSurprise();
            }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-600 via-rose-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-extrabold text-base sm:text-xl shadow-xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-emerald-300/50"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{memories.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="text-xs text-emerald-300/80 mt-2 font-mono">
            One last grand surprise awaits for my world... 🎁❤️
          </span>
        </div>
      </div>
    </section>
  );
}
