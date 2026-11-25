/* Alphabloom Languages & All 28 Indian States — Strictly Isolated 17 Language Sections */
window.AlphabloomLanguages = (function () {
  const STATES_28 = [
    { name: 'Andhra Pradesh', langId: 'te', emoji: '🌶️' },
    { name: 'Arunachal Pradesh', langId: 'en', emoji: '🏔️' },
    { name: 'Assam', langId: 'as', emoji: '🦏' },
    { name: 'Bihar', langId: 'hi', emoji: '🪷' },
    { name: 'Chhattisgarh', langId: 'hi', emoji: '🌿' },
    { name: 'Goa', langId: 'kok', emoji: '🏖️' },
    { name: 'Gujarat', langId: 'gu', emoji: '🦁' },
    { name: 'Haryana', langId: 'hi', emoji: '🌾' },
    { name: 'Himachal Pradesh', langId: 'hi', emoji: '❄️' },
    { name: 'Jharkhand', langId: 'hi', emoji: '🌳' },
    { name: 'Karnataka', langId: 'kn', emoji: '🐘' },
    { name: 'Kerala', langId: 'ml', emoji: '🥥' },
    { name: 'Madhya Pradesh', langId: 'hi', emoji: '🐯' },
    { name: 'Maharashtra', langId: 'mr', emoji: '🥭' },
    { name: 'Manipur', langId: 'mni', emoji: '🦌' },
    { name: 'Meghalaya', langId: 'en', emoji: '☁️' },
    { name: 'Mizoram', langId: 'lus', emoji: '🎋' },
    { name: 'Nagaland', langId: 'en', emoji: '🪶' },
    { name: 'Odisha', langId: 'or', emoji: '🐢' },
    { name: 'Punjab', langId: 'pa', emoji: '🌻' },
    { name: 'Rajasthan', langId: 'hi', emoji: '🐪' },
    { name: 'Sikkim', langId: 'ne', emoji: '⛰️' },
    { name: 'Tamil Nadu', langId: 'ta', emoji: '🦚' },
    { name: 'Telangana', langId: 'te', emoji: '🌼' },
    { name: 'Tripura', langId: 'trp', emoji: '🍍' },
    { name: 'Uttar Pradesh', langId: 'hi', emoji: '🌸' },
    { name: 'Uttarakhand', langId: 'hi', emoji: '🌲' },
    { name: 'West Bengal', langId: 'bn', emoji: '🐅' }
  ];

  // Helper to build Latin A-Z uppercase and lowercase pairs from 26 [letter, word, emoji, ph] tuples
  function buildLatinPair(list, capPrefix, smallPrefix, forWord) {
    const cap = list.map(([ch, word, emoji, ph]) => ({
      ch: ch.toUpperCase(),
      word,
      emoji,
      ph: ph || word,
      tts: `${capPrefix} ${ch.toUpperCase()}... ${ch.toUpperCase()} ${forWord} ${word}`,
      ttsPh: `${capPrefix} ${ch.toUpperCase()}... ${ch.toUpperCase()} ${forWord} ${ph || word}`
    }));
    const small = list.map(([ch, word, emoji, ph]) => ({
      ch: ch.toLowerCase(),
      word: word.toLowerCase(),
      emoji,
      ph: (ph || word).toLowerCase(),
      tts: `${smallPrefix} ${ch.toLowerCase()}... ${ch.toLowerCase()} ${forWord} ${word.toLowerCase()}`,
      ttsPh: `${smallPrefix} ${ch.toLowerCase()}... ${ch.toLowerCase()} ${forWord} ${(ph || word).toLowerCase()}`
    }));
    return { cap, small };
  }

  function mapIndic(list) {
    return list.map(([ch, word, emoji, ph]) => ({
      ch,
      word,
      emoji,
      ph,
      tts: `${ch}... ${word}`,
      ttsPh: `${ph}`
    }));
  }

  const EN_ALPHA = buildLatinPair([
    ['A', 'Apple', '🍎', 'Apple'], ['B', 'Ball', '⚽', 'Ball'], ['C', 'Cat', '🐱', 'Cat'],
    ['D', 'Dog', '🐶', 'Dog'], ['E', 'Elephant', '🐘', 'Elephant'], ['F', 'Fish', '🐟', 'Fish'],
    ['G', 'Grapes', '🍇', 'Grapes'], ['H', 'Hen', '🐔', 'Hen'], ['I', 'Ice Cream', '🍦', 'Ice Cream'],
    ['J', 'Jug', '🫗', 'Jug'], ['K', 'Kite', '🪁', 'Kite'], ['L', 'Lion', '🦁', 'Lion'],
    ['M', 'Mango', '🥭', 'Mango'], ['N', 'Nest', '🪺', 'Nest'], ['O', 'Orange', '🍊', 'Orange'],
    ['P', 'Parrot', '🦜', 'Parrot'], ['Q', 'Queen', '👑', 'Queen'], ['R', 'Rabbit', '🐰', 'Rabbit'],
    ['S', 'Sun', '☀️', 'Sun'], ['T', 'Tiger', '🐯', 'Tiger'], ['U', 'Umbrella', '☂️', 'Umbrella'],
    ['V', 'Van', '🚐', 'Van'], ['W', 'Watch', '⌚', 'Watch'], ['X', 'Xylophone', '🎹', 'Xylophone'],
    ['Y', 'Yak', '🐃', 'Yak'], ['Z', 'Zebra', '🦓', 'Zebra']
  ], 'Capital', 'Small', 'for');

  const MIZO_ALPHA = buildLatinPair([
    ['A', 'Ar', '🐔', 'Aar'], ['B', 'Bawng', '🐄', 'Bawng'], ['C', 'Chhang', '🍞', 'Chhang'],
    ['D', 'Dawhkan', '🪑', 'Dawh-kan'], ['E', 'Eng', '☀️', 'Eng'], ['F', 'Fanghma', '🥒', 'Fang-hma'],
    ['G', 'Guitar', '🎸', 'Guitar'], ['H', 'Hnah', '🍃', 'Hnah'], ['I', 'In', '🏠', 'In'],
    ['J', 'Jiraf', '🦒', 'Jiraf'], ['K', 'Kel', '🐐', 'Kel'], ['L', 'Lui', '🌊', 'Lui'],
    ['M', 'Maimawm', '🕷️', 'Mai-mawm'], ['N', 'Ni', '☀️', 'Nee'], ['O', 'Ostrich', '🐦', 'Ostrich'],
    ['P', 'Pangpar', '🌸', 'Pang-par'], ['Q', 'Queen', '👑', 'Queen'], ['R', 'Rul', '🐍', 'Rul'],
    ['S', 'Sakei', '🐯', 'Sa-kei'], ['T', 'Tui', '💧', 'Too-ee'], ['U', 'Ui', '🐶', 'Oo-ee'],
    ['V', 'Vawk', '🐷', 'Vawk'], ['W', 'Watch', '⌚', 'Watch'], ['X', 'Xylophone', '🎹', 'Xylophone'],
    ['Y', 'Yak', '🐃', 'Yak'], ['Z', 'Zawng', '🐒', 'Zawng']
  ], 'Hawrawppui', 'Hawrawpte', 'chu');

  const KOKBOROK_ALPHA = buildLatinPair([
    ['A', 'A', '🐟', 'Aa'], ['B', 'Buphang', '🌳', 'Bu-phang'], ['C', 'Chini', '🍬', 'Chi-ni'],
    ['D', 'Dukhu', '🦆', 'Du-khu'], ['E', 'Ema', '👩', 'E-ma'], ['F', 'Fru', '🍐', 'Fru'],
    ['G', 'Gari', '🚗', 'Ga-ri'], ['H', 'Ha', '🌍', 'Haa'], ['I', 'Imang', '🌙', 'I-mang'],
    ['J', 'Jora', '⭐', 'Jo-ra'], ['K', 'Khumpui', '🌸', 'Khum-pui'], ['L', 'Lam', '🛤️', 'Lam'],
    ['M', 'Matai', '🐘', 'Ma-tai'], ['N', 'Nok', '🏠', 'Nok'], ['O', 'Oma', '🐷', 'O-ma'],
    ['P', 'Pun', '🐐', 'Pun'], ['Q', 'Queen', '👑', 'Queen'], ['R', 'Rang', '🪙', 'Rang'],
    ['S', 'Sal', '☀️', 'Sal'], ['T', 'Tok', '🐔', 'Tok'], ['U', 'Ua', '🎋', 'U-a'],
    ['V', 'Van', '🚐', 'Van'], ['W', 'Wai', '🔥', 'Wai'], ['X', 'Xylophone', '🎹', 'Xylophone'],
    ['Y', 'Yak', '🐃', 'Yak'], ['Z', 'Zebra', '🦓', 'Zebra']
  ], 'Kotor', 'Kisa', 'ni');

  const LANGUAGES = {
    en: {
      id: 'en', name: 'English', nativeName: 'English', locale: 'en-IN', fallbackLocale: 'en-IN',
      isLatin: true, states: ['Arunachal Pradesh', 'Meghalaya', 'Nagaland', 'Sikkim'],
      color: '#ff8fab', emoji: '🌈',
      ui: {
        homeSub: 'Play, Listen & Bloom!',
        cardA: 'Capital Letters (A–Z)', cardASub: 'Tap & learn big letters',
        cardB: 'Small Letters (a–z)', cardBSub: 'Tap & learn small letters',
        cardNumbers: '1 to 100 Numbers', cardNumbersSub: 'Count from 1 to 100',
        cardStories: '1000 Stories 📖', cardStoriesSub: 'Read & listen offline',
        gamesHeading: 'Fun Mini-Games (+10 / -5)',
        gFruit: 'Fruit Catcher', gFruitSub: 'Catch the spoken fruit!',
        gBalloon: 'Balloon Pop', gBalloonSub: 'Pop the matching balloon!',
        gAnimal: 'Animal Quiz', gAnimalSub: 'Find the cute animal!',
        gMemory: 'Memory Card Flip', gMemorySub: 'Match animal & fruit pairs!',
        back: 'Back', languages: 'Languages', exit: 'Exit',
        musicOn: 'Music On', musicOff: 'Music Off',
        stars: 'Stars', repeat: 'Hear Again', newGame: 'New Game',
        catchPrompt: 'Catch the {item}!', popPrompt: 'Pop {item}!', animalPrompt: 'Tap the {item}!',
        correctList: ['Yay! Great job!', 'Awesome!', 'Super star!', 'Well done!'],
        retryList: ['Oops, try again!', 'Almost! Try once more!', 'You can do it!'],
        exitTitle: 'Leaving so soon?', exitMsg: 'Are you sure you want to exit Alphabloom?',
        yes: 'Yes', no: 'No',
        storyNum: 'Story', moral: 'Moral of the Story', readAloud: 'Read Aloud 🔊', stopRead: 'Stop ⏹️',
        prev: 'Prev', next: 'Next', random: 'Random', go: 'Go', favs: 'Favorites',
        cats: ['Animal Friends', 'Bedtime Tales', 'Magic Garden', 'Good Habits', 'Adventure'],
        memoryWin: 'Hurray! You matched all pairs!'
      },
      lettersA: EN_ALPHA.cap,
      lettersB: EN_ALPHA.small,
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'Apple', ph: 'Apple' },
        { id: 'mango', emoji: '🥭', name: 'Mango', ph: 'Mango' },
        { id: 'banana', emoji: '🍌', name: 'Banana', ph: 'Banana' },
        { id: 'grapes', emoji: '🍇', name: 'Grapes', ph: 'Grapes' },
        { id: 'orange', emoji: '🍊', name: 'Orange', ph: 'Orange' },
        { id: 'watermelon', emoji: '🍉', name: 'Watermelon', ph: 'Watermelon' },
        { id: 'strawberry', emoji: '🍓', name: 'Strawberry', ph: 'Strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'Pineapple', ph: 'Pineapple' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'Lion', ph: 'Lion' },
        { id: 'elephant', emoji: '🐘', name: 'Elephant', ph: 'Elephant' },
        { id: 'tiger', emoji: '🐯', name: 'Tiger', ph: 'Tiger' },
        { id: 'monkey', emoji: '🐒', name: 'Monkey', ph: 'Monkey' },
        { id: 'rabbit', emoji: '🐰', name: 'Rabbit', ph: 'Rabbit' },
        { id: 'dog', emoji: '🐶', name: 'Dog', ph: 'Dog' },
        { id: 'cat', emoji: '🐱', name: 'Cat', ph: 'Cat' },
        { id: 'cow', emoji: '🐄', name: 'Cow', ph: 'Cow' },
        { id: 'peacock', emoji: '🦚', name: 'Peacock', ph: 'Peacock' },
        { id: 'panda', emoji: '🐼', name: 'Panda', ph: 'Panda' }
      ]
    },

    hi: {
      id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', locale: 'hi-IN', fallbackLocale: 'hi-IN',
      isLatin: false,
      states: ['Bihar', 'Chhattisgarh', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand'],
      color: '#ffb703', emoji: '🪷',
      ui: {
        homeSub: 'खेलो, सुनो और सीखो!',
        cardA: 'स्वर (अ–अः)', cardASub: 'स्वर अक्षर सीखें',
        cardB: 'व्यंजन (क–ज्ञ)', cardBSub: 'व्यंजन अक्षर सीखें',
        cardNumbers: '1 से 100 गिनती', cardNumbersSub: 'गिनती सुनें और सीखें',
        cardStories: '1000 कहानियाँ 📖', cardStoriesSub: 'ऑफ़लाइन कहानियाँ सुनें',
        gamesHeading: 'मज़ेदार खेल (+10 / -5)',
        gFruit: 'फल पकड़ो', gFruitSub: 'सही फल टोकरी में पकड़ें',
        gBalloon: 'गुब्बारा फोड़ो', gBalloonSub: 'सही अक्षर या संख्या फोड़ें',
        gAnimal: 'जानवर पहचानो', gAnimalSub: 'प्यारे जानवर पर टैप करें',
        gMemory: 'जोड़ी मिलाओ', gMemorySub: 'एक जैसे कार्ड मिलाएँ',
        back: 'वापस', languages: 'भाषाएँ', exit: 'बाहर',
        musicOn: 'संगीत चालू', musicOff: 'संगीत बंद',
        stars: 'अंक', repeat: 'फिर सुनें', newGame: 'नया खेल',
        catchPrompt: '{item} पकड़ो!', popPrompt: '{item} फोड़ो!', animalPrompt: '{item} को छुओ!',
        correctList: ['शाबाश! बहुत बढ़िया!', 'वाह! कमाल कर दिया!', 'अरे वाह! सही जवाब!'],
        retryList: ['अरे, फिर से कोशिश करो!', 'कोई बात नहीं, दोबारा चुनो!'],
        exitTitle: 'बाहर निकलें?', exitMsg: 'क्या आप सच में अल्फाब्लूम से बाहर जाना चाहते हैं?',
        yes: 'हाँ', no: 'नहीं',
        storyNum: 'कहानी', moral: 'कहानी की सीख', readAloud: 'कहानी सुनें 🔊', stopRead: 'रोकें ⏹️',
        prev: 'पिछली', next: 'अगली', random: 'कोई भी', go: 'जाएँ', favs: 'पसंदीदा',
        cats: ['पशु मित्र', 'सोने की कहानियाँ', 'जादुई बगीचा', 'अच्छी आदतें', 'रोमांचक सफ़र'],
        memoryWin: 'वाह! आपने सभी जोड़ियाँ मिला लीं!'
      },
      lettersA: mapIndic([
        ['अ', 'अनार', '🍎', 'a - anaar'], ['आ', 'आम', '🥭', 'aa - aam'], ['इ', 'इमली', '🫘', 'i - imli'],
        ['ई', 'ईख', '🎋', 'ee - eekh'], ['उ', 'उल्लू', '🦉', 'u - ullu'], ['ऊ', 'ऊन', '🧶', 'oo - oon'],
        ['ऋ', 'ऋषि', '🧘', 'ri - rishi'], ['ए', 'एड़ी', '🦶', 'e - edi'], ['ऐ', 'ऐनक', '👓', 'ai - ainak'],
        ['ओ', 'ओखली', '🥣', 'o - okhli'], ['औ', 'औरत', '👩', 'au - aurat'], ['अं', 'अंगूर', '🍇', 'ang - angoor'],
        ['अः', 'प्रातः', '🌅', 'aha']
      ]),
      lettersB: mapIndic([
        ['क', 'कमल', '🪷', 'ka - kamal'], ['ख', 'खरगोश', '🐰', 'kha - khargosh'], ['ग', 'गमला', '🪴', 'ga - gamla'],
        ['घ', 'घर', '🏠', 'gha - ghar'], ['च', 'चम्मच', '🥄', 'cha - chammach'], ['छ', 'छतरी', '☂️', 'chha - chhatri'],
        ['ज', 'जहाज़', '🚢', 'ja - jahaaz'], ['झ', 'झंडा', '🚩', 'jha - jhanda'], ['ट', 'टमाटर', '🍅', 'ta - tamatar'],
        ['ठ', 'ठेला', '🛒', 'tha - thela'], ['ड', 'डमरू', '🥁', 'da - damroo'], ['ढ', 'ढोल', '🪘', 'dha - dhol'],
        ['त', 'तरबूज़', '🍉', 'ta - tarbooz'], ['थ', 'थैला', '🎒', 'tha - thaila'], ['द', 'दवात', '🖋️', 'da - dawaat'],
        ['ध', 'धनुष', '🏹', 'dha - dhanush'], ['न', 'नल', '🚰', 'na - nal'], ['प', 'पतंग', '🪁', 'pa - patang'],
        ['फ', 'फल', '🍓', 'pha - phal'], ['ब', 'बत्तख', '🦆', 'ba - battakh'], ['भ', 'भालू', '🐻', 'bha - bhaloo'],
        ['म', 'मछली', '🐟', 'ma - machhli'], ['य', 'यज्ञ', '🔥', 'ya - yagya'], ['र', 'रथ', '🛞', 'ra - rath'],
        ['ल', 'लड्डू', '🟡', 'la - laddoo'], ['व', 'वन', '🌳', 'va - van'], ['श', 'शेर', '🦁', 'sha - sher'],
        ['ष', 'षट्कोण', '⬡', 'sha - shatkon'], ['स', 'सूरज', '☀️', 'sa - sooraj'], ['ह', 'हाथी', '🐘', 'ha - haathi'],
        ['क्ष', 'क्षत्रिय', '🛡️', 'ksha'], ['त्र', 'त्रिशूल', '🔱', 'tra'], ['ज्ञ', 'ज्ञानी', '📚', 'gya']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'सेब', ph: 'seb' },
        { id: 'mango', emoji: '🥭', name: 'आम', ph: 'aam' },
        { id: 'banana', emoji: '🍌', name: 'केला', ph: 'kela' },
        { id: 'grapes', emoji: '🍇', name: 'अंगूर', ph: 'angoor' },
        { id: 'orange', emoji: '🍊', name: 'संतरा', ph: 'santra' },
        { id: 'watermelon', emoji: '🍉', name: 'तरबूज़', ph: 'tarbooz' },
        { id: 'strawberry', emoji: '🍓', name: 'स्ट्रॉबेरी', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'अनानास', ph: 'ananas' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'शेर', ph: 'sher' },
        { id: 'elephant', emoji: '🐘', name: 'हाथी', ph: 'haathi' },
        { id: 'tiger', emoji: '🐯', name: 'बाघ', ph: 'baagh' },
        { id: 'monkey', emoji: '🐒', name: 'बंदर', ph: 'bandar' },
        { id: 'rabbit', emoji: '🐰', name: 'खरगोश', ph: 'khargosh' },
        { id: 'dog', emoji: '🐶', name: 'कुत्ता', ph: 'kutta' },
        { id: 'cat', emoji: '🐱', name: 'बिल्ली', ph: 'billi' },
        { id: 'cow', emoji: '🐄', name: 'गाय', ph: 'gaay' },
        { id: 'peacock', emoji: '🦚', name: 'मोर', ph: 'mor' },
        { id: 'panda', emoji: '🐼', name: 'पांडा', ph: 'panda' }
      ]
    },

    mr: {
      id: 'mr', name: 'Marathi', nativeName: 'मराठी', locale: 'mr-IN', fallbackLocale: 'hi-IN',
      isLatin: false, states: ['Maharashtra'], color: '#fb8500', emoji: '🥭',
      ui: {
        homeSub: 'खेळा, ऐका आणि शिका!',
        cardA: 'स्वर (अ–अः)', cardASub: 'मराठी स्वर शिका',
        cardB: 'व्यंजने (क–ज्ञ)', cardBSub: 'मराठी व्यंजने शिका',
        cardNumbers: '1 ते 100 अंक', cardNumbersSub: 'अंक ऐका आणि मोजा',
        cardStories: '1000 गोष्टी 📖', cardStoriesSub: 'ऑफलाइन गोष्टी ऐका',
        gamesHeading: 'मजेदार खेळ (+10 / -5)',
        gFruit: 'फळे पकडा', gFruitSub: 'योग्य फळ टोपलीत पकडा',
        gBalloon: 'फुगा फोडा', gBalloonSub: 'योग्य अक्षर किंवा अंक फोडा',
        gAnimal: 'प्राणी ओळखा', gAnimalSub: 'योग्य प्राण्यावर टॅप करा',
        gMemory: 'जोडी जुळवा', gMemorySub: 'सारखे कार्ड जुळवा',
        back: 'मागे', languages: 'भाषा', exit: 'बाहेर',
        musicOn: 'संगीत सुरू', musicOff: 'संगीत बंद',
        stars: 'गुण', repeat: 'पुन्हा ऐका', newGame: 'नवीन खेळ',
        catchPrompt: '{item} पकडा!', popPrompt: '{item} फोडा!', animalPrompt: '{item} वर टॅप करा!',
        correctList: ['शाब्बास! खूप छान!', 'मस्तच!', 'बरोबर उत्तर!'],
        retryList: ['अरेरे, पुन्हा प्रयत्न करा!', 'हरकत नाही, पुन्हा निवडा!'],
        exitTitle: 'बाहेर पडायचे?', exitMsg: 'तुम्हाला खरोखर अल्फाब्लूम मधून बाहेर पडायचे आहे का?',
        yes: 'होय', no: 'नाही',
        storyNum: 'गोष्ट', moral: 'गोष्टीचे तात्पर्य', readAloud: 'गोष्ट ऐका 🔊', stopRead: 'थांबवा ⏹️',
        prev: 'मागील', next: 'पुढील', random: 'कोणतीही', go: 'जा', favs: 'आवडत्या',
        cats: ['प्राणी मित्र', 'झोपेच्या गोष्टी', 'जादूची बाग', 'चांगल्या सवयी', 'साहसी सफर'],
        memoryWin: 'वाह! सर्व जोड्या जुळल्या!'
      },
      lettersA: mapIndic([
        ['अ', 'अननस', '🍍', 'a - ananas'], ['आ', 'आंबा', '🥭', 'aa - aamba'], ['इ', 'इमारत', '🏢', 'i - imarat'],
        ['ई', 'ईडलिंबू', '🍋', 'ee - idlimbu'], ['उ', 'उंदीर', '🐭', 'u - undir'], ['ऊ', 'ऊस', '🎋', 'oo - oos'],
        ['ऋ', 'ऋषी', '🧘', 'ri - rishi'], ['ए', 'एडका', '🐏', 'e - edka'], ['ऐ', 'ऐरण', '⚒️', 'ai - airan'],
        ['ओ', 'ओझे', '🎒', 'o - ojhe'], ['औ', 'औषध', '💊', 'au - aushadh'], ['अं', 'अंगठी', '💍', 'ang - angthi']
      ]),
      lettersB: mapIndic([
        ['क', 'कमळ', '🪷', 'ka - kamal'], ['ख', 'खडू', '🖍️', 'kha - khadu'], ['ग', 'गवत', '🌿', 'ga - gavat'],
        ['घ', 'घर', '🏠', 'gha - ghar'], ['च', 'चमचा', '🥄', 'cha - chamcha'], ['छ', 'छत्री', '☂️', 'chha - chhatri'],
        ['ज', 'जहाज', '🚢', 'ja - jahaj'], ['झ', 'झबले', '👗', 'jha - jhable'], ['ट', 'टरबूज', '🍉', 'ta - tarbooj'],
        ['ड', 'डबा', '🍱', 'da - daba'], ['त', 'तलवार', '⚔️', 'ta - talwar'], ['द', 'दप्तर', '🎒', 'da - daptar'],
        ['न', 'नळ', '🚰', 'na - nal'], ['प', 'पतंग', '🪁', 'pa - patang'], ['फ', 'फणस', '🍈', 'pha - phanas'],
        ['ब', 'बदक', '🦆', 'ba - badak'], ['भ', 'भटजी', '🙏', 'bha - bhatji'], ['म', 'मासा', '🐟', 'ma - masa'],
        ['र', 'रथ', '🛞', 'ra - rath'], ['ल', 'लसूण', '🧄', 'la - lasoon'], ['व', 'वाघ', '🐯', 'va - wagh'],
        ['स', 'ससा', '🐰', 'sa - sasa'], ['ह', 'हत्ती', '🐘', 'ha - hatti'], ['ळ', 'बाळ', '👶', 'la - baal']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'सफरचंद', ph: 'safarchand' },
        { id: 'mango', emoji: '🥭', name: 'आंबा', ph: 'aamba' },
        { id: 'banana', emoji: '🍌', name: 'केळी', ph: 'keli' },
        { id: 'grapes', emoji: '🍇', name: 'द्राक्षे', ph: 'drakshe' },
        { id: 'orange', emoji: '🍊', name: 'संत्रे', ph: 'santre' },
        { id: 'watermelon', emoji: '🍉', name: 'कलिंगड', ph: 'kalingad' },
        { id: 'strawberry', emoji: '🍓', name: 'स्ट्रॉबेरी', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'अननस', ph: 'ananas' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'सिंह', ph: 'sinha' },
        { id: 'elephant', emoji: '🐘', name: 'हत्ती', ph: 'hatti' },
        { id: 'tiger', emoji: '🐯', name: 'वाघ', ph: 'wagh' },
        { id: 'monkey', emoji: '🐒', name: 'माकड', ph: 'makad' },
        { id: 'rabbit', emoji: '🐰', name: 'ससा', ph: 'sasa' },
        { id: 'dog', emoji: '🐶', name: 'कुत्रा', ph: 'kutra' },
        { id: 'cat', emoji: '🐱', name: 'मांजर', ph: 'manjar' },
        { id: 'cow', emoji: '🐄', name: 'गाय', ph: 'gaay' },
        { id: 'peacock', emoji: '🦚', name: 'मोर', ph: 'mor' },
        { id: 'panda', emoji: '🐼', name: 'पांडा', ph: 'panda' }
      ]
    },

    te: {
      id: 'te', name: 'Telugu', nativeName: 'తెలుగు', locale: 'te-IN', fallbackLocale: 'en-IN',
      isLatin: false, states: ['Andhra Pradesh', 'Telangana'], color: '#06d6a0', emoji: '🌼',
      ui: {
        homeSub: 'ఆడుకోండి, వినండి, నేర్చుకోండి!',
        cardA: 'అచ్చులు (అ–అః)', cardASub: 'తెలుగు అచ్చులు నేర్చుకోండి',
        cardB: 'హల్లులు (క–హ)', cardBSub: 'తెలుగు హల్లులు నేర్చుకోండి',
        cardNumbers: '1 నుండి 100 అంకెలు', cardNumbersSub: 'అంకెలు విని నేర్చుకోండి',
        cardStories: '1000 కథలు 📖', cardStoriesSub: 'ఆఫ్‌లైన్ కథలు వినండి',
        gamesHeading: 'సరదా ఆటలు (+10 / -5)',
        gFruit: 'పండ్లు పట్టుకో', gFruitSub: 'సరైన పండును బుట్టలో పట్టుకో',
        gBalloon: 'బెలూన్ పగలగొట్టు', gBalloonSub: 'సరైన అక్షరం బెలూన్ నొక్కు',
        gAnimal: 'జంతువును గుర్తించు', gAnimalSub: 'అందమైన జంతువును నొక్కు',
        gMemory: 'జతలను కలుపు', gMemorySub: 'ఒకేలాంటి కార్డులు కలుపు',
        back: 'వెనక్కి', languages: 'భాషలు', exit: 'బయటకు',
        musicOn: 'సంగీతం ఆన్', musicOff: 'సంగీతం ఆఫ్',
        stars: 'నక్షత్రాలు', repeat: 'మళ్ళీ విను', newGame: 'కొత్త ఆట',
        catchPrompt: '{item} పట్టుకో!', popPrompt: '{item} పగలగొట్టు!', animalPrompt: '{item} ను నొక్కు!',
        correctList: ['భలే! చాలా బాగుంది!', 'శభాష్!', 'సూపర్!'],
        retryList: ['అయ్యో, మళ్ళీ ప్రయత్నించు!', 'పర్వాలేదు, మళ్ళీ చూడు!'],
        exitTitle: 'బయటకు వెళ్ళాలా?', exitMsg: 'మీరు నిజంగా ఆల్ఫాబ్లూమ్ నుండి బయటకు వెళ్ళాలనుకుంటున్నారా?',
        yes: 'అవును', no: 'కాదు',
        storyNum: 'కథ', moral: 'కథ నీతి', readAloud: 'కథ విను 🔊', stopRead: 'ఆపు ⏹️',
        prev: 'మునుపటి', next: 'తదుపరి', random: 'ఏదైనా', go: 'వెళ్ళు', favs: 'ఇష్టమైనవి',
        cats: ['జంతు మిత్రులు', 'నిద్ర కథలు', 'మాయా తోట', 'మంచి అలవాట్లు', 'సాహస యాత్ర'],
        memoryWin: 'అద్భుతం! అన్ని జతలు కలిపావు!'
      },
      lettersA: mapIndic([
        ['అ', 'అమ్మ', '👩', 'a - amma'], ['ఆ', 'ఆవు', '🐄', 'aa - aavu'], ['ఇ', 'ఇల్లు', '🏠', 'i - illu'],
        ['ఈ', 'ఈగ', '🪰', 'ee - eega'], ['ఉ', 'ఉడుత', '🐿️', 'u - uduta'], ['ఊ', 'ఊయల', '🪁', 'oo - ooyala'],
        ['ఋ', 'ఋషి', '🧘', 'ru - rushi'], ['ఎ', 'ఎలుక', '🐭', 'e - eluka'], ['ఏ', 'ఏనుగు', '🐘', 'ae - enugu'],
        ['ఐ', 'ఐదు', '🖐️', 'ai - aidu'], ['ఒ', 'ఒంటె', '🐪', 'o - onte'], ['ఓ', 'ఓడ', '🚢', 'oa - oda'],
        ['ఔ', 'ఔషధం', '💊', 'au - aushadham'], ['అం', 'అంకె', '🔢', 'am - anke']
      ]),
      lettersB: mapIndic([
        ['క', 'కమలం', '🪷', 'ka - kamalam'], ['ఖ', 'ఖడ్గం', '⚔️', 'kha - khadgam'], ['గ', 'గంట', '🔔', 'ga - ganta'],
        ['ఘ', 'ఘటం', '🏺', 'gha - ghatam'], ['చ', 'చందమామ', '🌙', 'cha - chandamama'], ['జ', 'జడ', '🎀', 'ja - jada'],
        ['ట', 'టమాటా', '🍅', 'ta - tamata'], ['డ', 'డబ్బా', '📦', 'da - dabba'], ['త', 'తల', '🙂', 'ta - tala'],
        ['ద', 'దండ', '💐', 'da - danda'], ['న', 'నక్క', '🦊', 'na - nakka'], ['ప', 'పలక', '📋', 'pa - palaka'],
        ['ఫ', 'ఫలం', '🍎', 'pha - phalam'], ['బ', 'బంతి', '⚽', 'ba - banti'], ['మ', 'మంచం', '🛏️', 'ma - mancham'],
        ['య', 'యంత్రం', '⚙️', 'ya - yantram'], ['ర', 'రవి', '☀️', 'ra - ravi'], ['ల', 'లత', '🌿', 'la - lata'],
        ['వ', 'వంకాయ', '🍆', 'va - vankaya'], ['శ', 'శంఖం', '🐚', 'sha - shankham'], ['స', 'సంచి', '🎒', 'sa - sanchi'],
        ['హ', 'హంస', '🦢', 'ha - hamsa']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'ఆపిల్', ph: 'apple' },
        { id: 'mango', emoji: '🥭', name: 'మామిడి', ph: 'mamidi' },
        { id: 'banana', emoji: '🍌', name: 'అరటిపండు', ph: 'aratipandu' },
        { id: 'grapes', emoji: '🍇', name: 'ద్రాక్ష', ph: 'draksha' },
        { id: 'orange', emoji: '🍊', name: 'నారింజ', ph: 'narinja' },
        { id: 'watermelon', emoji: '🍉', name: 'పుచ్చకాయ', ph: 'puchakaya' },
        { id: 'strawberry', emoji: '🍓', name: 'స్ట్రాబెర్రీ', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'అనాసపండు', ph: 'anasapandu' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'సింహం', ph: 'simham' },
        { id: 'elephant', emoji: '🐘', name: 'ఏనుగు', ph: 'enugu' },
        { id: 'tiger', emoji: '🐯', name: 'పులి', ph: 'puli' },
        { id: 'monkey', emoji: '🐒', name: 'కోతి', ph: 'koti' },
        { id: 'rabbit', emoji: '🐰', name: 'కుందేలు', ph: 'kundelu' },
        { id: 'dog', emoji: '🐶', name: 'కుక్క', ph: 'kukka' },
        { id: 'cat', emoji: '🐱', name: 'పిల్లి', ph: 'pilli' },
        { id: 'cow', emoji: '🐄', name: 'ఆవు', ph: 'aavu' },
        { id: 'peacock', emoji: '🦚', name: 'నెమలి', ph: 'nemali' },
        { id: 'panda', emoji: '🐼', name: 'పాండా', ph: 'panda' }
      ]
    },

    ta: {
      id: 'ta', name: 'Tamil', nativeName: 'தமிழ்', locale: 'ta-IN', fallbackLocale: 'en-IN',
      isLatin: false, states: ['Tamil Nadu'], color: '#ef476f', emoji: '🦚',
      ui: {
        homeSub: 'விளையாடு, கேள், கற்றுக்கொள்!',
        cardA: 'உயிர் எழுத்துக்கள் (அ–ஔ)', cardASub: 'தமிழ் உயிர் எழுத்துக்கள்',
        cardB: 'மெய் எழுத்துக்கள் (க்–ன்)', cardBSub: 'தமிழ் மெய் எழுத்துக்கள்',
        cardNumbers: '1 முதல் 100 எண்கள்', cardNumbersSub: 'எண்களைக் கேட்டு கற்றுக்கொள்',
        cardStories: '1000 கதைகள் 📖', cardStoriesSub: 'ஆஃப்லைன் கதைகள் கேளுங்கள்',
        gamesHeading: 'வேடிக்கை விளையாட்டுகள் (+10 / -5)',
        gFruit: 'பழம் பிடி', gFruitSub: 'சரியான பழத்தைக் கூடையில் பிடி',
        gBalloon: 'பலூன் உடை', gBalloonSub: 'சரியான எழுத்து பலூனை உடை',
        gAnimal: 'விலங்கு அறிவோம்', gAnimalSub: 'சரியான விலங்கைத் தொடு',
        gMemory: 'ஜோடி சேர்', gMemorySub: 'ஒரே மாதிரி அட்டைகளைச் சேர்',
        back: 'பின்', languages: 'மொழிகள்', exit: 'வெளியேறு',
        musicOn: 'இசை ஆன்', musicOff: 'இசை ஆஃப்',
        stars: 'புள்ளிகள்', repeat: 'மீண்டும் கேள்', newGame: 'புதிய ஆட்டம்',
        catchPrompt: '{item} பிடி!', popPrompt: '{item} உடை!', animalPrompt: '{item} தொடு!',
        correctList: ['அருமை! மிக நன்று!', 'சூப்பர்!', 'சரியான பதில்!'],
        retryList: ['அச்சச்சோ, மீண்டும் முயற்சி செய்!', 'பரவாயில்லை, மறுபடியும் பார்!'],
        exitTitle: 'வெளியேறவா?', exitMsg: 'ஆல்பாப்ளூமிலிருந்து வெளியேற விரும்புகிறீர்களா?',
        yes: 'ஆம்', no: 'இல்லை',
        storyNum: 'கதை', moral: 'கதையின் நீதி', readAloud: 'கதை கேள் 🔊', stopRead: 'நிறுத்து ⏹️',
        prev: 'முந்தைய', next: 'அடுத்த', random: 'ஏதாவது', go: 'செல்', favs: 'பிடித்தவை',
        cats: ['விலங்கு நண்பர்கள்', 'இரவு கதைகள்', 'மாயத் தோட்டம்', 'நல்ல பழக்கங்கள்', 'சாகசப் பயணம்'],
        memoryWin: 'சூப்பர்! எல்லா ஜோடிகளையும் சேர்த்துவிட்டாய்!'
      },
      lettersA: mapIndic([
        ['அ', 'அணில்', '🐿️', 'a - anil'], ['ஆ', 'ஆடு', '🐐', 'aa - aadu'], ['இ', 'இலை', '🍃', 'i - ilai'],
        ['ஈ', 'ஈட்டி', '🏹', 'ee - eetti'], ['உ', 'உரல்', '🥣', 'u - ural'], ['ஊ', 'ஊஞ்சல்', '🪁', 'oo - oonjal'],
        ['எ', 'எலி', '🐭', 'e - eli'], ['ஏ', 'ஏணி', '🪜', 'ae - eni'], ['ஐ', 'ஐந்து', '🖐️', 'ai - aindhu'],
        ['ஒ', 'ஒட்டகம்', '🐪', 'o - ottagam'], ['ஓ', 'ஓடம்', '⛵', 'oa - odam'], ['ஔ', 'ஔவையார்', '👵', 'au - auvaiyar']
      ]),
      lettersB: mapIndic([
        ['க', 'கப்பல்', '🚢', 'ka - kappal'], ['ங', 'சங்கு', '🐚', 'nga - sangu'], ['ச', 'சக்கரம்', '🛞', 'cha - chakkaram'],
        ['ஞ', 'ஞாயிறு', '☀️', 'nya - nyaayiru'], ['ட', 'தட்டு', '🍽️', 'ta - thattu'], ['ண', 'கண்', '👁️', 'na - kan'],
        ['த', 'தவளை', '🐸', 'tha - thavalai'], ['ந', 'நாய்', '🐶', 'na - naai'], ['ப', 'பட்டம்', '🪁', 'pa - pattam'],
        ['ம', 'மரம்', '🌳', 'ma - maram'], ['ய', 'யானை', '🐘', 'ya - yaanai'], ['ர', 'ரயில்', '🚂', 'ra - rayil'],
        ['ல', 'லட்டு', '🟡', 'la - laddu'], ['வ', 'வண்ணத்துப்பூச்சி', '🦋', 'va - vannathupoochi'], ['ழ', 'பழம்', '🍎', 'zha - pazham'],
        ['ள', 'விளக்கு', '🪔', 'la - vilakku'], ['ற', 'பறவை', '🐦', 'ra - paravai'], ['ன', 'மான்', '🦌', 'na - maan']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'ஆப்பிள்', ph: 'apple' },
        { id: 'mango', emoji: '🥭', name: 'மாம்பழம்', ph: 'maambazham' },
        { id: 'banana', emoji: '🍌', name: 'வாழைப்பழம்', ph: 'vaazhaipazham' },
        { id: 'grapes', emoji: '🍇', name: 'திராட்சை', ph: 'thiraatchai' },
        { id: 'orange', emoji: '🍊', name: 'ஆரஞ்சு', ph: 'orange' },
        { id: 'watermelon', emoji: '🍉', name: 'தர்பூசணி', ph: 'tharboosani' },
        { id: 'strawberry', emoji: '🍓', name: 'ஸ்ட்ராபெரி', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'அன்னாசிப்பழம்', ph: 'annaasipazham' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'சிங்கம்', ph: 'singam' },
        { id: 'elephant', emoji: '🐘', name: 'யானை', ph: 'yaanai' },
        { id: 'tiger', emoji: '🐯', name: 'புலி', ph: 'puli' },
        { id: 'monkey', emoji: '🐒', name: 'குரங்கு', ph: 'kurangu' },
        { id: 'rabbit', emoji: '🐰', name: 'முயல்', ph: 'muyal' },
        { id: 'dog', emoji: '🐶', name: 'நாய்', ph: 'naai' },
        { id: 'cat', emoji: '🐱', name: 'பூனை', ph: 'poonai' },
        { id: 'cow', emoji: '🐄', name: 'பசு', ph: 'pasu' },
        { id: 'peacock', emoji: '🦚', name: 'மயில்', ph: 'mayil' },
        { id: 'panda', emoji: '🐼', name: 'பாண்டா', ph: 'panda' }
      ]
    },

    kn: {
      id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', locale: 'kn-IN', fallbackLocale: 'en-IN',
      isLatin: false, states: ['Karnataka'], color: '#118ab2', emoji: '🐘',
      ui: {
        homeSub: 'ಆಡಿ, ಕೇಳಿ ಮತ್ತು ಕಲಿಯಿರಿ!',
        cardA: 'ಸ್ವರಗಳು (ಅ–ಅಃ)', cardASub: 'ಕನ್ನಡ ಸ್ವರಗಳನ್ನು ಕಲಿಯಿರಿ',
        cardB: 'ವ್ಯಂಜನಗಳು (ಕ–ಳ)', cardBSub: 'ಕನ್ನಡ ವ್ಯಂಜನಗಳನ್ನು ಕಲಿಯಿರಿ',
        cardNumbers: '1 ರಿಂದ 100 ಸಂಖ್ಯೆಗಳು', cardNumbersSub: 'ಸಂಖ್ಯೆಗಳನ್ನು ಕೇಳಿ ಕಲಿಯಿರಿ',
        cardStories: '1000 ಕಥೆಗಳು 📖', cardStoriesSub: 'ಆಫ್‌ಲೈನ್ ಕಥೆಗಳನ್ನು ಕೇಳಿ',
        gamesHeading: 'ಮೋಜಿನ ಆಟಗಳು (+10 / -5)',
        gFruit: 'ಹಣ್ಣು ಹಿಡಿ', gFruitSub: 'ಸರಿಯಾದ ಹಣ್ಣನ್ನು ಬುಟ್ಟಿಯಲ್ಲಿ ಹಿಡಿ',
        gBalloon: 'ಬಲೂನ್ ಒಡೆ', gBalloonSub: 'ಸರಿಯಾದ ಅಕ್ಷರದ ಬಲೂನ್ ಒಡೆ',
        gAnimal: 'ಪ್ರಾಣಿ ಗುರುತಿಸು', gAnimalSub: 'ಮುದ್ದಾದ ಪ್ರಾಣಿಯನ್ನು ಮುಟ್ಟು',
        gMemory: 'ಜೋಡಿ ಸೇರಿಸು', gMemorySub: 'ಒಂದೇ ರೀತಿಯ ಕಾರ್ಡ್ ಸೇರಿಸು',
        back: 'ಹಿಂದೆ', languages: 'ಭಾಷೆಗಳು', exit: 'ನಿರ್ಗಮಿಸಿ',
        musicOn: 'ಸಂಗೀತ ಆನ್', musicOff: 'ಸಂಗೀತ ಆಫ್',
        stars: 'ಅಂಕಗಳು', repeat: 'ಮತ್ತೆ ಕೇಳಿ', newGame: 'ಹೊಸ ಆಟ',
        catchPrompt: '{item} ಹಿಡಿ!', popPrompt: '{item} ಒಡೆ!', animalPrompt: '{item} ಮುಟ್ಟು!',
        correctList: ['ಭೇಷ್! ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!', 'ಸೂಪರ್!', 'ಸರಿ ಉತ್ತರ!'],
        retryList: ['ಅಯ್ಯೋ, ಮತ್ತೆ ಪ್ರಯತ್ನಿಸು!', 'ಪರವಾಗಿಲ್ಲ, ಮತ್ತೆ ನೋಡು!'],
        exitTitle: 'ಹೊರಗೆ ಹೋಗಬೇಕೆ?', exitMsg: 'ನೀವು ನಿಜವಾಗಿಯೂ ಆಲ್ಫಾಬ್ಲೂಮ್‌ನಿಂದ ಹೊರಗೆ ಹೋಗಲು ಬಯಸುವಿರಾ?',
        yes: 'ಹೌದು', no: 'ಇಲ್ಲ',
        storyNum: 'ಕಥೆ', moral: 'ಕಥೆಯ ನೀತಿ', readAloud: 'ಕಥೆ ಕೇಳಿ 🔊', stopRead: 'ನಿಲ್ಲಿಸಿ ⏹️',
        prev: 'ಹಿಂದಿನ', next: 'ಮುಂದಿನ', random: 'ಯಾವುದಾದರೂ', go: 'ಹೋಗಿ', favs: 'ಇಷ್ಟವಾದವು',
        cats: ['ಪ್ರಾಣಿ ಸ್ನೇಹಿತರು', 'ಮಲಗುವ ಕಥೆಗಳು', 'ಮಾಯಾ ತೋಟ', 'ಒಳ್ಳೆಯ ಅಭ್ಯಾಸಗಳು', 'ಸಾಹಸ ಪಯಣ'],
        memoryWin: 'ಅದ್ಭುತ! ಎಲ್ಲಾ ಜೋಡಿಗಳನ್ನು ಸೇರಿಸಿದೆ!'
      },
      lettersA: mapIndic([
        ['ಅ', 'ಅರಸ', '👑', 'a - arasa'], ['ಆ', 'ಆನೆ', '🐘', 'aa - aane'], ['ಇ', 'ಇಲಿ', '🐭', 'i - ili'],
        ['ಈ', 'ಈರುಳ್ಳಿ', '🧅', 'ee - eerulli'], ['ಉ', 'ಉಂಗುರ', '💍', 'u - ungura'], ['ಊ', 'ಊಟ', '🍽️', 'oo - oota'],
        ['ಋ', 'ಋಷಿ', '🧘', 'ru - rushi'], ['ಎ', 'ಎಲೆ', '🍃', 'e - ele'], ['ಏ', 'ಏಣಿ', '🪜', 'ae - eni'],
        ['ಐ', 'ಐದು', '🖐️', 'ai - aidu'], ['ಒ', 'ಒಂಟೆ', '🐪', 'o - onte'], ['ಓ', 'ಓಡ', '⛵', 'oa - oda'],
        ['ಔ', 'ಔಷಧ', '💊', 'au - aushadha'], ['ಅಂ', 'ಅಂಗಡಿ', '🏪', 'am - angadi']
      ]),
      lettersB: mapIndic([
        ['ಕ', 'ಕಮಲ', '🪷', 'ka - kamala'], ['ಖ', 'ಖಡ್ಗ', '⚔️', 'kha - khadga'], ['ಗ', 'ಗಡಿಯಾರ', '⌚', 'ga - gadiyara'],
        ['ಚ', 'ಚಂದ್ರ', '🌙', 'cha - chandra'], ['ಜ', 'ಜನ', '👨‍👩‍👧', 'ja - jana'], ['ಟ', 'ಟೊಮೆಟೊ', '🍅', 'ta - tomato'],
        ['ಡ', 'ಡಮರು', '🥁', 'da - damaru'], ['ತ', 'ತಬಲ', '🪘', 'ta - tabala'], ['ದ', 'ದೋಣಿ', '⛵', 'da - doni'],
        ['ನ', 'ನವಿಲು', '🦚', 'na - navilu'], ['ಪ', 'ಪತಂಗ', '🪁', 'pa - patanga'], ['ಫ', 'ಫಲ', '🍎', 'pha - phala'],
        ['ಬ', 'ಬಾಳೆಹಣ್ಣು', '🍌', 'ba - balehannu'], ['ಮ', 'ಮನೆ', '🏠', 'ma - mane'], ['ಯ', 'ಯಂತ್ರ', '⚙️', 'ya - yantra'],
        ['ರ', 'ರವಿ', '☀️', 'ra - ravi'], ['ಲ', 'ಲಡ್ಡು', '🟡', 'la - laddu'], ['ವ', 'ವನ', '🌳', 'va - vana'],
        ['ಶ', 'ಶಂಖ', '🐚', 'sha - shankha'], ['ಸ', 'ಸೂರ್ಯ', '☀️', 'sa - soorya'], ['ಹ', 'ಹಂಸ', '🦢', 'ha - hamsa'],
        ['ಳ', 'ಮಳೆ', '🌧️', 'la - male']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'ಸೇಬು', ph: 'sebu' },
        { id: 'mango', emoji: '🥭', name: 'ಮಾವಿನಹಣ್ಣು', ph: 'maavinahannu' },
        { id: 'banana', emoji: '🍌', name: 'ಬಾಳೆಹಣ್ಣು', ph: 'baalehannu' },
        { id: 'grapes', emoji: '🍇', name: 'ದ್ರಾಕ್ಷಿ', ph: 'drakshi' },
        { id: 'orange', emoji: '🍊', name: 'ಕಿತ್ತಳೆ', ph: 'kittale' },
        { id: 'watermelon', emoji: '🍉', name: 'ಕಲ್ಲಂಗಡಿ', ph: 'kallangadi' },
        { id: 'strawberry', emoji: '🍓', name: 'ಸ್ಟ್ರಾಬೆರಿ', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'ಅನಾನಸ್', ph: 'ananas' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'ಸಿಂಹ', ph: 'simha' },
        { id: 'elephant', emoji: '🐘', name: 'ಆನೆ', ph: 'aane' },
        { id: 'tiger', emoji: '🐯', name: 'ಹುಲಿ', ph: 'huli' },
        { id: 'monkey', emoji: '🐒', name: 'ಕೋತಿ', ph: 'koti' },
        { id: 'rabbit', emoji: '🐰', name: 'ಮೊಲ', ph: 'mola' },
        { id: 'dog', emoji: '🐶', name: 'ನಾಯಿ', ph: 'naayi' },
        { id: 'cat', emoji: '🐱', name: 'ಬೆಕ್ಕು', ph: 'bekku' },
        { id: 'cow', emoji: '🐄', name: 'ಹಸು', ph: 'hasu' },
        { id: 'peacock', emoji: '🦚', name: 'ನವಿಲು', ph: 'navilu' },
        { id: 'panda', emoji: '🐼', name: 'ಪಾಂಡಾ', ph: 'panda' }
      ]
    },

    ml: {
      id: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', locale: 'ml-IN', fallbackLocale: 'en-IN',
      isLatin: false, states: ['Kerala'], color: '#2a9d8f', emoji: '🥥',
      ui: {
        homeSub: 'കളിക്കൂ, കേൾക്കൂ, പഠിക്കൂ!',
        cardA: 'സ്വരങ്ങൾ (അ–ഔ)', cardASub: 'മലയാളം സ്വരാക്ഷരങ്ങൾ',
        cardB: 'വ്യഞ്ജനങ്ങൾ (ക–ഹ)', cardBSub: 'മലയാളം വ്യഞ്ജനാക്ഷരങ്ങൾ',
        cardNumbers: '1 മുതൽ 100 അക്കങ്ങൾ', cardNumbersSub: 'അക്കങ്ങൾ കേട്ട് പഠിക്കാം',
        cardStories: '1000 കഥകൾ 📖', cardStoriesSub: 'ഓഫ്‌ലൈൻ കഥകൾ കേൾക്കാം',
        gamesHeading: 'രസകരമായ കളികൾ (+10 / -5)',
        gFruit: 'പഴം പിടിക്കാം', gFruitSub: 'ശരിയായ പഴം കുട്ടയിൽ പിടിക്കൂ',
        gBalloon: 'ബലൂൺ പൊട്ടിക്കാം', gBalloonSub: 'ശരിയായ അക്ഷരം പൊട്ടിക്കൂ',
        gAnimal: 'മൃഗത്തെ കണ്ടെത്തൂ', gAnimalSub: 'ശരിയായ മൃഗത്തിൽ തൊടൂ',
        gMemory: 'ജോഡി ചേർക്കാം', gMemorySub: 'ഒരേ കാർഡുകൾ ചേർക്കൂ',
        back: 'തിരികെ', languages: 'ഭാഷകൾ', exit: 'പുറത്ത്',
        musicOn: 'സംഗീതം ഓൺ', musicOff: 'സംഗീതം ഓഫ്',
        stars: 'പോയിന്റ്', repeat: 'വീണ്ടും കേൾക്കൂ', newGame: 'പുതിയ കളി',
        catchPrompt: '{item} പിടിക്കൂ!', popPrompt: '{item} പൊട്ടിക്കൂ!', animalPrompt: '{item} തൊടൂ!',
        correctList: ['മിടുക്കൻ! വളരെ നല്ലത്!', 'സൂപ്പർ!', 'ശരിയായ ഉത്തരം!'],
        retryList: ['അയ്യോ, വീണ്ടും ശ്രമിക്കൂ!', 'സാരമില്ല, ഒരിക്കൽ കൂടി നോക്കൂ!'],
        exitTitle: 'പുറത്തു പോകണോ?', exitMsg: 'ആൽഫാബ്ലൂമിൽ നിന്ന് പുറത്തു പോകാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?',
        yes: 'അതെ', no: 'വേണ്ട',
        storyNum: 'കഥ', moral: 'കഥയുടെ ഗുണപാഠം', readAloud: 'കഥ കേൾക്കൂ 🔊', stopRead: 'നിർത്തൂ ⏹️',
        prev: 'മുൻപ്', next: 'അടുത്തത്', random: 'ഏതെങ്കിലും', go: 'പോകൂ', favs: 'പ്രിയപ്പെട്ടവ',
        cats: ['മൃഗ കൂട്ടുകാർ', 'ഉറക്ക കഥകൾ', 'മായാ തോട്ടം', 'നല്ല ശീലങ്ങൾ', 'സാഹസിക യാത്ര'],
        memoryWin: 'അടിപൊളി! എല്ലാ ജോഡികളും ചേർത്തു!'
      },
      lettersA: mapIndic([
        ['അ', 'അമ്മ', '👩', 'a - amma'], ['ആ', 'ആന', '🐘', 'aa - aana'], ['ഇ', 'ഇല', '🍃', 'i - ila'],
        ['ഈ', 'ഈച്ച', '🪰', 'ee - eecha'], ['ഉ', 'ഉറുമ്പ്', '🐜', 'u - urumbu'], ['ഊ', 'ഊഞ്ഞാൽ', '🪁', 'oo - oonjal'],
        ['ഋ', 'ഋഷി', '🧘', 'ru - rishi'], ['എ', 'എലി', '🐭', 'e - eli'], ['ഏ', 'ഏണി', '🪜', 'ae - eni'],
        ['ഐ', 'ഐസ്ക്രീം', '🍦', 'ai - ice cream'], ['ഒ', 'ഒട്ടകം', '🐪', 'o - ottakam'], ['ഓ', 'ഓടം', '⛵', 'oa - odam'],
        ['ഔ', 'ഔഷധം', '💊', 'au - aushadham']
      ]),
      lettersB: mapIndic([
        ['ക', 'കപ്പൽ', '🚢', 'ka - kappal'], ['ഖ', 'ഖഡ്ഗം', '⚔️', 'kha - khadgam'], ['ഗ', 'ഗരുഡൻ', '🦅', 'ga - garudan'],
        ['ച', 'ചക്ക', '🍈', 'cha - chakka'], ['ജ', 'ജലം', '💧', 'ja - jalam'], ['ത', 'തവള', '🐸', 'tha - thavala'],
        ['ദ', 'ദീപം', '🪔', 'da - deepam'], ['ന', 'നായ', '🐶', 'na - naaya'], ['പ', 'പശു', '🐄', 'pa - pashu'],
        ['ഫ', 'ഫലം', '🍎', 'pha - phalam'], ['ബ', 'ബസ്', '🚌', 'ba - bus'], ['മ', 'മയിൽ', '🦚', 'ma - mayil'],
        ['യ', 'യന്ത്രം', '⚙️', 'ya - yanthram'], ['ര', 'രവി', '☀️', 'ra - ravi'], ['ല', 'ലഡു', '🟡', 'la - laddu'],
        ['വ', 'വഞ്ചി', '⛵', 'va - vanchi'], ['ശ', 'ശംഖ്', '🐚', 'sha - shankhu'], ['സ', 'സൂര്യൻ', '☀️', 'sa - sooryan'],
        ['ഹ', 'ഹംസം', '🦢', 'ha - hamsam'], ['ള', 'വിളക്ക്', '🪔', 'la - vilakku']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'ആപ്പിൾ', ph: 'apple' },
        { id: 'mango', emoji: '🥭', name: 'മാങ്ങ', ph: 'maanga' },
        { id: 'banana', emoji: '🍌', name: 'വാഴപ്പഴം', ph: 'vaazhappazham' },
        { id: 'grapes', emoji: '🍇', name: 'മുന്തിരി', ph: 'munthiri' },
        { id: 'orange', emoji: '🍊', name: 'ഓറഞ്ച്', ph: 'orange' },
        { id: 'watermelon', emoji: '🍉', name: 'തണ്ണിമത്തൻ', ph: 'thannimaththan' },
        { id: 'strawberry', emoji: '🍓', name: 'സ്ട്രോബെറി', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'കൈതച്ചക്ക', ph: 'kaithachakka' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'സിംഹം', ph: 'simham' },
        { id: 'elephant', emoji: '🐘', name: 'ആന', ph: 'aana' },
        { id: 'tiger', emoji: '🐯', name: 'കടുവ', ph: 'kaduva' },
        { id: 'monkey', emoji: '🐒', name: 'കുരങ്ങ്', ph: 'kurangu' },
        { id: 'rabbit', emoji: '🐰', name: 'മുയൽ', ph: 'muyal' },
        { id: 'dog', emoji: '🐶', name: 'നായ', ph: 'naaya' },
        { id: 'cat', emoji: '🐱', name: 'പൂച്ച', ph: 'poocha' },
        { id: 'cow', emoji: '🐄', name: 'പശു', ph: 'pashu' },
        { id: 'peacock', emoji: '🦚', name: 'മയിൽ', ph: 'mayil' },
        { id: 'panda', emoji: '🐼', name: 'പാണ്ട', ph: 'panda' }
      ]
    },

    gu: {
      id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', locale: 'gu-IN', fallbackLocale: 'hi-IN',
      isLatin: false, states: ['Gujarat'], color: '#f77f00', emoji: '🦁',
      ui: {
        homeSub: 'રમો, સાંભળો અને શીખો!',
        cardA: 'સ્વર (અ–અઃ)', cardASub: 'ગુજરાતી સ્વર શીખો',
        cardB: 'વ્યંજન (ક–જ્ઞ)', cardBSub: 'ગુજરાતી વ્યંજન શીખો',
        cardNumbers: '1 થી 100 અંકો', cardNumbersSub: 'અંકો સાંભળો અને ગણો',
        cardStories: '1000 વાર્તાઓ 📖', cardStoriesSub: 'ઓફલાઇન વાર્તાઓ સાંભળો',
        gamesHeading: 'મજેદાર રમતો (+10 / -5)',
        gFruit: 'ફળ પકડો', gFruitSub: 'સાચું ફળ ટોપલીમાં પકડો',
        gBalloon: 'ફુગ્ગો ફોડો', gBalloonSub: 'સાચો અક્ષર ફોડો',
        gAnimal: 'પ્રાણી ઓળખો', gAnimalSub: 'સાચા પ્રાણી પર ટૅપ કરો',
        gMemory: 'જોડી મેળવો', gMemorySub: 'સરખા કાર્ડ મેળવો',
        back: 'પાછા', languages: 'ભાષાઓ', exit: 'બહાર',
        musicOn: 'સંગીત ચાલુ', musicOff: 'સંગીત બંધ',
        stars: 'પોઇન્ટ', repeat: 'ફરી સાંભળો', newGame: 'નવી રમત',
        catchPrompt: '{item} પકડો!', popPrompt: '{item} ફોડો!', animalPrompt: '{item} ને અડો!',
        correctList: ['શાબાશ! ખૂબ સરસ!', 'વાહ! કમાલ કરી!', 'સાચો જવાબ!'],
        retryList: ['અરે, ફરી પ્રયત્ન કરો!', 'કાંઈ વાંધો નહીં, ફરી જુઓ!'],
        exitTitle: 'બહાર નીકળવું છે?', exitMsg: 'શું તમે ખરેખર આલ્ફાબ્લૂમમાંથી બહાર નીકળવા માંગો છો?',
        yes: 'હા', no: 'ના',
        storyNum: 'વાર્તા', moral: 'વાર્તાનો બોધ', readAloud: 'વાર્તા સાંભળો 🔊', stopRead: 'રોકો ⏹️',
        prev: 'પાછલી', next: 'આગલી', random: 'કોઈપણ', go: 'જાઓ', favs: 'મનપસંદ',
        cats: ['પ્રાણી મિત્રો', 'સૂવાની વાર્તાઓ', 'જાદુઈ બગીચો', 'સારી ટેવો', 'સાહસ સફર'],
        memoryWin: 'વાહ! બધી જોડીઓ મળી ગઈ!'
      },
      lettersA: mapIndic([
        ['અ', 'અનાનસ', '🍍', 'a - ananas'], ['આ', 'આગગાડી', '🚂', 'aa - aaggaadi'], ['ઇ', 'ઇયળ', '🐛', 'i - iyal'],
        ['ઈ', 'ઈંડું', '🥚', 'ee - eendu'], ['ઉ', 'ઉંદર', '🐭', 'u - undar'], ['ઊ', 'ઊંટ', '🐪', 'oo - oont'],
        ['એ', 'એરણ', '⚒️', 'e - eran'], ['ઐ', 'ઐરાવત', '🐘', 'ai - airavat'], ['ઓ', 'ઓશિકું', '🛏️', 'o - oshiku'],
        ['ઔ', 'ઔષધ', '💊', 'au - aushadh'], ['અં', 'અંગૂઠો', '👍', 'ang - angutho']
      ]),
      lettersB: mapIndic([
        ['ક', 'કમળ', '🪷', 'ka - kamal'], ['ખ', 'ખટારો', '🚚', 'kha - khataro'], ['ગ', 'ગણપતિ', '🐘', 'ga - ganpati'],
        ['ઘ', 'ઘર', '🏠', 'gha - ghar'], ['ચ', 'ચકલી', '🐦', 'cha - chakli'], ['છ', 'છત્રી', '☂️', 'chha - chhatri'],
        ['જ', 'જમરૂખ', '🍐', 'ja - jamrukh'], ['ટ', 'ટમેટું', '🍅', 'ta - tametu'], ['ડ', 'ડબ્બો', '📦', 'da - dabbo'],
        ['ત', 'તલવાર', '⚔️', 'ta - talwar'], ['દ', 'દડો', '⚽', 'da - dado'], ['ન', 'નળ', '🚰', 'na - nal'],
        ['પ', 'પતંગ', '🪁', 'pa - patang'], ['ફ', 'ફટાકડા', '🎆', 'pha - fatakda'], ['બ', 'બકરી', '🐐', 'ba - bakri'],
        ['ભ', 'ભમરડો', '🪀', 'bha - bhamardo'], ['મ', 'મરચું', '🌶️', 'ma - marchu'], ['ર', 'રમકડું', '🧸', 'ra - ramakdu'],
        ['લ', 'લસણ', '🧄', 'la - lasan'], ['વ', 'વહાણ', '🚢', 'va - vahan'], ['સ', 'સસલું', '🐰', 'sa - saslu'],
        ['હ', 'હાથી', '🐘', 'ha - haathi']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'સફરજન', ph: 'safarjan' },
        { id: 'mango', emoji: '🥭', name: 'કેરી', ph: 'keri' },
        { id: 'banana', emoji: '🍌', name: 'કેળું', ph: 'kelu' },
        { id: 'grapes', emoji: '🍇', name: 'દ્રાક્ષ', ph: 'draksh' },
        { id: 'orange', emoji: '🍊', name: 'નારંગી', ph: 'narangi' },
        { id: 'watermelon', emoji: '🍉', name: 'તરબૂચ', ph: 'tarbooch' },
        { id: 'strawberry', emoji: '🍓', name: 'સ્ટ્રોબેરી', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'અનાનસ', ph: 'ananas' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'સિંહ', ph: 'sinh' },
        { id: 'elephant', emoji: '🐘', name: 'હાથી', ph: 'haathi' },
        { id: 'tiger', emoji: '🐯', name: 'વાઘ', ph: 'vaagh' },
        { id: 'monkey', emoji: '🐒', name: 'વાંદરો', ph: 'vaandro' },
        { id: 'rabbit', emoji: '🐰', name: 'સસલું', ph: 'saslu' },
        { id: 'dog', emoji: '🐶', name: 'કૂતરો', ph: 'kootro' },
        { id: 'cat', emoji: '🐱', name: 'બિલાડી', ph: 'bilaadi' },
        { id: 'cow', emoji: '🐄', name: 'ગાય', ph: 'gaay' },
        { id: 'peacock', emoji: '🦚', name: 'મોર', ph: 'mor' },
        { id: 'panda', emoji: '🐼', name: 'પાંડા', ph: 'panda' }
      ]
    },

    bn: {
      id: 'bn', name: 'Bengali', nativeName: 'বাংলা', locale: 'bn-IN', fallbackLocale: 'en-IN',
      isLatin: false, states: ['West Bengal', 'Tripura'], color: '#8338ec', emoji: '🐅',
      ui: {
        homeSub: 'খেলো, শোনো এবং শেখো!',
        cardA: 'স্বরবর্ণ (অ–ঔ)', cardASub: 'বাংলা স্বরবর্ণ শেখো',
        cardB: 'ব্যঞ্জনবর্ণ (ক–হ)', cardBSub: 'বাংলা ব্যঞ্জনবর্ণ শেখো',
        cardNumbers: '1 থেকে 100 সংখ্যা', cardNumbersSub: 'সংখ্যা শুনে গণনা শেখো',
        cardStories: '1000 গল্প 📖', cardStoriesSub: 'অফলাইন গল্প শোনো',
        gamesHeading: 'মজার খেলা (+10 / -5)',
        gFruit: 'ফল ধরো', gFruitSub: 'সঠিক ফল ঝুড়িতে ধরো',
        gBalloon: 'বেলুন ফাটাও', gBalloonSub: 'সঠিক অক্ষর ফাটাও',
        gAnimal: 'প্রাণী চেনো', gAnimalSub: 'সঠিক প্রাণীতে ট্যাপ করো',
        gMemory: 'জোড়া মেলাও', gMemorySub: 'একই কার্ড মেলাও',
        back: 'ফিরে যাও', languages: 'ভাষা', exit: 'বের হও',
        musicOn: 'সঙ্গীত চালু', musicOff: 'সঙ্গীত বন্ধ',
        stars: 'পয়েন্ট', repeat: 'আবার শোনো', newGame: 'নতুন খেলা',
        catchPrompt: '{item} ধরো!', popPrompt: '{item} ফাটাও!', animalPrompt: '{item} এ ট্যাপ করো!',
        correctList: ['বাহ! খুব সুন্দর!', 'শাবাশ!', 'দারুণ হয়েছে!'],
        retryList: ['উফ, আবার চেষ্টা করো!', 'কোনো ব্যাপার না, আবার দেখো!'],
        exitTitle: 'বের হতে চাও?', exitMsg: 'তুমি কি সত্যিই আলফাব্লুম থেকে বের হতে চাও?',
        yes: 'হ্যাঁ', no: 'না',
        storyNum: 'গল্প', moral: 'গল্পের নীতিশিক্ষা', readAloud: 'গল্প শোনো 🔊', stopRead: 'থামাও ⏹️',
        prev: 'আগের', next: 'পরের', random: 'যেকোনো', go: 'যাও', favs: 'প্রিয়',
        cats: ['প্রাণী বন্ধু', 'ঘুমপাড়ানি গল্প', 'জাদুর বাগান', 'ভালো অভ্যাস', 'অ্যাডভেঞ্চার'],
        memoryWin: 'বাহ! তুমি সব জোড়া মিলিয়েছো!'
      },
      lettersA: mapIndic([
        ['অ', 'অজগর', '🐍', 'o - ojogor'], ['আ', 'আম', '🥭', 'aa - aam'], ['ই', 'ইঁদুর', '🐭', 'i - indur'],
        ['ঈ', 'ঈগল', '🦅', 'ee - eagle'], ['উ', 'উট', '🐪', 'u - oot'], ['ঊ', 'ঊষা', '🌅', 'oo - usha'],
        ['ঋ', 'ঋষি', '🧘', 'ri - rishi'], ['এ', 'একতারা', '🎸', 'e - ektara'], ['ঐ', 'ঐরাবত', '🐘', 'oi - oirabot'],
        ['ও', 'ওল', '🥔', 'o - ol'], ['ঔ', 'ঔষধ', '💊', 'ou - oushodh']
      ]),
      lettersB: mapIndic([
        ['ক', 'কলা', '🍌', 'ko - kola'], ['খ', 'খরগোশ', '🐰', 'kho - khorgosh'], ['গ', 'গরু', '🐄', 'go - goru'],
        ['ঘ', 'ঘর', '🏠', 'gho - ghor'], ['চ', 'চাঁদ', '🌙', 'cho - chand'], ['ছ', 'ছাতা', '☂️', 'chho - chhata'],
        ['জ', 'জাহাজ', '🚢', 'jo - jahaj'], ['ট', 'টমেটো', '🍅', 'to - tomato'], ['ড', 'ডাব', '🥥', 'do - daab'],
        ['ত', 'তবলা', '🪘', 'to - tobla'], ['দ', 'দোয়েল', '🐦', 'do - doyel'], ['ন', 'নৌকা', '⛵', 'no - nouka'],
        ['প', 'পাখি', '🦜', 'po - pakhi'], ['ফ', 'ফুল', '🌸', 'pho - phul'], ['ব', 'বাঘ', '🐯', 'bo - bagh'],
        ['ভ', 'ভালুক', '🐻', 'bho - bhaluk'], ['ম', 'মাছ', '🐟', 'mo - maach'], ['র', 'রাজহাঁস', '🦢', 'ro - rajhans'],
        ['ল', 'লাটিম', '🪀', 'lo - latim'], ['শ', 'শাপলা', '🪷', 'sho - shapla'], ['স', 'সিংহ', '🦁', 'so - singho'],
        ['হ', 'হাতি', '🐘', 'ho - haati']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'আপেল', ph: 'apel' },
        { id: 'mango', emoji: '🥭', name: 'আম', ph: 'aam' },
        { id: 'banana', emoji: '🍌', name: 'কলা', ph: 'kola' },
        { id: 'grapes', emoji: '🍇', name: 'আঙুর', ph: 'angur' },
        { id: 'orange', emoji: '🍊', name: 'কমলা', ph: 'komola' },
        { id: 'watermelon', emoji: '🍉', name: 'তরমুজ', ph: 'tormuj' },
        { id: 'strawberry', emoji: '🍓', name: 'স্ট্রবেরি', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'আনারস', ph: 'anaros' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'সিংহ', ph: 'singho' },
        { id: 'elephant', emoji: '🐘', name: 'হাতি', ph: 'haati' },
        { id: 'tiger', emoji: '🐯', name: 'বাঘ', ph: 'bagh' },
        { id: 'monkey', emoji: '🐒', name: 'বানর', ph: 'banor' },
        { id: 'rabbit', emoji: '🐰', name: 'খরগোশ', ph: 'khorgosh' },
        { id: 'dog', emoji: '🐶', name: 'কুকুর', ph: 'kukur' },
        { id: 'cat', emoji: '🐱', name: 'বিড়াল', ph: 'biral' },
        { id: 'cow', emoji: '🐄', name: 'গরু', ph: 'goru' },
        { id: 'peacock', emoji: '🦚', name: 'ময়ূর', ph: 'moyur' },
        { id: 'panda', emoji: '🐼', name: 'পান্ডা', ph: 'panda' }
      ]
    },

    pa: {
      id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', locale: 'pa-IN', fallbackLocale: 'hi-IN',
      isLatin: false, states: ['Punjab'], color: '#ffd166', emoji: '🌻',
      ui: {
        homeSub: 'ਖੇਡੋ, ਸੁਣੋ ਅਤੇ ਸਿੱਖੋ!',
        cardA: 'ਸਵਰ (ੳ–ਅ)', cardASub: 'ਪੰਜਾਬੀ ਸਵਰ ਸਿੱਖੋ',
        cardB: 'ਵਿਅੰਜਨ (ਸ–ੜ)', cardBSub: 'ਪੰਜਾਬੀ ਵਿਅੰਜਨ ਸਿੱਖੋ',
        cardNumbers: '1 ਤੋਂ 100 ਗਿਣਤੀ', cardNumbersSub: 'ਗਿਣਤੀ ਸੁਣੋ ਅਤੇ ਸਿੱਖੋ',
        cardStories: '1000 ਕਹਾਣੀਆਂ 📖', cardStoriesSub: 'ਆਫ਼ਲਾਈਨ ਕਹਾਣੀਆਂ ਸੁਣੋ',
        gamesHeading: 'ਮਜ਼ੇਦਾਰ ਖੇਡਾਂ (+10 / -5)',
        gFruit: 'ਫਲ ਫੜੋ', gFruitSub: 'ਸਹੀ ਫਲ ਟੋਕਰੀ ਵਿੱਚ ਫੜੋ',
        gBalloon: 'ਗੁਬਾਰਾ ਫੋੜੋ', gBalloonSub: 'ਸਹੀ ਅੱਖਰ ਫੋੜੋ',
        gAnimal: 'ਜਾਨਵਰ ਪਛਾਣੋ', gAnimalSub: 'ਪਿਆਰੇ ਜਾਨਵਰ ਤੇ ਟੈਪ ਕਰੋ',
        gMemory: 'ਜੋੜੀ ਮਿਲਾਓ', gMemorySub: 'ਇੱਕੋ ਜਿਹੇ ਕਾਰਡ ਮਿਲਾਓ',
        back: 'ਪਿੱਛੇ', languages: 'ਭਾਸ਼ਾਵਾਂ', exit: 'ਬਾਹਰ',
        musicOn: 'ਸੰਗੀਤ ਚਾਲੂ', musicOff: 'ਸੰਗੀਤ ਬੰਦ',
        stars: 'ਅੰਕ', repeat: 'ਫਿਰ ਸੁਣੋ', newGame: 'ਨਵੀਂ ਖੇਡ',
        catchPrompt: '{item} ਫੜੋ!', popPrompt: '{item} ਫੋੜੋ!', animalPrompt: '{item} ਨੂੰ ਛੂਹੋ!',
        correctList: ['ਸ਼ਾਬਾਸ਼! ਬਹੁਤ ਵਧੀਆ!', 'ਵਾਹ! ਕਮਾਲ ਕਰ ਦਿੱਤੀ!', 'ਸਹੀ ਜਵਾਬ!'],
        retryList: ['ਓਹ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ!', 'ਕੋਈ ਗੱਲ ਨਹੀਂ, ਫਿਰ ਦੇਖੋ!'],
        exitTitle: 'ਬਾਹਰ ਜਾਣਾ ਹੈ?', exitMsg: 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਅਲਫਾਬਲੂਮ ਤੋਂ ਬਾਹਰ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
        yes: 'ਹਾਂ', no: 'ਨਹੀਂ',
        storyNum: 'ਕਹਾਣੀ', moral: 'ਕਹਾਣੀ ਦੀ ਸਿੱਖਿਆ', readAloud: 'ਕਹਾਣੀ ਸੁਣੋ 🔊', stopRead: 'ਰੋਕੋ ⏹️',
        prev: 'ਪਿਛਲੀ', next: 'ਅਗਲੀ', random: 'ਕੋਈ ਵੀ', go: 'ਜਾਓ', favs: 'ਪਸੰਦੀਦਾ',
        cats: ['ਜਾਨਵਰ ਦੋਸਤ', 'ਸੌਣ ਦੀਆਂ ਕਹਾਣੀਆਂ', 'ਜਾਦੂਈ ਬਾਗ਼', 'ਚੰਗੀਆਂ ਆਦਤਾਂ', 'ਰੋਮਾਂਚਕ ਸਫ਼ਰ'],
        memoryWin: 'ਵਾਹ! ਤੁਸੀਂ ਸਾਰੀਆਂ ਜੋੜੀਆਂ ਮਿਲਾ ਲਈਆਂ!'
      },
      lettersA: mapIndic([
        ['ੳ', 'ਊਠ', '🐪', 'oora - ooth'], ['ਅ', 'ਅਨਾਰ', '🍎', 'aira - anaar'], ['ੲ', 'ਇੱਟ', '🧱', 'eeri - itt'],
        ['ਆ', 'ਅੰਬ', '🥭', 'aa - amb'], ['ਇ', 'ਇਮਲੀ', '🫘', 'i - imli'], ['ਈ', 'ਈਦ', '🌙', 'ee - eid'],
        ['ਉ', 'ਉੱਲੂ', '🦉', 'u - ullu'], ['ਊ', 'ਊਨ', '🧶', 'oo - oon'], ['ਏ', 'ਏਕਤਾ', '🤝', 'e - ekta'],
        ['ਓ', 'ਓਸ', '💧', 'o - os']
      ]),
      lettersB: mapIndic([
        ['ਸ', 'ਸੇਬ', '🍎', 'sassa - seb'], ['ਹ', 'ਹਾਥੀ', '🐘', 'haha - haathi'], ['ਕ', 'ਕਬੂਤਰ', '🕊️', 'kakka - kabootar'],
        ['ਖ', 'ਖਰਗੋਸ਼', '🐰', 'khakha - khargosh'], ['ਗ', 'ਗਾਂ', '🐄', 'gagga - gaan'], ['ਘ', 'ਘਰ', '🏠', 'ghagga - ghar'],
        ['ਚ', 'ਚਮਚਾ', '🥄', 'chacha - chamcha'], ['ਛ', 'ਛਤਰੀ', '☂️', 'chhachha - chhatri'], ['ਜ', 'ਜਹਾਜ਼', '🚢', 'jajja - jahaaz'],
        ['ਟ', 'ਟਮਾਟਰ', '🍅', 'tainka - tamatar'], ['ਡ', 'ਡੱਡੂ', '🐸', 'dadda - daddu'], ['ਤ', 'ਤੋਤਾ', '🦜', 'tatta - tota'],
        ['ਦ', 'ਦਵਾਤ', '🖋️', 'dadda - dawaat'], ['ਨ', 'ਨਲਕਾ', '🚰', 'nanna - nalka'], ['ਪ', 'ਪਤੰਗ', '🪁', 'pappa - patang'],
        ['ਫ', 'ਫਲ', '🍓', 'phapha - phal'], ['ਬ', 'ਬੱਤਖ', '🦆', 'babba - battakh'], ['ਮ', 'ਮੱਛੀ', '🐟', 'mamma - machhi'],
        ['ਰ', 'ਰੱਥ', '🛞', 'rara - rath'], ['ਲ', 'ਲੱਡੂ', '🟡', 'lalla - laddoo'], ['ਵ', 'ਵਾਜਾ', '🎹', 'vava - vaaja']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'ਸੇਬ', ph: 'seb' },
        { id: 'mango', emoji: '🥭', name: 'ਅੰਬ', ph: 'amb' },
        { id: 'banana', emoji: '🍌', name: 'ਕੇਲਾ', ph: 'kela' },
        { id: 'grapes', emoji: '🍇', name: 'ਅੰਗੂਰ', ph: 'angoor' },
        { id: 'orange', emoji: '🍊', name: 'ਸੰਤਰਾ', ph: 'santra' },
        { id: 'watermelon', emoji: '🍉', name: 'ਤਰਬੂਜ਼', ph: 'tarbooz' },
        { id: 'strawberry', emoji: '🍓', name: 'ਸਟ੍ਰਾਬੇਰੀ', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'ਅਨਾਨਾਸ', ph: 'ananas' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'ਸ਼ੇਰ', ph: 'sher' },
        { id: 'elephant', emoji: '🐘', name: 'ਹਾਥੀ', ph: 'haathi' },
        { id: 'tiger', emoji: '🐯', name: 'ਚੀਤਾ', ph: 'cheeta' },
        { id: 'monkey', emoji: '🐒', name: 'ਬਾਂਦਰ', ph: 'baandar' },
        { id: 'rabbit', emoji: '🐰', name: 'ਖਰਗੋਸ਼', ph: 'khargosh' },
        { id: 'dog', emoji: '🐶', name: 'ਕੁੱਤਾ', ph: 'kutta' },
        { id: 'cat', emoji: '🐱', name: 'ਬਿੱਲੀ', ph: 'billi' },
        { id: 'cow', emoji: '🐄', name: 'ਗਾਂ', ph: 'gaan' },
        { id: 'peacock', emoji: '🦚', name: 'ਮੋਰ', ph: 'mor' },
        { id: 'panda', emoji: '🐼', name: 'ਪਾਂਡਾ', ph: 'panda' }
      ]
    },

    or: {
      id: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', locale: 'or-IN', fallbackLocale: 'hi-IN',
      isLatin: false, states: ['Odisha'], color: '#00b4d8', emoji: '🐢',
      ui: {
        homeSub: 'ଖେଳ, ଶୁଣ ଏବଂ ଶିଖ!',
        cardA: 'ସ୍ୱରବର୍ଣ୍ଣ (ଅ–ଔ)', cardASub: 'ଓଡ଼ିଆ ସ୍ୱରବର୍ଣ୍ଣ ଶିଖ',
        cardB: 'ବ୍ୟଞ୍ଜନବର୍ଣ୍ଣ (କ–ହ)', cardBSub: 'ଓଡ଼ିଆ ବ୍ୟଞ୍ଜନବର୍ଣ୍ଣ ଶିଖ',
        cardNumbers: '1 ରୁ 100 ସଂଖ୍ୟା', cardNumbersSub: 'ସଂଖ୍ୟା ଶୁଣି ଗଣନା ଶିଖ',
        cardStories: '1000 ଗପ 📖', cardStoriesSub: 'ଅଫଲାଇନ୍ ଗପ ଶୁଣ',
        gamesHeading: 'ମଜାଦାର ଖେଳ (+10 / -5)',
        gFruit: 'ଫଳ ଧର', gFruitSub: 'ସଠିକ୍ ଫଳ ଝୁଡ଼ିରେ ଧର',
        gBalloon: 'ବେଲୁନ୍ ଫୁଟାଅ', gBalloonSub: 'ସଠିକ୍ ଅକ୍ଷର ଫୁଟାଅ',
        gAnimal: 'ପଶୁ ଚିହ୍ନ', gAnimalSub: 'ସଠିକ୍ ପଶୁ ଉପରେ ଟ୍ୟାପ୍ କର',
        gMemory: 'ଯୋଡ଼ି ମିଳାଅ', gMemorySub: 'ସମାନ କାର୍ଡ ମିଳାଅ',
        back: 'ପଛକୁ', languages: 'ଭାଷା', exit: 'ବାହାର',
        musicOn: 'ସଙ୍ଗୀତ ଚାଲୁ', musicOff: 'ସଙ୍ଗୀତ ବନ୍ଦ',
        stars: 'ପଏଣ୍ଟ', repeat: 'ପୁଣି ଶୁଣ', newGame: 'ନୂଆ ଖେଳ',
        catchPrompt: '{item} ଧର!', popPrompt: '{item} ଫୁଟାଅ!', animalPrompt: '{item} କୁ ଛୁଅଁ!',
        correctList: ['ବାଃ! ବହୁତ ସୁନ୍ଦର!', 'ଶାବାସ୍!', 'ସଠିକ୍ ଉତ୍ତର!'],
        retryList: ['ଆରେ, ପୁଣି ଚେଷ୍ଟା କର!', 'କିଛି ନାହିଁ, ଆଉଥରେ ଦେଖ!'],
        exitTitle: 'ବାହାରକୁ ଯିବ?', exitMsg: 'ତୁମେ କଣ ସତରେ ଆଲଫାବ୍ଲୁମ୍ ରୁ ବାହାରିବାକୁ ଚାହୁଁଛ?',
        yes: 'ହଁ', no: 'ନା',
        storyNum: 'ଗପ', moral: 'ଗପର ନୀତିଶିକ୍ଷା', readAloud: 'ଗପ ଶୁଣ 🔊', stopRead: 'ବନ୍ଦ ⏹️',
        prev: 'ପୂର୍ବ', next: 'ପର', random: 'ଯେକୌଣସି', go: 'ଯାଅ', favs: 'ପ୍ରିୟ',
        cats: ['ପଶୁ ବନ୍ଧୁ', 'ଶୋଇବା ଗପ', 'ଜାଦୁ ବଗିଚା', 'ଭଲ ଅଭ୍ୟାସ', 'ସାହସିକ ଯାତ୍ରା'],
        memoryWin: 'ବାଃ! ସବୁ ଯୋଡ଼ି ମିଳାଇଦେଲ!'
      },
      lettersA: mapIndic([
        ['ଅ', 'ଅରଟ', '🛞', 'a - arata'], ['ଆ', 'ଆମ୍ବ', '🥭', 'aa - aamba'], ['ଇ', 'ଇଟା', '🧱', 'i - ita'],
        ['ଈ', 'ଈଗଲ', '🦅', 'ee - eagle'], ['ଉ', 'ଓଟ', '🐪', 'u - ota'], ['ଊ', 'ଊର୍ଣ୍ଣା', '🧶', 'oo - urna'],
        ['ଏ', 'ଏକ', '1️⃣', 'e - eka'], ['ଐ', 'ଐରାବତ', '🐘', 'ai - airabata'], ['ଓ', 'ଓଳ', '🥔', 'o - ola'],
        ['ଔ', 'ଔଷଧ', '💊', 'au - aushadha']
      ]),
      lettersB: mapIndic([
        ['କ', 'କଦଳୀ', '🍌', 'ka - kadali'], ['ଖ', 'ଖରଗୋଶ', '🐰', 'kha - kharagosh'], ['ଗ', 'ଗାଈ', '🐄', 'ga - gaai'],
        ['ଘ', 'ଘର', '🏠', 'gha - ghara'], ['ଚ', 'ଚନ୍ଦ୍ର', '🌙', 'cha - chandra'], ['ଛ', 'ଛତା', '☂️', 'chha - chhata'],
        ['ଜ', 'ଜାହାଜ', '🚢', 'ja - jahaja'], ['ଟ', 'ଟମାଟୋ', '🍅', 'ta - tomato'], ['ଡ', 'ଡଙ୍ଗା', '⛵', 'da - danga'],
        ['ତ', 'ତାରା', '⭐', 'ta - tara'], ['ଦ', 'ଦୀପ', '🪔', 'da - deepa'], ['ନ', 'ନଈ', '🌊', 'na - nai'],
        ['ପ', 'ପଦ୍ମ', '🪷', 'pa - padma'], ['ଫ', 'ଫୁଲ', '🌸', 'pha - phula'], ['ବ', 'ବାଘ', '🐯', 'ba - bagha'],
        ['ମ', 'ମାଛ', '🐟', 'ma - machha'], ['ର', 'ରଥ', '🛞', 'ra - ratha'], ['ଲ', 'ଲଡୁ', '🟡', 'la - ladu'],
        ['ସ', 'ସିଂହ', '🦁', 'sa - singha'], ['ହ', 'ହାତୀ', '🐘', 'ha - haati']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'ସେଓ', ph: 'seo' },
        { id: 'mango', emoji: '🥭', name: 'ଆମ୍ବ', ph: 'aamba' },
        { id: 'banana', emoji: '🍌', name: 'କଦଳୀ', ph: 'kadali' },
        { id: 'grapes', emoji: '🍇', name: 'ଅଙ୍ଗୁର', ph: 'angura' },
        { id: 'orange', emoji: '🍊', name: 'କମଳା', ph: 'kamala' },
        { id: 'watermelon', emoji: '🍉', name: 'ତରଭୁଜ', ph: 'tarabhuja' },
        { id: 'strawberry', emoji: '🍓', name: 'ଷ୍ଟ୍ରବେରୀ', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'ସପୁରୀ', ph: 'sapuri' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'ସିଂହ', ph: 'singha' },
        { id: 'elephant', emoji: '🐘', name: 'ହାତୀ', ph: 'haati' },
        { id: 'tiger', emoji: '🐯', name: 'ବାଘ', ph: 'bagha' },
        { id: 'monkey', emoji: '🐒', name: 'ମାଙ୍କଡ଼', ph: 'mankada' },
        { id: 'rabbit', emoji: '🐰', name: 'ଠେକୁଆ', ph: 'thekua' },
        { id: 'dog', emoji: '🐶', name: 'କୁକୁର', ph: 'kukura' },
        { id: 'cat', emoji: '🐱', name: 'ବିଲେଇ', ph: 'bilei' },
        { id: 'cow', emoji: '🐄', name: 'ଗାଈ', ph: 'gaai' },
        { id: 'peacock', emoji: '🦚', name: 'ମୟୂର', ph: 'mayura' },
        { id: 'panda', emoji: '🐼', name: 'ପାଣ୍ଡା', ph: 'panda' }
      ]
    },

    as: {
      id: 'as', name: 'Assamese', nativeName: 'অসমীয়া', locale: 'as-IN', fallbackLocale: 'bn-IN',
      isLatin: false, states: ['Assam'], color: '#4cc9f0', emoji: '🦏',
      ui: {
        homeSub: 'খেলা, শুনা আৰু শিকা!',
        cardA: 'স্বৰবৰ্ণ (অ–ঔ)', cardASub: 'অসমীয়া স্বৰবৰ্ণ শিকা',
        cardB: 'ব্যঞ্জনবৰ্ণ (ক–হ)', cardBSub: 'অসমীয়া ব্যঞ্জনবৰ্ণ শিকা',
        cardNumbers: '1 পৰা 100 সংখ্যা', cardNumbersSub: 'সংখ্যা শুনি গণনা শিকা',
        cardStories: '1000 সাধু 📖', cardStoriesSub: 'অফলাইন সাধু শুনা',
        gamesHeading: 'মজাৰ খেল (+10 / -5)',
        gFruit: 'ফল ধৰা', gFruitSub: 'সঠিক ফল পাচিত ধৰা',
        gBalloon: 'বেলুন ফুটোৱা', gBalloonSub: 'সঠিক আখৰ ফুটোৱা',
        gAnimal: 'জন্তু চিনি পোৱা', gAnimalSub: 'সঠিক জন্তুত টিপা',
        gMemory: 'যোৰ মিলাওক', gMemorySub: 'একে কাৰ্ড মিলাওক',
        back: 'উভতি যাওক', languages: 'ভাষা', exit: 'বাহিৰ',
        musicOn: 'সংগীত অন', musicOff: 'সংগীত অফ',
        stars: 'নম্বৰ', repeat: 'আকৌ শুনক', newGame: 'নতুন খেল',
        catchPrompt: '{item} ধৰা!', popPrompt: '{item} ফুটোৱা!', animalPrompt: '{item} ত টিপা!',
        correctList: ['বঢ়িয়া! খুব ধুনীয়া!', 'চাব্বাছ!', 'সঠিক উত্তৰ!'],
        retryList: ['আকৌ চেষ্টা কৰা!', 'একো নাই, আকৌ চোৱা!'],
        exitTitle: 'বাহিৰ ওলাব নেকি?', exitMsg: 'আপুনি সঁচাকৈ আলফাব্লুমৰ পৰা বাহিৰ ওলাব বিচাৰে নেকি?',
        yes: 'হয়', no: 'নহয়',
        storyNum: 'সাধু', moral: 'সাধুৰ নীতিশিক্ষা', readAloud: 'সাধু শুনক 🔊', stopRead: 'বন্ধ ⏹️',
        prev: 'আগৰ', next: 'পিছৰ', random: 'যিকোনো', go: 'যাওক', favs: 'প্ৰিয়',
        cats: ['প্ৰাণী বন্ধু', 'শোৱাৰ সাধু', 'যাদুৰ বাগিচা', 'ভাল অভ্যাস', 'সাহসিক যাত্ৰা'],
        memoryWin: 'বঢ়িয়া! সকলো যোৰ মিলিল!'
      },
      lettersA: mapIndic([
        ['অ', 'অজগৰ', '🐍', 'o - ojogor'], ['আ', 'আম', '🥭', 'aa - aam'], ['ই', 'ইটা', '🧱', 'i - ita'],
        ['ঈ', 'ঈগল', '🦅', 'ee - eagle'], ['উ', 'উট', '🐪', 'u - oot'], ['ঊ', 'ঊণ', '🧶', 'oo - oon'],
        ['এ', 'একে', '1️⃣', 'e - ek'], ['ঐ', 'ঐৰাৱত', '🐘', 'oi - oirabot'], ['ও', 'ওঠ', '👄', 'o - oth'],
        ['ঔ', 'ঔষধ', '💊', 'ou - oushodh']
      ]),
      lettersB: mapIndic([
        ['ক', 'কমলা', '🍊', 'ko - komola'], ['খ', 'খৰগোচ', '🐰', 'kho - khorgos'], ['গ', 'গঁড়', '🦏', 'go - gor'],
        ['ঘ', 'ঘৰ', '🏠', 'gho - ghor'], ['চ', 'চৰাই', '🐦', 'so - sorai'], ['ছ', 'ছাতি', '☂️', 'so - sati'],
        ['জ', 'জাহাজ', '🚢', 'jo - jahaj'], ['ট', 'টমাটো', '🍅', 'to - tomato'], ['ড', 'ডালিম', '🍎', 'do - dalim'],
        ['ত', 'তৰা', '⭐', 'to - tora'], ['দ', 'দোল', '🪁', 'do - dol'], ['ন', 'নাও', '⛵', 'no - nao'],
        ['প', 'পদুম', '🪷', 'po - podum'], ['ফ', 'ফুল', '🌸', 'pho - phul'], ['ব', 'বাঘ', '🐯', 'bo - bagh'],
        ['ম', 'মাছ', '🐟', 'mo - maas'], ['ৰ', 'ৰথ', '🛞', 'ro - roth'], ['ল', 'লাড়ু', '🟡', 'lo - laru'],
        ['স', 'সিংহ', '🦁', 'xo - xingho'], ['হ', 'হাতী', '🐘', 'ho - haati']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'আপেল', ph: 'apel' },
        { id: 'mango', emoji: '🥭', name: 'আম', ph: 'aam' },
        { id: 'banana', emoji: '🍌', name: 'কল', ph: 'kol' },
        { id: 'grapes', emoji: '🍇', name: 'আঙুৰ', ph: 'angur' },
        { id: 'orange', emoji: '🍊', name: 'কমলা', ph: 'komola' },
        { id: 'watermelon', emoji: '🍉', name: 'তৰমুজ', ph: 'tormuj' },
        { id: 'strawberry', emoji: '🍓', name: 'ষ্ট্ৰবেৰী', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'আনাৰস', ph: 'anaros' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'সিংহ', ph: 'xingho' },
        { id: 'elephant', emoji: '🐘', name: 'হাতী', ph: 'haati' },
        { id: 'tiger', emoji: '🐯', name: 'বাঘ', ph: 'bagh' },
        { id: 'monkey', emoji: '🐒', name: 'বান্দৰ', ph: 'bandor' },
        { id: 'rabbit', emoji: '🐰', name: 'শহা পহু', ph: 'xoha pohu' },
        { id: 'dog', emoji: '🐶', name: 'কুকুৰ', ph: 'kukur' },
        { id: 'cat', emoji: '🐱', name: 'মেকুৰী', ph: 'mekuri' },
        { id: 'cow', emoji: '🐄', name: 'গৰু', ph: 'goru' },
        { id: 'peacock', emoji: '🦚', name: 'ময়ূৰ', ph: 'moyur' },
        { id: 'panda', emoji: '🐼', name: 'পাণ্ডা', ph: 'panda' }
      ]
    },

    kok: {
      id: 'kok', name: 'Konkani', nativeName: 'कोंकणी', locale: 'kok-IN', fallbackLocale: 'hi-IN',
      isLatin: false, states: ['Goa'], color: '#06aed5', emoji: '🏖️',
      ui: {
        homeSub: 'खेळात, आयकात आनी शिकात!',
        cardA: 'स्वर (अ–अः)', cardASub: 'कोंकणी स्वर शिकात',
        cardB: 'व्यंजनां (क–ज्ञ)', cardBSub: 'कोंकणी व्यंजनां शिकात',
        cardNumbers: '1 ते 100 आंकडे', cardNumbersSub: 'आंकडे आयकात आनी मेजात',
        cardStories: '1000 काणयो 📖', cardStoriesSub: 'ऑफलाइन काणयो आयकात',
        gamesHeading: 'मजेचे खेळ (+10 / -5)',
        gFruit: 'फळां धरात', gFruitSub: 'बरोबर फळ पांटल्यांत धरात',
        gBalloon: 'फुगो फोडात', gBalloonSub: 'बरोबर अक्षर फोडात',
        gAnimal: 'प्राणी वळखात', gAnimalSub: 'बरोबर प्राण्यार टॅप करात',
        gMemory: 'जोडी मेळयात', gMemorySub: 'सारखीं कार्डां मेळयात',
        back: 'फाटीं', languages: 'भासो', exit: 'भायर',
        musicOn: 'संगीत चालू', musicOff: 'संगीत बंद',
        stars: 'गूण', repeat: 'परत आयकात', newGame: 'नवो खेळ',
        catchPrompt: '{item} धरात!', popPrompt: '{item} फोडात!', animalPrompt: '{item} र टॅप करात!',
        correctList: ['शाबास! खूब बरें!', 'मस्त!', 'बरोबर जाप!'],
        retryList: ['अरे, परत यत्न करात!', 'कांय ना, परत पळयात!'],
        exitTitle: 'भायर वचपाचें?', exitMsg: 'तुमकां खरेंच अल्फाब्लूमांतल्यान भायर वचपाक जाय?',
        yes: 'हय', no: 'ना',
        storyNum: 'काणी', moral: 'काणयेचो बोध', readAloud: 'काणी आयकात 🔊', stopRead: 'थांबयात ⏹️',
        prev: 'आदली', next: 'फुडली', random: 'खंयचीय', go: 'वचात', favs: 'आवडट्यो',
        cats: ['प्राणी इश्ट', 'न्हिदेच्यो काणयो', 'जादूची बाग', 'बऱ्यो संवयो', 'धाडसी भोंवडी'],
        memoryWin: 'वाह! सगळ्यो जोड्यो मेळ्ळ्यो!'
      },
      lettersA: mapIndic([
        ['अ', 'अननस', '🍍', 'a - ananas'], ['आ', 'आंबो', '🥭', 'aa - aambo'], ['इ', 'इमारत', '🏢', 'i - imarat'],
        ['ई', 'ईश्वर', '🙏', 'ee - ishwar'], ['उ', 'उंदीर', '🐭', 'u - undir'], ['ऊ', 'ऊंस', '🎋', 'oo - oons'],
        ['ए', 'एक', '1️⃣', 'e - ek'], ['ऐ', 'ऐरावत', '🐘', 'ai - airavat'], ['ओ', 'ओझे', '🎒', 'o - ojhe'],
        ['औ', 'औषध', '💊', 'au - aushadh'], ['अं', 'अंगठी', '💍', 'ang - angthi']
      ]),
      lettersB: mapIndic([
        ['क', 'कमळ', '🪷', 'ka - kamal'], ['ख', 'खडू', '🖍️', 'kha - khadu'], ['ग', 'गोरूं', '🐄', 'ga - gorun'],
        ['घ', 'घर', '🏠', 'gha - ghar'], ['च', 'चंद्र', '🌙', 'cha - chandra'], ['छ', 'सत्री', '☂️', 'chha - satri'],
        ['ज', 'जहाज', '🚢', 'ja - jahaj'], ['ट', 'टमाट', '🍅', 'ta - tamat'], ['ड', 'डबो', '📦', 'da - dabo'],
        ['त', 'तारें', '⭐', 'ta - taare'], ['द', 'दर्या', '🌊', 'da - darya'], ['न', 'नारळ', '🥥', 'na - naaral'],
        ['प', 'पतंग', '🪁', 'pa - patang'], ['फ', 'फूल', '🌸', 'pha - phool'], ['ब', 'बदक', '🦆', 'ba - badak'],
        ['म', 'नुस्तें', '🐟', 'ma - maaso'], ['र', 'रथ', '🛞', 'ra - rath'], ['ल', 'लाडू', '🟡', 'la - ladoo'],
        ['व', 'वाग', '🐯', 'va - waag'], ['स', 'ससो', '🐰', 'sa - saso'], ['ह', 'हत्ती', '🐘', 'ha - hatti']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'सफरचंद', ph: 'safarchand' },
        { id: 'mango', emoji: '🥭', name: 'आंबो', ph: 'aambo' },
        { id: 'banana', emoji: '🍌', name: 'केळें', ph: 'kele' },
        { id: 'grapes', emoji: '🍇', name: 'द्राक्षां', ph: 'draksha' },
        { id: 'orange', emoji: '🍊', name: 'संत्रें', ph: 'santre' },
        { id: 'watermelon', emoji: '🍉', name: 'कलिंगड', ph: 'kalingad' },
        { id: 'strawberry', emoji: '🍓', name: 'स्ट्रॉबेरी', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'अननस', ph: 'ananas' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'सिंह', ph: 'sinha' },
        { id: 'elephant', emoji: '🐘', name: 'हत्ती', ph: 'hatti' },
        { id: 'tiger', emoji: '🐯', name: 'वाग', ph: 'waag' },
        { id: 'monkey', emoji: '🐒', name: 'माकड', ph: 'makad' },
        { id: 'rabbit', emoji: '🐰', name: 'ससो', ph: 'saso' },
        { id: 'dog', emoji: '🐶', name: 'सुणें', ph: 'sune' },
        { id: 'cat', emoji: '🐱', name: 'माजर', ph: 'majar' },
        { id: 'cow', emoji: '🐄', name: 'गाय', ph: 'gaay' },
        { id: 'peacock', emoji: '🦚', name: 'मोर', ph: 'mor' },
        { id: 'panda', emoji: '🐼', name: 'पांडा', ph: 'panda' }
      ]
    },

    mni: {
      id: 'mni', name: 'Manipuri (Meitei)', nativeName: 'মৈতৈলোন্', locale: 'mni-IN', fallbackLocale: 'bn-IN',
      isLatin: false, states: ['Manipur'], color: '#e07a5f', emoji: '🦌',
      ui: {
        homeSub: 'সান্নসি, তাসি অমসুং তমসি!',
        cardA: 'স্বর ময়েক (অ–ঔ)', cardASub: 'মৈতৈলোন্ স্বর তমসি',
        cardB: 'ব্যঞ্জন ময়েক (ক–হ)', cardBSub: 'মৈতৈলোন্ ব্যঞ্জন তমসি',
        cardNumbers: '1 দগী 100 মশীং', cardNumbersSub: 'মশীং তাদুনা তমসি',
        cardStories: '1000 ৱারী 📖', cardStoriesSub: 'অফলাইন ৱারী তাসি',
        gamesHeading: 'নুংঙাইবা শান্নবা (+10 / -5)',
        gFruit: 'উহৈ ফাবা', gFruitSub: 'চুম্বা উহৈ ফাবিয়ু',
        gBalloon: 'বেলুন পোকপা', gBalloonSub: 'চুম্বা ময়েক পোকহল্লু',
        gAnimal: 'শা খঙদোকপা', gAnimalSub: 'চুম্বা শাদা নম্মু',
        gMemory: 'জোড়া চুন্নবা', gMemorySub: 'মান্নবা কার্দ চুন্নহল্লু',
        back: 'হনবা', languages: 'লোনশিং', exit: 'থোকপা',
        musicOn: 'ইশৈ হাংবা', musicOff: 'ইশৈ থিংবা',
        stars: 'থৱান্মিচাক', repeat: 'অমুক তাউ', newGame: 'অনৌবা শান্নবা',
        catchPrompt: '{item} ফাউ!', popPrompt: '{item} পোকহল্লু!', animalPrompt: '{item} দা নম্মু!',
        correctList: ['ফজরে! য়াম্না ফরে!', 'চু্ম্মে!', 'য়াম্না নুংঙাইরে!'],
        retryList: ['অমুক হোৎনৌ!', 'করিগুম্বা লৈতে, অমুক য়েংউ!'],
        exitTitle: 'থোক্কদৌরিবরা?', exitMsg: 'অদোম তশেংনা আলফাব্লুমদগী থোকপা পাম্বিবরা?',
        yes: 'হোয়', no: 'নত্তে',
        storyNum: 'ৱারী', moral: 'ৱারীগী পাউতাক', readAloud: 'ৱারী তাউ 🔊', stopRead: 'লেপ্পু ⏹️',
        prev: 'মমাং', next: 'মথং', random: 'অমা হেক্তা', go: 'চৎলু', favs: 'পাম্বা',
        cats: ['শা মরুপ', 'তুম্বগী ৱারী', 'জাদুগী লৈকোল', 'অফবা লমচৎ', 'খোঙচৎ ৱারী'],
        memoryWin: 'য়াম্না ফরে! জোড়া পুম্নমক চুন্নরে!'
      },
      lettersA: mapIndic([
        ['অ', 'অঙাং', '👶', 'a - angang'], ['আ', 'আম', '🥭', 'aa - aam'], ['ই', 'ইশিং', '💧', 'i - ishing'],
        ['ঈ', 'ঈগল', '🦅', 'ee - eagle'], ['উ', 'উচেক', '🐦', 'u - uchek'], ['এ', 'একে', '1️⃣', 'e - ek'],
        ['ও', 'ওক', '🐷', 'o - ok'], ['ঔ', 'ঔষধ', '💊', 'ou - oushodh']
      ]),
      lettersB: mapIndic([
        ['ক', 'কোক', '🙂', 'ko - kok'], ['খ', 'খুৎ', '🖐️', 'kho - khut'], ['গ', 'গারি', '🚗', 'go - gari'],
        ['চ', 'চাক', '🍚', 'cho - chak'], ['ত', 'থম্বাল', '🪷', 'tha - thambal'], ['ন', 'নুমিৎ', '☀️', 'no - numit'],
        ['প', 'পাউ', '📖', 'po - pau'], ['ফ', 'ফুল', '🌸', 'pho - phul'], ['ম', 'মী', '👤', 'mo - mee'],
        ['ল', 'লৈ', '🌼', 'lo - lei'], ['শ', 'শা', '🦌', 'sho - sha'], ['স', 'সমু', '🐘', 'so - samu'],
        ['হ', 'হুই', '🐶', 'ho - hui']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'সেম', ph: 'sem' },
        { id: 'mango', emoji: '🥭', name: 'হৈনৌ', ph: 'heinou' },
        { id: 'banana', emoji: '🍌', name: 'লফোই', ph: 'laphoi' },
        { id: 'grapes', emoji: '🍇', name: 'অঙ্গুর', ph: 'angur' },
        { id: 'orange', emoji: '🍊', name: 'কমলা', ph: 'komla' },
        { id: 'watermelon', emoji: '🍉', name: 'তরভুজ', ph: 'tarbhuj' },
        { id: 'strawberry', emoji: '🍓', name: 'স্ট্রবেরি', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'কীহোম', ph: 'kihom' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'নোংশা', ph: 'nongsha' },
        { id: 'elephant', emoji: '🐘', name: 'সমু', ph: 'samu' },
        { id: 'tiger', emoji: '🐯', name: 'কৈ', ph: 'kei' },
        { id: 'monkey', emoji: '🐒', name: 'য়োং', ph: 'yong' },
        { id: 'rabbit', emoji: '🐰', name: 'থেবা', ph: 'theba' },
        { id: 'dog', emoji: '🐶', name: 'হুই', ph: 'hui' },
        { id: 'cat', emoji: '🐱', name: 'হৌদোং', ph: 'houdong' },
        { id: 'cow', emoji: '🐄', name: 'শন', ph: 'shan' },
        { id: 'peacock', emoji: '🦚', name: 'ৱাহোং', ph: 'wahong' },
        { id: 'panda', emoji: '🐼', name: 'পান্ডা', ph: 'panda' }
      ]
    },

    lus: {
      id: 'lus', name: 'Mizo', nativeName: 'Mizo ṭawng', locale: 'lus-IN', fallbackLocale: 'en-IN',
      isLatin: true, states: ['Mizoram'], color: '#52b788', emoji: '🎋',
      ui: {
        homeSub: 'Inkhel la, ngaithla la, zir rawh!',
        cardA: 'Hawrawppui (A–Z)', cardASub: 'Hawrawppui zirna',
        cardB: 'Hawrawpte (a–z)', cardBSub: 'Hawrawpte zirna',
        cardNumbers: '1 aṭanga 100 Number', cardNumbersSub: 'Chhiar dan zir rawh',
        cardStories: 'Thawnthu 1000 📖', cardStoriesSub: 'Offline thawnthu ngaihthlakna',
        gamesHeading: 'Infiamna Hlimawm (+10 / -5)',
        gFruit: 'Thei Man', gFruitSub: 'Thei sawi apiang bawmah man rawh',
        gBalloon: 'Ham-puar Tihkeh', gBalloonSub: 'Hawrawp dik ham-puar tikeh rawh',
        gAnimal: 'Ramsa Zawn', gAnimalSub: 'Ramsa dik hmet rawh',
        gMemory: 'A Kawp Zawn', gMemorySub: 'Card inang zawng chhuak rawh',
        back: 'Kir leh', languages: 'Ṭawngte', exit: 'Chhuahna',
        musicOn: 'Rimawi On', musicOff: 'Rimawi Off',
        stars: 'Arsi', repeat: 'Ngaithla nawn', newGame: 'Infiam thar',
        catchPrompt: '{item} man rawh!', popPrompt: '{item} tikeh rawh!', animalPrompt: '{item} hmet rawh!',
        correctList: ['A ṭha lutuk!', 'I ti ṭha e!', 'Ropui lutuk!'],
        retryList: ['Ti leh chhin rawh le!', 'Pawi lo, han en leh rawh!'],
        exitTitle: 'Chhuah i duh em?', exitMsg: 'Alphabloom aṭanga chhuah i duh tak tak em?',
        yes: 'Aw', no: 'Aih',
        storyNum: 'Thawnthu', moral: 'Zirlai pawimawh', readAloud: 'Chhiar ri 🔊', stopRead: 'Tawp ⏹️',
        prev: 'Hmasa', next: 'Dawt', random: 'Engpawh', go: 'Kal', favs: 'Duh ber',
        cats: ['Ramsa Ṭhiante', 'Mut Dawn Thawnthu', 'Huan Mak', 'Nungchang Ṭha', 'Zin Kawng'],
        memoryWin: 'Ropui lutuk! A kawp zawng zawng i hmu ta!'
      },
      lettersA: MIZO_ALPHA.cap,
      lettersB: MIZO_ALPHA.small,
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'Apple', ph: 'Apple' },
        { id: 'mango', emoji: '🥭', name: 'Theihai', ph: 'Thei-hai' },
        { id: 'banana', emoji: '🍌', name: 'Balhla', ph: 'Bal-hla' },
        { id: 'grapes', emoji: '🍇', name: 'Grep', ph: 'Grep' },
        { id: 'orange', emoji: '🍊', name: 'Serthlum', ph: 'Ser-thlum' },
        { id: 'watermelon', emoji: '🍉', name: 'Dawnfawh', ph: 'Dawn-fawh' },
        { id: 'strawberry', emoji: '🍓', name: 'Strawberry', ph: 'Strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'Lakhuihthei', ph: 'La-khuih-thei' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'Sakeibaknei', ph: 'Sa-kei-bak-nei' },
        { id: 'elephant', emoji: '🐘', name: 'Sai', ph: 'Sai' },
        { id: 'tiger', emoji: '🐯', name: 'Sakei', ph: 'Sa-kei' },
        { id: 'monkey', emoji: '🐒', name: 'Zawng', ph: 'Zawng' },
        { id: 'rabbit', emoji: '🐰', name: 'Sazupui', ph: 'Sa-zu-pui' },
        { id: 'dog', emoji: '🐶', name: 'Ui', ph: 'Oo-ee' },
        { id: 'cat', emoji: '🐱', name: 'Zawhte', ph: 'Zawh-te' },
        { id: 'cow', emoji: '🐄', name: 'Bawng', ph: 'Bawng' },
        { id: 'peacock', emoji: '🦚', name: 'Ar-awm-par', ph: 'Ar-awm-par' },
        { id: 'panda', emoji: '🐼', name: 'Panda', ph: 'Panda' }
      ]
    },

    ne: {
      id: 'ne', name: 'Nepali', nativeName: 'नेपाली', locale: 'ne-NP', fallbackLocale: 'hi-IN',
      isLatin: false, states: ['Sikkim'], color: '#9b5de5', emoji: '⛰️',
      ui: {
        homeSub: 'खेलौं, सुनौं र सिकौं!',
        cardA: 'स्वर वर्ण (अ–अः)', cardASub: 'नेपाली स्वर वर्ण सिक्नुहोस्',
        cardB: 'व्यञ्जन वर्ण (क–ज्ञ)', cardBSub: 'नेपाली व्यञ्जन वर्ण सिक्नुहोस्',
        cardNumbers: '1 देखि 100 अंक', cardNumbersSub: 'अंक सुनेर गन्न सिक्नुहोस्',
        cardStories: '1000 कथाहरू 📖', cardStoriesSub: 'अफलाइन कथा सुन्नुहोस्',
        gamesHeading: 'रमाइला खेलहरू (+10 / -5)',
        gFruit: 'फल समातौं', gFruitSub: 'सही फल टोकरीमा समात्नुहोस्',
        gBalloon: 'बेलुन फुटाऔं', gBalloonSub: 'सही अक्षरको बेलुन फुटाउनुहोस्',
        gAnimal: 'जनावर चिनौं', gAnimalSub: 'सही जनावरमा ट्याप गर्नुहोस्',
        gMemory: 'जोडा मिलाऔं', gMemorySub: 'उस्तै कार्ड जोडा मिलाउनुहोस्',
        back: 'पछाडि', languages: 'भाषाहरू', exit: 'बाहिर',
        musicOn: 'संगीत अन', musicOff: 'संगीत अफ',
        stars: 'अंक', repeat: 'फेरि सुन्नुहोस्', newGame: 'नयाँ खेल',
        catchPrompt: '{item} समात्नुहोस्!', popPrompt: '{item} फुटाउनुहोस्!', animalPrompt: '{item} मा थिच्नुहोस्!',
        correctList: ['स्याबास! धेरै राम्रो!', 'वाह! गजब!', 'सही उत्तर!'],
        retryList: ['ओहो, फेरि प्रयास गर्नुहोस्!', 'केही छैन, फेरि हेर्नुहोस्!'],
        exitTitle: 'बाहिर निस्कने?', exitMsg: 'के तपाईं साँच्चै अल्फाब्लुमबाट बाहिर निस्कन चाहनुहुन्छ?',
        yes: 'हो', no: 'होइन',
        storyNum: 'कथा', moral: 'कथाको नैतिक शिक्षा', readAloud: 'कथा सुन्नुहोस् 🔊', stopRead: 'रोक्नुहोस् ⏹️',
        prev: 'अघिल्लो', next: 'अर्को', random: 'कुनै पनि', go: 'जानुहोस्', favs: 'मनपर्ने',
        cats: ['जनावर साथी', 'सुत्ने कथा', 'जादुई बगैंचा', 'राम्रो बानी', 'साहसिक यात्रा'],
        memoryWin: 'स्याबास! सबै जोडा मिल्यो!'
      },
      lettersA: mapIndic([
        ['अ', 'अनार', '🍎', 'a - anaar'], ['आ', 'आँप', '🥭', 'aa - aanp'], ['इ', 'इँटा', '🧱', 'i - inta'],
        ['ई', 'ईश्वर', '🙏', 'ee - ishwar'], ['उ', 'उल्लू', '🦉', 'u - ullu'], ['ऊ', 'ऊन', '🧶', 'oo - oon'],
        ['ए', 'एक', '1️⃣', 'e - ek'], ['ऐ', 'ऐना', '🪞', 'ai - aina'], ['ओ', 'ओखर', '🌰', 'o - okhar'],
        ['औ', 'औषधि', '💊', 'au - aushadhi'], ['अं', 'अंगुर', '🍇', 'ang - angur']
      ]),
      lettersB: mapIndic([
        ['क', 'कमल', '🪷', 'ka - kamal'], ['ख', 'खरायो', '🐰', 'kha - kharayo'], ['ग', 'गाई', '🐄', 'ga - gaai'],
        ['घ', 'घर', '🏠', 'gha - ghar'], ['च', 'चरा', '🐦', 'cha - chara'], ['छ', 'छाता', '☂️', 'chha - chhata'],
        ['ज', 'जहाज', '🚢', 'ja - jahaj'], ['ट', 'टमाटर', '🍅', 'ta - tamatar'], ['ड', 'डमरु', '🥁', 'da - damaru'],
        ['त', 'तारा', '⭐', 'ta - tara'], ['द', 'दियो', '🪔', 'da - diyo'], ['न', 'नदी', '🌊', 'na - nadi'],
        ['प', 'परेवा', '🕊️', 'pa - parewa'], ['फ', 'फूल', '🌸', 'pha - phool'], ['ब', 'बाघ', '🐯', 'ba - baagh'],
        ['म', 'माछा', '🐟', 'ma - maachha'], ['र', 'रथ', '🛞', 'ra - rath'], ['ल', 'लड्डु', '🟡', 'la - laddu'],
        ['स', 'सूर्य', '☀️', 'sa - soorya'], ['ह', 'हात्ती', '🐘', 'ha - haatti']
      ]),
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'स्याउ', ph: 'syau' },
        { id: 'mango', emoji: '🥭', name: 'आँप', ph: 'aanp' },
        { id: 'banana', emoji: '🍌', name: 'केरा', ph: 'kera' },
        { id: 'grapes', emoji: '🍇', name: 'अंगुर', ph: 'angur' },
        { id: 'orange', emoji: '🍊', name: 'सुन्तला', ph: 'suntala' },
        { id: 'watermelon', emoji: '🍉', name: 'तरबुजा', ph: 'tarbuja' },
        { id: 'strawberry', emoji: '🍓', name: 'स्ट्रबेरी', ph: 'strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'भुइँकटहर', ph: 'bhuikatahar' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'सिंह', ph: 'sinha' },
        { id: 'elephant', emoji: '🐘', name: 'हात्ती', ph: 'haatti' },
        { id: 'tiger', emoji: '🐯', name: 'बाघ', ph: 'baagh' },
        { id: 'monkey', emoji: '🐒', name: 'बाँदर', ph: 'baandar' },
        { id: 'rabbit', emoji: '🐰', name: 'खरायो', ph: 'kharayo' },
        { id: 'dog', emoji: '🐶', name: 'कुकुर', ph: 'kukur' },
        { id: 'cat', emoji: '🐱', name: 'बिरालो', ph: 'biraalo' },
        { id: 'cow', emoji: '🐄', name: 'गाई', ph: 'gaai' },
        { id: 'peacock', emoji: '🦚', name: 'मयूर', ph: 'mayur' },
        { id: 'panda', emoji: '🐼', name: 'पाण्डा', ph: 'panda' }
      ]
    },

    trp: {
      id: 'trp', name: 'Kokborok', nativeName: 'Kokborok', locale: 'trp-IN', fallbackLocale: 'en-IN',
      isLatin: true, states: ['Tripura'], color: '#f15bb5', emoji: '🍍',
      ui: {
        homeSub: 'Thwngdi, khnadi tei swrwngdi!',
        cardA: 'Kotor Kokthai (A–Z)', cardASub: 'Kotor kokthai swrwngdi',
        cardB: 'Kisa Kokthai (a–z)', cardBSub: 'Kisa kokthai swrwngdi',
        cardNumbers: '1 simi 100 Lekha', cardNumbersSub: 'Lekha khnadi tei swrwngdi',
        cardStories: '1000 Kothoma 📖', cardStoriesSub: 'Offline kothoma khnadi',
        gamesHeading: 'Khatung Thwngmung (+10 / -5)',
        gFruit: 'Bwthai Romdi', gFruitSub: 'Kubui bwthai romdi',
        gBalloon: 'Belun Phukdi', gBalloonSub: 'Kubui kokthai phukdi',
        gAnimal: 'Mwsang Sindi', gAnimalSub: 'Kubui mwsang tap khlaidi',
        gMemory: 'Jora Milidi', gMemorySub: 'Saman card milidi',
        back: 'Kiphildi', languages: 'Kokrok', exit: 'Ongkhor',
        musicOn: 'Rwbai On', musicOff: 'Rwbai Off',
        stars: 'Athukiri', repeat: 'Taisa Khnadi', newGame: 'Kwtal Thwngmung',
        catchPrompt: '{item} romdi!', popPrompt: '{item} phukdi!', animalPrompt: '{item} tap khlaidi!',
        correctList: ['Kaham! Belai kaham!', 'Chajakha!', 'Khatungjakha!'],
        retryList: ['Taisa nainadi!', 'Mungsa ya, taisa khlaidi!'],
        exitTitle: 'Ongkhorna nai da?', exitMsg: 'Nwng Alphabloom ni ongkhorna nai da?',
        yes: 'Ou', no: 'Ya',
        storyNum: 'Kothoma', moral: 'Kothoma ni Swrwngmung', readAloud: 'Kothoma Khnadi 🔊', stopRead: 'Thakdi ⏹️',
        prev: 'Swkang', next: 'Ulo', random: 'Jephano', go: 'Thangdi', favs: 'Hamjakma',
        cats: ['Mwsang Kiching', 'Thunai Kothoma', 'Jadu Bagan', 'Kaham Habit', 'Beraimung'],
        memoryWin: 'Belai kaham! Jotono jora miliha!'
      },
      lettersA: KOKBOROK_ALPHA.cap,
      lettersB: KOKBOROK_ALPHA.small,
      fruits: [
        { id: 'apple', emoji: '🍎', name: 'Apel', ph: 'Apel' },
        { id: 'mango', emoji: '🥭', name: 'Thaichuk', ph: 'Thai-chuk' },
        { id: 'banana', emoji: '🍌', name: 'Thailik', ph: 'Thai-lik' },
        { id: 'grapes', emoji: '🍇', name: 'Angur', ph: 'Angur' },
        { id: 'orange', emoji: '🍊', name: 'Komla', ph: 'Kom-la' },
        { id: 'watermelon', emoji: '🍉', name: 'Tormuj', ph: 'Tor-muj' },
        { id: 'strawberry', emoji: '🍓', name: 'Strawberry', ph: 'Strawberry' },
        { id: 'pineapple', emoji: '🍍', name: 'Omor', ph: 'O-mor' }
      ],
      animals: [
        { id: 'lion', emoji: '🦁', name: 'Singho', ph: 'Sing-ho' },
        { id: 'elephant', emoji: '🐘', name: 'Matai', ph: 'Ma-tai' },
        { id: 'tiger', emoji: '🐯', name: 'Mosa', ph: 'Mo-sa' },
        { id: 'monkey', emoji: '🐒', name: 'Makhra', ph: 'Makh-ra' },
        { id: 'rabbit', emoji: '🐰', name: 'Khargosh', ph: 'Khar-gosh' },
        { id: 'dog', emoji: '🐶', name: 'Sui', ph: 'Soo-ee' },
        { id: 'cat', emoji: '🐱', name: 'Ami', ph: 'Aa-mi' },
        { id: 'cow', emoji: '🐄', name: 'Musuk', ph: 'Mu-suk' },
        { id: 'peacock', emoji: '🦚', name: 'Moyur', ph: 'Mo-yur' },
        { id: 'panda', emoji: '🐼', name: 'Panda', ph: 'Panda' }
      ]
    }
  };

  // Native 1-100 number words for languages without native browser TTS (Mizo, Kokborok)
  const MIZO_ONES = ['', 'pakhat', 'pahnih', 'pathum', 'pali', 'panga', 'paruk', 'pasarih', 'pariat', 'pakua'];
  const MIZO_TENS = ['', 'sawm', 'sawmhnih', 'sawmthum', 'sawmli', 'sawmnga', 'sawmruk', 'sawmsarih', 'sawmriat', 'sawmkua'];
  function mizoNumber(n) {
    if (n === 100) return 'za';
    if (n < 10) return MIZO_ONES[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return o === 0 ? MIZO_TENS[t] : `${MIZO_TENS[t]} ${MIZO_ONES[o]}`;
  }

  const TRP_ONES = ['', 'sa', 'nwi', 'tham', 'brwi', 'ba', 'dok', 'sni', 'char', 'chuku'];
  const TRP_TENS = ['', 'chi', 'khol', 'thamchi', 'brwichi', 'bachi', 'dokchi', 'snichi', 'charchi', 'chukuchi'];
  function trpNumber(n) {
    if (n === 100) return 'ra sa';
    if (n < 10) return TRP_ONES[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return o === 0 ? TRP_TENS[t] : `${TRP_TENS[t]} ${TRP_ONES[o]}`;
  }

  function getNumberTTS(langId, n) {
    if (langId === 'lus') {
      const w = mizoNumber(n);
      return { text: w, ph: w };
    }
    if (langId === 'trp') {
      const w = trpNumber(n);
      return { text: w, ph: w };
    }
    // For languages with standard TTS (en, hi, mr, te, ta, kn, ml, gu, bn, pa, or, as, ne, kok, mni),
    // passing the digit string speaks natively in the active locale, with numeric string as clean fallback.
    return { text: String(n), ph: String(n) };
  }

  const ORDER = ['en', 'hi', 'mr', 'te', 'ta', 'kn', 'ml', 'gu', 'bn', 'pa', 'or', 'as', 'kok', 'mni', 'lus', 'ne', 'trp'];

  return {
    STATES_28,
    LANGUAGES,
    ORDER,
    get(id) {
      return LANGUAGES[id] || LANGUAGES.en;
    },
    getNumberTTS
  };
})();
