import { useState } from 'react';
import {
  Check,
  CircleQuestionMark,
  Code,
  Copy,
  FileText,
  RotateCcw,
  Save,
  SlidersVertical,
  X,
} from 'lucide-react';
import { SowRamContent } from '../types';
import { resetContent, saveContent } from '../data/defaultContent';
import { soundEngine } from '../utils/soundEngine';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContent: SowRamContent;
  onSave: (content: SowRamContent) => void;
}

export function CustomizerModal({
  isOpen,
  onClose,
  currentContent,
  onSave,
}: CustomizerModalProps) {
  const [tab, setTab] = useState<'quiz' | 'letter' | 'rawJson'>('quiz');
  const [draft, setDraft] = useState<SowRamContent>(currentContent);
  const [rawJson, setRawJson] = useState(
    JSON.stringify(currentContent, null, 2)
  );
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    let next = draft;
    if (tab === 'rawJson') {
      try {
        next = JSON.parse(rawJson);
      } catch {
        setStatus('Invalid JSON format! Please check syntax.');
        return;
      }
    }
    saveContent(next);
    onSave(next);
    setStatus('Saved successfully to browser storage! ❤️');
    soundEngine.playSuccess();
    setTimeout(() => setStatus(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all content back to original defaults?')) {
      const def = resetContent();
      setDraft(def);
      setRawJson(JSON.stringify(def, null, 2));
      onSave(def);
      setStatus('Reset to defaults successfully.');
      soundEngine.playSparkle();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
    setCopied(true);
    soundEngine.playSparkle();
    setTimeout(() => setCopied(false), 2000);
  };

  const updateQuestionField = (
    qIdx: number,
    field: 'question' | 'feedback' | 'wrongHint',
    value: string
  ) => {
    const questions = [...draft.loveQuiz.questions];
    questions[qIdx] = { ...questions[qIdx], [field]: value };
    const next = { ...draft, loveQuiz: { ...draft.loveQuiz, questions } };
    setDraft(next);
    setRawJson(JSON.stringify(next, null, 2));
  };

  const updateOption = (qIdx: number, optIdx: number, value: string) => {
    const questions = [...draft.loveQuiz.questions];
    const options = [...questions[qIdx].options];
    options[optIdx] = value;
    questions[qIdx] = { ...questions[qIdx], options };
    const next = { ...draft, loveQuiz: { ...draft.loveQuiz, questions } };
    setDraft(next);
    setRawJson(JSON.stringify(next, null, 2));
  };

  const updateCorrectIndex = (qIdx: number, optIdx: number) => {
    const questions = [...draft.loveQuiz.questions];
    questions[qIdx] = { ...questions[qIdx], correctAnswerIndex: optIdx };
    const next = { ...draft, loveQuiz: { ...draft.loveQuiz, questions } };
    setDraft(next);
    setRawJson(JSON.stringify(next, null, 2));
  };

  const tabs = [
    { id: 'quiz' as const, label: '15 Quiz Questions', icon: CircleQuestionMark },
    { id: 'letter' as const, label: 'Love Letter', icon: FileText },
    { id: 'rawJson' as const, label: 'Paste / Export JSON', icon: Code },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-[#14060d] border border-rose-500/30 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-rose-500/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <SlidersVertical className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-serif-luxury font-bold text-white">
                Customize SowRam Content &amp; Specification
              </h3>
              <p className="text-xs text-rose-200/70">
                Easily modify quiz questions, Truth/Dare prompts, and the love
                letter anytime!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-rose-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 p-2 bg-black/60 border-b border-rose-500/10 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  tab === t.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-rose-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-left">
          {tab === 'quiz' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-rose-200/80 bg-rose-950/40 p-3 rounded-xl border border-rose-500/20">
                💡 Sowmiyaa, you can customize all 15 questions, answer options,
                and select the correct answer below. Changes take effect as soon
                as you hit Save!
              </p>

              {draft.loveQuiz.questions.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Question #{qIdx + 1}
                    </span>
                    <span className="text-[11px] text-amber-300">
                      Select radio to pick correct answer
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-rose-200/80 block mb-1">
                      Question Text:
                    </label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) =>
                        updateQuestionField(qIdx, 'question', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          q.correctAnswerIndex === optIdx
                            ? 'bg-emerald-950/50 border-emerald-500'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`correct_q_${q.id}`}
                          checked={q.correctAnswerIndex === optIdx}
                          onChange={() => updateCorrectIndex(qIdx, optIdx)}
                          className="accent-emerald-500 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            updateOption(qIdx, optIdx, e.target.value)
                          }
                          className="flex-1 bg-transparent text-xs text-white focus:outline-hidden"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs text-rose-200/80 block mb-1">
                      Personalized Feedback Note:
                    </label>
                    <input
                      type="text"
                      value={q.feedback}
                      onChange={(e) =>
                        updateQuestionField(qIdx, 'feedback', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-rose-200 text-xs focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-rose-200/80 block mb-1">
                      Funny Hint on Wrong Guess:
                    </label>
                    <input
                      type="text"
                      value={q.wrongHint}
                      onChange={(e) =>
                        updateQuestionField(qIdx, 'wrongHint', e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-amber-200 text-xs focus:border-rose-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-rose-200 block mb-1">
                  Letter Salutation:
                </label>
                <input
                  type="text"
                  value={draft.loveLetter.salutation}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      loveLetter: {
                        ...draft.loveLetter,
                        salutation: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs text-rose-200 block mb-1">
                  Letter Paragraphs:
                </label>
                {draft.loveLetter.paragraphs.map((p, idx) => (
                  <textarea
                    key={idx}
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const nextParagraphs = [...draft.loveLetter.paragraphs];
                      nextParagraphs[idx] = e.target.value;
                      setDraft({
                        ...draft,
                        loveLetter: {
                          ...draft.loveLetter,
                          paragraphs: nextParagraphs,
                        },
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-rose-100 text-sm mb-2 focus:outline-hidden"
                  />
                ))}
              </div>

              <div>
                <label className="text-xs text-rose-200 block mb-1">
                  Letter Sign-off:
                </label>
                <input
                  type="text"
                  value={draft.loveLetter.signOff}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      loveLetter: {
                        ...draft.loveLetter,
                        signOff: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {tab === 'rawJson' && (
            <div className="space-y-3">
              <p className="text-xs text-rose-200/80">
                You can copy this JSON to backup your configuration, or paste
                your exact full specification JSON here and click Save!
              </p>
              <textarea
                rows={14}
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                className="w-full font-mono text-xs p-3 rounded-xl bg-black/80 border border-white/20 text-emerald-300 focus:outline-hidden"
              />
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-3 bg-black/40">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-rose-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-amber-300 hover:text-white bg-amber-950/40 border border-amber-400/20 hover:bg-amber-900/40 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'Copied JSON!' : 'Copy Config'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {status && (
              <span className="text-xs text-emerald-400 font-medium animate-pulse">
                {status}
              </span>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950 transition-all cursor-pointer border border-emerald-400/30"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
