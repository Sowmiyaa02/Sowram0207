import { SowRamContent } from '../types';

export const REPLACEMENT_PHOTO_URL = '/assets/aistudio/4_df8a631c.jpg';
export const SWEET_MOMENTS_PHOTO_URL = '/assets/aistudio/8_fae255ee.jpg';

export const DEFAULT_CONTENT: SowRamContent = {
  couple: {
    boyfriendName: 'Ramesh',
    boyfriendFullName: 'Ramesh',
    girlfriendName: 'Sowmiyaa',
    identityName: 'SowRam ❤️',
    subtitle: 'Our Own Little World 💚',
    specialDate: '07 November 2026',
    romanticDateDisplay: '07 • 11 • 2026 ❤️',
    dateQuote:
      'One special day, two beautiful reasons to celebrate — your birthday and our love. 💚🌷❤️',
    themeSong: {
      title: 'Paathi Nee Paathi Naa',
      fullTitle: 'Paathi Nee Paathi Naa ❤️ | Our SowRam Love Theme 💚',
      movie: 'Nitham Oru Vaanam',
      audioSrc: '/audio/paathi-nee-paathi-naa.mp3',
      spotifyUrl:
        'https://open.spotify.com/search/Paathi%20Nee%20Paathi%20Naa%20Nitham%20Oru%20Vaanam',
      youtubeUrl:
        'https://www.youtube.com/results?search_query=Paathi+Nee+Paathi+Naa+Nitham+Oru+Vaanam',
    },
  },
  openingScreen: {
    badge: 'SowRam ❤️ — Our Own Little World 💚',
    headline: 'Happy Birthday to My World 🌍❤️',
    dateDisplay: '07 November 2026',
    tagline:
      'A sacred universe created by Sowmiyaa with all her heart for Ramesh ❤️',
    salutation: 'Hey, my Ramesh… 💚🌷',
    messageParagraphs: [
      'Today is the day the most handsome, kind-hearted soul was born into this universe — the person who turned my whole life into heaven on earth. Every beat of my heart belongs to you, baby.',
      'I have created this little surprise for you, filled with our deepest memories, our late-night giggles, our warm hugs, and all the magical moments that make us SowRam.',
    ],
    invitation: 'Ready to step into our own little world, my love?',
    enterButtonText: 'Enter My Heart ❤️',
    posterPhoto: '/images/13_a75e867c.jpg',
  },
  welcome: {
    headline: 'Happy Birthday, My Whole World! ❤️🎂',
    messageParagraphs: [
      "If someone asks me what my favourite place in this world is, I won't name a country or a city.",
      "I'll say it's wherever you are, baby. 💚🌷 In your warm embrace, resting my head on your chest, hearing your heartbeat.",
      'Today, I wish I could pause time, hold you close, and remind you how deeply and unconditionally you are loved.',
      'Every click has a surprise, every picture has a story, and every memory has a piece of my heart. Step inside, my king.',
    ],
    buttonText: 'Open Your Surprise 💌',
  },
  anniversaryMystery: {
    headline: 'Baby, Do You Remember This Day? ❤️',
    question:
      "Today is more than just your birthday. There's another reason my heart feels extra happy. Can you guess what makes today even more special for us?",
    options: [
      'Our first meeting',
      'Our love anniversary ❤️',
      'Our first date',
    ],
    correctAnswerIndex: 1,
    wrongHints: [
      'Ahem! Think about the flutter in our hearts... Guess again, my love! 🙈',
      'Wrong guess mister! Sowmiyaa is watching you with an eyebrow raised! Think about US! 😉💚',
      'Come on, Ramesh! You know this date by heart! Our sweetest beginning... ❤️',
    ],
    celebrationText:
      "Yesss, baby! It's OUR special day too! 💚🌷❤️ Happy Birthday to you and Happy Love Anniversary to us. Two beautiful reasons to celebrate, but my favourite reason will always be YOU. ❤️ — Your Sowmiyaa",
    revealPhotos: [
      SWEET_MOMENTS_PHOTO_URL,
      REPLACEMENT_PHOTO_URL,
      '/images/13_a75e867c.jpg',
      '/images/18_dab562c2.jpg',
    ],
  },
  loveQuiz: {
    headline: 'How Well Do You Know Your Girl? 💚',
    introParagraphs: [
      "You call me your girl, but let's see how much you remember about me and our little world!",
      "From my silly nicknames to our sweetest memories, let's see how many answers your heart remembers.",
      'No cheating, birthday boy! I know you better than you think. 😌❤️',
    ],
    startButtonText: "Let's Play, Baby! 🎮",
    questions: [
      {
        id: 1,
        question:
          'If both of them get hungry while travelling, who becomes more impatient?',
        options: [
          'Sowmiyaa 🍟',
          'Ramesh 🍔',
          'Both become dangerous 😂',
          'Whoever gets hungry first!',
        ],
        correctAnswerIndex: 2,
        feedback:
          'Haha yes! Both become dangerous 😂 — nobody dare stand between SowRam and food when we are hungry on a trip! 🍟🍔',
        wrongHint:
          "Think about both of us on an empty stomach while travelling... it's double trouble! 😂",
      },
      {
        id: 2,
        question: 'What did Sowmiyaa call you when you first started talking? ❤️',
        options: ['Baby', 'Anna', 'Chellam', 'Dear'],
        correctAnswerIndex: 1,
        feedback:
          'Haha! Sowmiyaa called you "Anna"! Look where destiny took us—from Anna to the love of our lives! 😂❤️',
        wrongHint:
          'She was so formal and innocent back then! Remember that funny family title? 🤭',
      },
      {
        id: 3,
        question:
          'Who is most likely to say "I\'m fine" when clearly not fine?',
        options: ['Sowmiyaa', 'Ramesh', 'Both of us 😂', 'Nobody!'],
        correctAnswerIndex: 2,
        feedback:
          'Both of us 😂! We always pretend we are totally fine even when our faces give everything away in two seconds! ❤️',
        wrongHint:
          'Is it just one of us, or are both of us equally guilty of this? 🤭',
      },
      {
        id: 4,
        question:
          'Who makes Sowmiyaa feel the most fear when she sees them?',
        options: ['Dogs', 'Monkeys', 'Lizards', "Sowmiyaa's dad"],
        correctAnswerIndex: 3,
        feedback:
          'Yes, baby... Sowmiyaa feels the most fear when she sees her dad! You know your girl so well! 🥺❤️',
        wrongHint: 'Think about who Sowmiyaa is most scared of! 🙈',
      },
      {
        id: 5,
        question: 'How many times have we met in Trichy?',
        options: ['5 times', '8 times', '12 times', '15 times'],
        correctAnswerIndex: 2,
        feedback:
          '12 unforgettable times in Trichy! Every single visit, bus ride, and goodbye holds a piece of our souls! 🚆✨',
        wrongHint:
          'More than 10, but not as high as 15! Think about every Trichy trip! 🗓️',
      },
      {
        id: 6,
        question:
          'What was the reason Sowmiyaa first started chatting with Ramesh?',
        options: [
          'To wish Ramesh on his birthday 🎂',
          'To wish Sowmiyaa on her birthday',
          'To ask him something',
          'To share reels and start a conversation',
        ],
        correctAnswerIndex: 0,
        feedback:
          'Yes! To wish Ramesh on his birthday 🎂 — one simple birthday wish turned into our whole little world! ❤️💚',
        wrongHint:
          'It all began with a very special celebration day of yours! 🎂✨',
      },
      {
        id: 7,
        question: 'Who sent the first Instagram follow request?',
        options: [
          'Sowmiyaa',
          'Ramesh',
          'Both sent it at the same time',
          'Neither of them',
        ],
        correctAnswerIndex: 1,
        feedback:
          'Ramesh! You made that very first move on Instagram and clicked follow on our forever story! 📱💚',
        wrongHint:
          'Think back to who tapped that follow button first on Instagram! 😉',
      },
      {
        id: 8,
        question: 'How many years have we been in love?',
        options: ['5 years', '3 years', '2½ years', '4 years'],
        correctAnswerIndex: 3,
        feedback:
          '4 beautiful, cherished years of SowRam! 4 years of love, growth, and forever promises! ♾️💚',
        wrongHint:
          'Four complete solar orbits of our hearts intertwined! 🌍💫',
      },
      {
        id: 9,
        question: "What's our love theme colour?",
        options: ['Purple', 'Yellow', 'Pink', 'Green'],
        correctAnswerIndex: 3,
        feedback:
          'Green! Our trademark SowRam color—fresh, peaceful, eternal like our love! 💚',
        wrongHint:
          'Look at the green heart at the end of every message Sowmiyaa sends you! 💚',
      },
      {
        id: 10,
        question: "What are Sowmiyaa's top three favourite colours?",
        options: [
          'Green, Blue, Black',
          'Yellow, Purple, Red',
          'White, Pink, Purple',
          'Purple, Green, Yellow',
        ],
        correctAnswerIndex: 3,
        feedback:
          "Purple, Green, Yellow! You know your girl's world and aesthetic down to every shade! 🎨🌸",
        wrongHint:
          'Her top three magical shades—think royalty, SowRam, and sunshine! ☀️',
      },
      {
        id: 11,
        question: 'Who was the first person to express their feelings?',
        options: [
          'Sowmiyaa',
          'Ramesh',
          'Both of us ❤️',
          'Still a secret 🤭',
        ],
        correctAnswerIndex: 2,
        feedback:
          'Both of us ❤️! Our hearts knew and spoke the same language at the very same time! 💚🌷',
        wrongHint:
          'Neither could wait—both hearts felt it together! ❤️',
      },
      {
        id: 12,
        question: 'Who usually starts the conversation after a fight?',
        options: [
          'Sowmiyaa',
          'Ramesh',
          'Both of us',
          'Nobody, we wait 😂',
        ],
        correctAnswerIndex: 1,
        feedback:
          'Ramesh! My sweet boy always melts my anger and starts talking first because he can never stay quiet for long! 🥰💚',
        wrongHint:
          'Who is always the sweetheart who breaks the silence first after a silly fight? 🥺',
      },
      {
        id: 13,
        question:
          'If Sowmiyaa says "I\'m not angry", what does it actually mean?',
        options: [
          "She's totally fine 😇",
          "She's silently angry 😒",
          'Ramesh is in trouble 😂',
          'Better not ask anything! 🤣',
        ],
        correctAnswerIndex: 2,
        feedback:
          'Haha yes! Ramesh is in trouble 😂 — you already know the warning sign better than anyone! ❤️',
        wrongHint:
          'If she says "I\'m not angry", you already know who needs to watch out! 😂',
      },
      {
        id: 14,
        question:
          'When Sowmiyaa says "I\'m going to sleep", what happens next?',
        options: [
          'She actually sleeps 😴',
          'Starts another conversation 😂',
          'Sends reels continuously 📱',
          'Waits for Ramesh to say good night ❤️',
        ],
        correctAnswerIndex: 2,
        feedback:
          'Sends reels continuously 📱! "Good night" actually means at least 20 more Instagram reels incoming! 😂❤️',
        wrongHint:
          'Check your Instagram DMs right after she says she is going to sleep! 📱🤭',
      },
      {
        id: 15,
        question:
          "Who is more likely to steal the other's food without asking? 😂",
        options: [
          'Sowmiyaa 🍟',
          'Ramesh 🍕',
          'Both are food thieves 🤣',
          'Whoever gets the chance first! 😜',
        ],
        correctAnswerIndex: 0,
        feedback:
          'Sowmiyaa 🍟! And you always smilingly let your girl take the best bite without complaining! 😋❤️',
        wrongHint:
          'Think about whose hand sneaks onto the plate first for those fries! 🍟😜',
      },
    ],
  },
  memories: {
    headline: 'A Little World Called Us ❤️',
    subtitle: 'Our Memories 📸',
    introParagraphs: [
      'Every picture has a story. Every smile holds a feeling. Every memory takes me back to a moment when it was just you and me.',
      'We may forget the little details someday, but I hope we never forget how these moments made us feel.',
      "These pictures aren't just memories, baby. They're little pieces of my favourite world — our world. 🌍💚",
    ],
    buttonText: 'Relive Our Memories 💚🌷',
    photos: [
      {
        id: 'p-26',
        url: SWEET_MOMENTS_PHOTO_URL,
        title: 'Our Sweet Moments & Smiles 💚🌷',
        caption:
          'Looking at you with all the love in my eyes! Every sweet glance and warm moment with Ramesh makes my heart melt into pure love! 💚🌷',
        date: 'Forever Romance',
        category: 'romantic',
        location: 'In Your Loving Arms',
        isFavorite: true,
      },
      {
        id: 'p-27',
        url: REPLACEMENT_PHOTO_URL,
        title: 'Warm Tender Embrace 💚',
        caption:
          'Holding each other close in complete warmth and peace, resting peacefully in your loving arms. Pure SowRam bliss! 💚',
        date: 'Our Sacred Embrace',
        category: 'romantic',
        location: 'Our Cozy World',
        isFavorite: true,
      },
      {
        id: 'p-u1',
        url: '/assets/aistudio/3_a81a6fdc.jpg',
        title: 'Bright Smiles Together 💚🌷',
        caption:
          'That soft, happy glow whenever we sit side by side—nothing compares to the peace of being right next to you!',
        date: 'Cherished Date',
        category: 'favourite',
        location: 'Our Cozy Spot',
        isFavorite: true,
      },
      {
        id: 'p-u2',
        url: '/assets/aistudio/7_520c3b2b.jpg',
        title: 'Blue Tile Cafe Selfie 💚',
        caption:
          'Sitting together at our favorite blue-tiled corner, smiling wide and soaking in every second of us!',
        date: 'Cafe Hangout',
        category: 'favourite',
        location: 'Our Favorite Cafe',
        isFavorite: true,
      },
      {
        id: 'p-u3',
        url: '/assets/aistudio/9_b5b2b5cd.jpg',
        title: 'Sunlit Booth Smiles ☀️',
        caption:
          'Twin smiles across the booth—simple moments like this are my absolute favourite chapter of our story.',
        date: 'Sweet Outing',
        category: 'romantic',
        location: 'Lunch Date',
        isFavorite: true,
      },
      {
        id: 'p-u4',
        url: '/assets/aistudio/11_d7ca09e3.jpg',
        title: 'Shopping Mirror Kiss-Pout 😘',
        caption:
          'Playful mirror selfie while shopping together—you smiling softly behind me while I strike my signature pout!',
        date: 'Shopping Fun',
        category: 'funny',
        location: 'Clothing Store',
        isFavorite: true,
      },
      {
        id: 'p-u5',
        url: '/assets/aistudio/12_d7b0409d.jpg',
        title: 'Side by Side Happiness ❤️',
        caption:
          'Always smiling brighter whenever you are right beside me. Two hearts in sync forever!',
        date: 'Special Day',
        category: 'special',
        location: 'Cafe Table',
        isFavorite: true,
      },
      {
        id: 'p-u6',
        url: '/assets/aistudio/5_d0f7d485.jpg',
        title: 'Evening Shoulder Lean 💚🌷',
        caption:
          'Leaning gently onto your shoulder in the evening breeze, feeling like the luckiest girl in the world.',
        date: 'Evening Walk',
        category: 'romantic',
        location: 'Together Forever',
        isFavorite: true,
      },
      {
        id: 'p-u7',
        url: '/assets/aistudio/6_6deed1de.jpg',
        title: 'Pure Giggles & Joy 😂💚',
        caption:
          'Laughing out loud together without a care in the world—our happiest, silliest candid moment!',
        date: 'Fun Moments',
        category: 'funny',
        location: 'Home Sweet Home',
        isFavorite: true,
      },
      {
        id: 'p-u8',
        url: '/assets/aistudio/10_5419aa8e.jpg',
        title: 'Playful Cheek Pout 😚',
        caption:
          'Sneaking a cute pout right next to you while you try to keep a straight smiling face!',
        date: 'Sweet Date',
        category: 'funny',
        location: 'Blue Tile Cafe',
        isFavorite: true,
      },
      {
        id: 'p-13',
        url: '/images/13_a75e867c.jpg',
        title: 'Happy Birthday My Love',
        caption:
          'Handwritten green sticky note with green heart and "Enna Senthazh..." song drawing. Our pure love in one frame! 💚',
        date: '07 Nov 2026',
        category: 'romantic',
        location: 'In My Hand & Soul',
        isFavorite: true,
      },
      {
        id: 'p-18',
        url: '/images/18_dab562c2.jpg',
        title: 'Bike Ride Tight Hug',
        caption:
          'Hugging Ramesh tight around his waist while the wind rushes past us. Rings shining, hearts beating as one! 🛵💨❤️',
        date: 'Bike Ride Days',
        category: 'romantic',
        location: 'On the Road Together',
        isFavorite: true,
      },
      {
        id: 'p-20',
        url: '/images/20_bc4d7471.jpg',
        title: 'Cloudy Highway Smiles',
        caption:
          'Stopping on the road under the cloudy sky. That genuine, bright smile of yours lights up my entire universe!',
        date: 'Highway Adventure',
        category: 'favourite',
        location: 'Highway Roadtrip',
        isFavorite: true,
      },
      {
        id: 'p-15',
        url: '/images/15_e442ba55.jpg',
        title: 'Interlocked Saturday Hands',
        caption:
          'Fingers intertwined on the ancient stone steps. Saturday 07:41 pm — when time completely stood still for SowRam.',
        date: 'Saturday 07:41 pm',
        category: 'special',
        location: 'Stone Steps Temple',
        isFavorite: true,
      },
      {
        id: 'p-21',
        url: '/images/21_54fa7506.jpg',
        title: 'Fingers Locked In Love',
        caption:
          'Close-up of our hands clasped tightly together. Your warm grip is my ultimate peace and safety. 🤝💚',
        date: 'Everyday Warmth',
        category: 'romantic',
        location: 'Everywhere with You',
        isFavorite: true,
      },
      {
        id: 'p-23',
        url: '/images/23_583d551c.jpg',
        title: "Resting on Ramesh's Shoulder",
        caption:
          'Resting my head on Ramesh in his black shirt, beaming with pure happiness. Wearing the heart pendant you love!',
        date: 'Cherished Date',
        category: 'favourite',
        location: 'Cafe Corner',
        isFavorite: true,
      },
      {
        id: 'p-14',
        url: '/images/14_10cf6bb8.jpg',
        title: 'Tilak Wall Hug',
        caption:
          'Leaning shyly and happily against your chest near the holy wall. Ramesh smiling handsomely into the sunshine!',
        date: 'Temple Visit',
        category: 'special',
        location: 'Temple Courtyard',
        isFavorite: true,
      },
      {
        id: 'p-17',
        url: '/images/17_ff732af7.jpg',
        title: 'Shopping Mall Mirror Selfie',
        caption:
          'Sowmiyaa in yellow smiling affectionately, looking up at her handsome boy taking our photo in the cosmetics aisle!',
        date: 'Shopping Day',
        category: 'funny',
        location: 'Mall Outing',
        isFavorite: false,
      },
      {
        id: 'p-16',
        url: '/images/16_ef382ef6.jpg',
        title: 'Pout & Chill Under Red Lights',
        caption:
          'Sowmiyaa giving her signature playful pout while Ramesh gives his cool, handsome stare under warm neon lights!',
        date: 'Evening Hangout',
        category: 'funny',
        location: 'Cozy Hangout',
        isFavorite: false,
      },
      {
        id: 'p-19',
        url: '/images/19_25fff54a.jpg',
        title: 'Blue Night Glow',
        caption:
          'Smiling softly in the cool blue evening lights. Standing close and grateful for every breath we share together.',
        date: 'Night Out',
        category: 'romantic',
        location: 'Night Cafe',
        isFavorite: false,
      },
      {
        id: 'p-22',
        url: '/images/22_7b611d89.jpg',
        title: 'Side by Side Snuggle',
        caption:
          'Shoulder to shoulder in our favorite colors, fingers locked with the sweet green heart. SowRam forever! 💚',
        date: 'Cozy Moments',
        category: 'special',
        location: 'Our Sacred Space',
        isFavorite: true,
      },
      {
        id: 'p-7',
        url: '/images/7_992f0743.jpg',
        title: 'Our Anthem & Motto',
        caption:
          '>> Unnaiyandri enaku yethu yethir kaalamee !! 💚 Relaxed, happy, and 100% destined for each other.',
        date: 'Our Special Day',
        category: 'special',
        location: 'Our Cozy Corner',
        isFavorite: true,
      },
      {
        id: 'p-8',
        url: '/images/8_3d884414.jpg',
        title: 'Passports to Forever',
        caption:
          'Holding our passport photos together. Two young souls whose destinies were written long before they knew.',
        date: 'Destiny in Hand',
        category: 'special',
        location: 'In My Palm',
        isFavorite: true,
      },
      {
        id: 'p-12',
        url: '/images/12_4dd4c991.jpg',
        title: 'Little Ramesh & Little Sowmiyaa',
        caption:
          'Side by side childhood photos! Who knew these two babies would grow up to build "Our Own Little World 💚"?',
        date: 'Childhood Destiny',
        category: 'special',
        location: 'Written in the Stars',
        isFavorite: true,
      },
      {
        id: 'p-1',
        url: '/images/1_b217d761.jpg',
        title: 'Cafe Date Sweetness',
        caption:
          'Sharing laughs and cold chocolate drinks. That radiance on our faces says everything words cannot.',
        date: 'Cafe Date',
        category: 'favourite',
        location: 'Our Favorite Table',
        isFavorite: true,
      },
      {
        id: 'p-3',
        url: '/images/3_165dddf5.jpg',
        title: 'Cute Kiss Pout',
        caption:
          "Sowmiyaa pouting a sweet kiss toward Ramesh's cheek while he beams with total happiness! 😚",
        date: 'Sweet Moments',
        category: 'funny',
        location: 'Cafe Corner',
        isFavorite: true,
      },
      {
        id: 'p-5',
        url: '/images/5_270d6070.jpg',
        title: 'Shoulder Rest & Holding Hands',
        caption:
          'Head rested on your shoulder, holding your hand on the dark table. The safest harbor on earth.',
        date: 'Pure Romance',
        category: 'romantic',
        location: 'In Your Arms',
        isFavorite: true,
      },
      {
        id: 'p-10',
        url: '/images/10_eb19981f.jpg',
        title: 'Sunlit Waterfront Ring',
        caption:
          'Sunlight glistening off the water, showing off the ring with a kiss-pout! Warm breezes and deep love.',
        date: 'Waterside View',
        category: 'romantic',
        location: 'Reservoir Breeze',
        isFavorite: true,
      },
      {
        id: 'p-11',
        url: '/images/11_7264b69f.jpg',
        title: 'Breezy Bus Travel',
        caption:
          'Bumpy bus rides, wind in our hair, and shared laughter that made the whole commute feel like magic! 🚌💨',
        date: 'Travel Memories',
        category: 'funny',
        location: 'Window Seat Journey',
        isFavorite: false,
      },
      {
        id: 'p-9',
        url: '/images/9_107e15ce.jpg',
        title: 'Traditional Grace',
        caption:
          'Dressed up in traditional silk and charm. Both blessed with tilak and eternal divine love.',
        date: 'Festive Day',
        category: 'special',
        location: 'Celebration',
        isFavorite: true,
      },
    ],
    videos: [
      {
        id: 'v-1',
        url: '/videos/video_1.mp4',
        title: 'SowRam Reel #1: Our Unforgettable Moments 💚',
        caption:
          'Sweet memories, warm giggles, and our cute moments set to our romantic songs! 🎥✨',
        date: 'Special Memories',
      },
      {
        id: 'v-2',
        url: '/videos/video_2.mp4',
        title: 'SowRam Reel #2: Pure Love & Forever Vows ❤️',
        caption:
          'Every smile of yours is my world. Our endless romance and happiness captured forever! 💚🌷💖',
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
    ],
  },
  finalSurprise: {
    headline: 'One Last Surprise for My World ❤️',
    messageParagraphs: [
      "Baby, you've reached the final chapter of this little journey.",
      "I've filled this website with our pictures, our laughter, our memories, and a little bit of my heart.",
      "But there's one thing I wish I could give you that no website, no gift, and no words could ever fully express.",
      'The feeling of how much you mean to me. 💚🌷',
      'Ready to open your final gift?',
    ],
    openButtonText: 'Open It, My Love 🎁',
    birthdayVideoPoster: '/images/13_a75e867c.jpg',
  },
  loveLetter: {
    title: 'To My World, Ramesh ❤️',
    salutation: 'To My World, Ramesh ❤️',
    paragraphs: [
      'Happy Birthday, my love, and Happy Love Anniversary to us!',
      "Sometimes I wonder how one person can become such a big part of another person's world. And then I think of you, and somehow, I understand.",
      "You've become part of my favourite memories, my random smiles, my little dreams, and the thoughts that visit me when I'm doing absolutely nothing.",
      'We have our happy moments, our silly fights, our laughter, and our own little madness. And honestly, all those things make our story ours.',
      "I don't need a perfect love story. I just want one that belongs to us — filled with memories we can look back on and smile about.",
      "If I had to choose again, I'd still want to discover this little world with you.",
      'Today is your birthday, but this little surprise is my way of celebrating the happiness of having you in my life.',
      "You aren't just someone in my world, Ramesh. You're my favourite part of it. ❤️🌍",
      'Happy Birthday, my whole world.',
    ],
    closing: 'Forever your Sowmiyaa. 💚',
    signOff: 'Sowmiyaa',
    motto: 'SowRam — Our Own Little World. ❤️',
  },
  lastHug: {
    buttonText: 'One Last Hug for My Birthday Boy 🫂❤️',
    hugTitle: 'One Last Hug for My Birthday Boy ❤️',
    messageParagraphs: [
      "Imagine I'm right beside you, holding you close and wishing I could make this moment last a little longer.",
      "Happy Birthday, Ramesh! No matter how big the world gets, you'll always have a special place in my heart.",
      'Thank you for being my world in your own beautiful way.',
      'I love you, baby. Today, tomorrow, and through all the little memories still waiting for us.',
    ],
    signOff: 'Forever your Sowmiyaa. ❤️💚',
  },
};

const STORAGE_KEY = 'sowram_romantic_content_v9';

export function loadContent(): SowRamContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CONTENT, ...parsed };
    }
  } catch (err) {
    console.error('Failed to parse local storage content', err);
  }
  return DEFAULT_CONTENT;
}

export function saveContent(content: SowRamContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (err) {
    console.error('Failed to save content to localStorage', err);
  }
}

export function resetContent(): SowRamContent {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
  return DEFAULT_CONTENT;
}
