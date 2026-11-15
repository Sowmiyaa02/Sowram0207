import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Camera,
  CircleCheckBig,
  CircleX,
  Gamepad2,
  Heart,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { SowRamContent } from '../types';
import {
  REPLACEMENT_PHOTO_URL,
  SWEET_MOMENTS_PHOTO_URL,
} from '../data/defaultContent';
import { soundEngine } from '../utils/soundEngine';

const QUIZ_REVEAL_PHOTOS = [
  { url: SWEET_MOMENTS_PHOTO_URL, caption: 'Sweet Smiles & Warm Hugs 💚🌷' },
  { url: REPLACEMENT_PHOTO_URL, caption: 'Warm Tender Embrace 💚' },
  { url: '/images/14_10cf6bb8.jpg', caption: 'Tilak Temple Wall Hug 💚' },
  { url: '/images/23_583d551c.jpg', caption: 'Resting On Your Shoulder 💚🌷' },
  { url: '/images/18_dab562c2.jpg', caption: 'Bike Ride Tight Waist Hug 🛵' },
  { url: '/images/20_bc4d7471.jpg', caption: 'Cloudy Highway Smiles ☁️' },
  { url: '/images/15_e442ba55.jpg', caption: 'Saturday 07:41 pm Holding Hands 🤝' },
  { url: '/images/1_b217d761.jpg', caption: 'Pure Happiness Together 💫' },
  { url: '/images/21_54fa7506.jpg', caption: 'Interlocked Forever 💚' },
  { url: '/images/22_7b611d89.jpg', caption: 'Side By Side Snuggle 🫂' },
  { url: '/images/8_3d884414.jpg', caption: 'Passports Held In Hand 🕊️' },
  { url: '/images/7_992f0743.jpg', caption: 'Unnaiyandri Enaku Yethu Yethirkaalame 💚' },
  { url: '/assets/aistudio/11_d7ca09e3.jpg', caption: 'Forever SowRam Madness ❤️' },
  { url: REPLACEMENT_PHOTO_URL, caption: 'Our Little World 🌍' },
  { url: '/images/13_a75e867c.jpg', caption: 'Happy Birthday My Love 🎂' },
];

interface LoveQuizProps {
  content: SowRamContent;
  onProceedToMemories: () => void;
  onOpenCustomizer?: () => void;
}

