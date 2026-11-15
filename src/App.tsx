/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SlidersVertical } from 'lucide-react';
import { EntryGate } from './components/EntryGate';
import { FloatingParticles } from './components/FloatingParticles';
import { MusicPlayer } from './components/MusicPlayer';
import { Header } from './components/Header';
import { OpeningScreen } from './components/OpeningScreen';
import { BirthdayWelcome } from './components/BirthdayWelcome';
import { SpecialDay } from './components/SpecialDay';
import { LoveQuiz } from './components/LoveQuiz';
import { Memories } from './components/Memories';
import { FinalSurprise } from './components/FinalSurprise';
import { CustomizerModal } from './components/CustomizerModal';
import { loadContent } from './data/defaultContent';
import { SowRamContent } from './types';

export default function App() {
  const [showGate, setShowGate] = useState(true);
  const [currentSection, setCurrentSection] = useState(1);
  const [content, setContent] = useState<SowRamContent>(() => loadContent());
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const navigateTo = (section: number) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080305] text-[#fce7f3] selection:bg-rose-700 selection:text-white font-sans overflow-x-hidden">
      {showGate && (
        <EntryGate
          onEnter={() => {
            setShowGate(false);
            navigateTo(1);
          }}
        />
      )}

      <FloatingParticles />
      <MusicPlayer content={content} />

      {!showGate && currentSection > 1 && (
        <Header
          currentSection={currentSection}
          onNavigate={navigateTo}
          onOpenCustomizer={() => setCustomizerOpen(true)}
        />
      )}

      {!showGate && (
        <main className={currentSection > 1 ? 'pt-14 sm:pt-16' : ''}>
          {currentSection === 1 && (
            <OpeningScreen
              content={content}
              onComplete={() => navigateTo(2)}
            />
          )}
          {currentSection === 2 && (
            <BirthdayWelcome
              content={content}
              onOpenSurprise={() => navigateTo(3)}
            />
          )}
          {currentSection === 3 && (
            <SpecialDay
              content={content}
              onProceedToQuiz={() => navigateTo(4)}
            />
          )}
          {currentSection === 4 && (
            <LoveQuiz
              content={content}
              onProceedToMemories={() => navigateTo(5)}
              onOpenCustomizer={() => setCustomizerOpen(true)}
            />
          )}
          {currentSection === 5 && (
            <Memories
              content={content}
              onProceedToFinalSurprise={() => navigateTo(6)}
            />
          )}
          {currentSection === 6 && <FinalSurprise content={content} />}
        </main>
      )}

      {!showGate && currentSection > 1 && (
        <footer className="relative z-20 py-10 px-4 border-t border-emerald-900/40 bg-[#050204] text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury font-bold text-lg text-rose-200">
                SowRam ❤️
              </span>
              <span className="text-xs text-rose-400/80">•</span>
              <span className="text-xs text-emerald-400 font-medium">
                Our Own Little World 💚
              </span>
              <span className="text-xs text-rose-400/80">•</span>
              <span className="text-xs text-amber-300 font-mono">
                07 • 11 • 2026
              </span>
            </div>
            <p className="text-xs text-rose-300/80 max-w-md font-light leading-relaxed">
              Crafted with all the love, hugs, and forever promises by Sowmiyaa
              for Ramesh. Happy Birthday to my world! 🌍💚
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] text-emerald-400/70">
              <button
                onClick={() => setCustomizerOpen(true)}
                className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
              >
                <SlidersVertical className="w-3 h-3" />
                <span>Customize Content / Questions</span>
              </button>
              <span>•</span>
              <span className="italic">
                “Paathi Nee Paathi Naa ❤️ | SowRam Love Theme 💚”
              </span>
            </div>
          </div>
        </footer>
      )}

      <CustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        currentContent={content}
        onSave={(next) => setContent(next)}
      />
    </div>
  );
}
