export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedback: string;
  wrongHint: string;
}

export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date: string;
  category: 'romantic' | 'favourite' | 'special' | 'funny';
  location?: string;
  isFavorite?: boolean;
}

export interface MemoryVideo {
  id: string;
  url: string;
  title: string;
  caption: string;
  date: string;
}

export interface SowRamContent {
  couple: {
    boyfriendName: string;
    boyfriendFullName: string;
    girlfriendName: string;
    identityName: string;
    subtitle: string;
    specialDate: string;
    romanticDateDisplay: string;
    dateQuote: string;
    themeSong: {
      title: string;
      fullTitle: string;
      movie: string;
      audioSrc: string;
      spotifyUrl: string;
      youtubeUrl: string;
    };
  };
  openingScreen: {
    badge: string;
    headline: string;
    dateDisplay: string;
    tagline: string;
    salutation: string;
    messageParagraphs: string[];
    invitation: string;
    enterButtonText: string;
    posterPhoto: string;
  };
  welcome: {
    headline: string;
    messageParagraphs: string[];
    buttonText: string;
  };
  anniversaryMystery: {
    headline: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    wrongHints: string[];
    celebrationText: string;
    revealPhotos: string[];
  };
  loveQuiz: {
    headline: string;
    introParagraphs: string[];
    startButtonText: string;
    questions: QuizQuestion[];
  };
  memories: {
    headline: string;
    subtitle: string;
    introParagraphs: string[];
    buttonText: string;
    photos: MemoryPhoto[];
    videos: MemoryVideo[];
  };
  finalSurprise: {
    headline: string;
    messageParagraphs: string[];
    openButtonText: string;
    birthdayVideoPoster: string;
  };
  loveLetter: {
    title: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signOff: string;
    motto: string;
  };
  lastHug: {
    buttonText: string;
    hugTitle: string;
    messageParagraphs: string[];
    signOff: string;
  };
}