export function LoveQuiz({
  content,
  onProceedToMemories,
  onOpenCustomizer,
}: LoveQuizProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const { loveQuiz } = content;
  const questions = loveQuiz.questions;
  const currentQ = questions[currentIdx];
  const selectedAns = currentQ ? answers[currentQ.id] : undefined;
  const hasSubmitted = selectedAns !== undefined;
  const isCorrect =
    hasSubmitted && currentQ && selectedAns === currentQ.correctAnswerIndex;
  const revealPhoto = QUIZ_REVEAL_PHOTOS[currentIdx % QUIZ_REVEAL_PHOTOS.length];

  const score = Object.entries(answers).reduce((acc, [qId, optIdx]) => {
    const found = questions.find((q) => q.id === Number(qId));
    return found && found.correctAnswerIndex === optIdx ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (optIdx: number) => {
    if (hasSubmitted || !currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
    if (optIdx === currentQ.correctAnswerIndex) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setFinished(true);
      soundEngine.playSuccess();
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#10b981', '#f43f5e', '#fbbf24', '#ffffff'],
        });
      } catch {
        // ignore confetti error
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  if (!started) {
    return (
      <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0712] via-[#0d140e] to-[#040905]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-soft"
              style={{
                top: `${(i * 19) % 92}%`,
                left: `${(i * 21) % 95}%`,
                animationDelay: `${(i * 0.4) % 4}s`,
                animationDuration: `${5 + (i % 4)}s`,
                opacity: 0.35 + (i % 4) * 0.15,
              }}
            >
              <span className="text-2xl sm:text-4xl text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                {i % 2 === 0 ? '💚' : '❤️'}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 opacity-15 filter blur-xs overflow-hidden pointer-events-none">
          <img
            src={SWEET_MOMENTS_PHOTO_URL}
            alt="SowRam Romance"
            className="w-full h-full object-cover scale-110 animate-pulse"
            style={{ animationDuration: '8s' }}
          />
        </div>

        <div className="max-w-2xl w-full mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/40 text-center shadow-2xl animate-fade-in relative z-10 bg-black/75 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center mx-auto mb-4 text-emerald-300 shadow-lg shadow-emerald-950/70">
            <Gamepad2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>15 Romantic Questions • SowRam Special</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-rose-100 to-amber-200 mb-4 drop-shadow-md">
            {loveQuiz.headline}
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light mb-8 max-w-lg mx-auto">
            {loveQuiz.introParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {[
              SWEET_MOMENTS_PHOTO_URL,
              '/images/14_10cf6bb8.jpg',
              REPLACEMENT_PHOTO_URL,
              '/images/18_dab562c2.jpg',
            ].map((src, idx) => (
              <div
                key={idx}
                className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-lg shrink-0 transform hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={src}
                  alt="SowRam"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setStarted(true);
              soundEngine.playSparkle();
            }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-950/80 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/40"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{loveQuiz.startButtonText}</span>
          </button>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0712] via-[#0d140e] to-[#040905]">
        <div className="absolute inset-0 opacity-20 filter blur-xs overflow-hidden pointer-events-none">
          <img
            src="/assets/aistudio/3_a81a6fdc.jpg"
            alt="SowRam Montage"
            className="w-full h-full object-cover scale-110 animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </div>

        <div className="max-w-3xl w-full mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/40 text-center shadow-2xl animate-fade-in relative z-10 bg-black/80 backdrop-blur-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-950/60 border border-emerald-300/50">
            <Award className="w-10 h-10 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <span>SowRam Love Score 👑</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-2">
            Quiz Completed, My Love! 👑
          </h2>
          <p className="text-rose-200/80 text-sm sm:text-base mb-6">
            Here is how well you know your Sowmiyaa and our little world:
          </p>

          <div className="inline-flex items-baseline gap-2 px-8 py-4 rounded-2xl bg-black/60 border border-emerald-400/50 mb-6 shadow-inner">
            <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300">
              {score}
            </span>
            <span className="text-rose-200/60 text-lg sm:text-xl font-medium">
              / {questions.length} Points
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-xl">
              <img
                src="/assets/aistudio/3_a81a6fdc.jpg"
                alt="Our Sweet Smiles"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-rose-400/60 shadow-xl">
              <img
                src={REPLACEMENT_PHOTO_URL}
                alt="Warm Embrace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 max-w-xl mx-auto mb-8 text-sm sm:text-base text-emerald-200">
            {score >= 12 ? (
              <p className="font-medium leading-relaxed font-serif-luxury">
                💖 “Incredible, Ramesh! You know your Sowmiyaa inside out! From
                our first chat to our sweetest memories, your heart remembers
                everything! You are officially my forever king! 👑💚”
              </p>
            ) : score >= 8 ? (
              <p className="font-medium leading-relaxed font-serif-luxury">
                🥰 “Great job, baby! You got most of our sweetest memories right!
                I love you so much, Ramesh! ❤️”
              </p>
            ) : (
              <p className="font-medium leading-relaxed font-serif-luxury">
                🙈 “Aww Ramesh! Looks like you need some extra revision cuddle
                lessons with Sowmiyaa tonight! Love you endlessly!”
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setFinished(false);
                setCurrentIdx(0);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 border border-white/15 font-medium text-sm transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Revisit Questions</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle();
                onProceedToMemories();
              }}
              className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-rose-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-extrabold text-base shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
            >
              <span>Next: Our Memories &amp; Couple Videos 📸🎬</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <section className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0712] via-[#0d140e] to-[#040905]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          key={currentIdx}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-25"
        >
          <img
            src={revealPhoto.url}
            alt={revealPhoto.caption}
            className="w-full h-full object-cover scale-110 animate-[pulse_6s_ease-in-out_infinite] filter saturate-125 brightness-90"
            style={{ animation: 'spin-slow 20s ease-in-out alternate infinite' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040905] via-[#040905]/70 to-[#040905]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080205]/60 to-[#040805]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-600/20 blur-3xl pointer-events-none animate-pulse"
          style={{ animationDelay: '2s' }}
        />

        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-soft"
            style={{
              top: `${(i * 17 + 5) % 88}%`,
              left: `${(i * 23 + 4) % 92}%`,
              animationDelay: `${(i * 0.5) % 4}s`,
              animationDuration: `${6 + (i % 3)}s`,
              opacity: 0.4 + (i % 3) * 0.2,
            }}
          >
            <span className="text-xl sm:text-3xl text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]">
              {i % 2 === 0 ? '💚' : '❤️'}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-300 uppercase font-mono">
              Our Little Love Quiz 🤭💚
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-rose-200/80 bg-black/60 px-3.5 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <span>Score:</span>
            <span className="text-amber-300 font-bold font-mono text-sm">
              {score}
            </span>
            <span>/ {questions.length}</span>
          </div>
        </div>

        <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-emerald-500/20 mb-6 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-rose-500 transition-all duration-300 shadow-md shadow-emerald-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex items-center justify-between gap-3 mb-4 px-2">
          <div className="flex items-center gap-2 text-xs text-emerald-200 font-mono">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Behind Question:</span>
            <span className="text-amber-200 font-semibold">
              {revealPhoto.caption}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-400/60 shadow-lg shrink-0 transform hover:scale-125 transition-transform duration-300">
            <img
              src={revealPhoto.url}
              alt={revealPhoto.caption}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full glass-panel-emerald p-6 sm:p-8 rounded-3xl border border-emerald-400/40 mb-6 shadow-2xl relative bg-black/75 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-500/20">
            <span className="text-xs font-mono tracking-widest text-emerald-300 uppercase font-bold">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs text-rose-300/80 font-mono">
              {hasSubmitted ? 'Submitted' : 'Tap an option to answer'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mb-6 leading-relaxed text-left drop-shadow-sm">
            {currentQ?.question}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQ?.options.map((opt, idx) => {
              const isSelected = selectedAns === idx;
              const isAnswer = idx === currentQ.correctAnswerIndex;
              let btnClass =
                'bg-white/5 border-white/10 text-rose-100 hover:bg-white/10 hover:border-emerald-400/40';

              if (hasSubmitted) {
                if (isAnswer) {
                  btnClass =
                    'bg-emerald-950/90 border-emerald-400 text-emerald-100 font-bold ring-2 ring-emerald-400 shadow-lg shadow-emerald-950/60';
                } else if (isSelected && !isAnswer) {
                  btnClass =
                    'bg-rose-950/90 border-rose-500 text-rose-200 font-medium ring-1 ring-rose-400';
                } else {
                  btnClass =
                    'bg-white/5 border-white/5 text-rose-100/30 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span className="text-sm sm:text-base leading-snug">{opt}</span>
                  {hasSubmitted && isAnswer && (
                    <CircleCheckBig className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {hasSubmitted && isSelected && !isAnswer && (
                    <CircleX className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {hasSubmitted && currentQ && (
            <div
              className={`p-4 rounded-2xl border text-sm sm:text-base text-left animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-950/80 border-emerald-400/50 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <Sparkles
                  className={`w-4 h-4 mt-1 shrink-0 ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                />
                <div>
                  <span className="font-semibold block mb-0.5 font-mono text-xs uppercase tracking-wide">
                    {isCorrect ? "Sowmiyaa's Reaction: " : 'Hint from Sowmiyaa: '}
                  </span>
                  <p className="leading-relaxed font-serif-luxury font-normal">
                    {isCorrect ? currentQ.feedback : currentQ.wrongHint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-white/10 transition-all ${
              currentIdx === 0
                ? 'opacity-40 cursor-not-allowed bg-white/5 text-white/40'
                : 'bg-white/10 hover:bg-white/20 text-rose-200 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="text-xs text-rose-300/60 hover:text-emerald-300 underline underline-offset-4 cursor-pointer hidden sm:block"
            >
              Custom Questions Spec
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!hasSubmitted}
            className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition-all ${
              hasSubmitted
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 cursor-pointer border border-emerald-300/40'
                : 'opacity-50 cursor-not-allowed bg-emerald-950/60 text-emerald-200/40 border border-emerald-900/40'
            }`}
          >
            <span>
              {currentIdx === questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
