import React, { useState, useEffect } from 'react';
import { ChevronRight, Book, Play, Pause, Volume2, Globe, Moon, Sun, Menu, X, Search, Star, BookOpen, Headphones, ArrowLeft } from 'lucide-react';

function App() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [verseSearchSurah, setVerseSearchSurah] = useState('1');
  const [verseSearchAyah, setVerseSearchAyah] = useState('1');
  const [searchedVerse, setSearchedVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('surahs');
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);

  const reciters = [
    { id: '1', name: 'Mishary Rashid Al Afasy', country: 'Kuwait' },
    { id: '2', name: 'Abu Bakr Al Shatri', country: 'Saudi Arabia' },
    { id: '3', name: 'Nasser Al Qatami', country: 'Saudi Arabia' },
    { id: '4', name: 'Yasser Al Dosari', country: 'Saudi Arabia' },
    { id: '5', name: 'Hani Ar Rifai', country: 'Saudi Arabia' }
  ];

  useEffect(() => {
    fetchSurahs();
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch('https://quranapi.pages.dev/api/surah.json');
      const data = await response.json();
      setSurahs(data);
    } catch (error) {
      console.error('Error fetching surahs:', error);
    }
  };

  const fetchSurahDetails = async (surahNo) => {
    setLoading(true);
    try {
      const response = await fetch(`https://quranapi.pages.dev/api/${surahNo}.json`);
      const data = await response.json();
      setSelectedSurah(data);
    } catch (error) {
      console.error('Error fetching surah details:', error);
    }
    setLoading(false);
  };

  const searchVerse = async () => {
    if (!verseSearchSurah || !verseSearchAyah) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://quranapi.pages.dev/api/${verseSearchSurah}/${verseSearchAyah}.json`);
      const data = await response.json();
      setSearchedVerse(data);
    } catch (error) {
      console.error('Error fetching verse:', error);
    }
    setLoading(false);
  };

  // const playAudio = (audioUrl) => {
  //   if (currentAudio) {
  //     currentAudio.pause();
  //   }
  //   const audio = new Audio(audioUrl);
  //   setCurrentAudio(audio);
  //   audio.play();
  //   setIsPlaying(true);
    
  //   audio.onended = () => {
  //     setIsPlaying(false);
  //   };
  // };

  // const pauseAudio = () => {
  //   if (currentAudio) {
  //     currentAudio.pause();
  //     setIsPlaying(false);
  //   }
  // };


  const playAudio = (audioUrl) => {
    console.log(audioUrl);
  if (currentAudio) {
    currentAudio.pause();
  }
  const audio = new Audio(audioUrl);
  setCurrentAudio(audio);
  setCurrentAudioUrl(audioUrl); // Add this line
  audio.play();
  setIsPlaying(true);
  
  audio.onended = () => {
    setIsPlaying(false);
    setCurrentAudioUrl(null); // Add this line
  };
};

const pauseAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    setIsPlaying(false);
    setCurrentAudioUrl(null); // Add this line
  }
};

  const getLanguageText = (data, field) => {
    if (!data) return '';
    
    switch (selectedLanguage) {
      case 'arabic':
        return data.arabic1 || '';
      case 'bengali':
        return data.bengali || '';
      case 'urdu':
        return data.urdu || '';
      default:
        return data.english || '';
    }
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.surahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.surahNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900' 
        : 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100'
    }`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-900/90 border-slate-700' 
          : 'bg-white/90 border-emerald-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
  <div className={`p-1 rounded-full ${darkMode ? 'bg-emerald-600' : 'bg-emerald-500'} shadow-lg`}>
    <img 
      src="https://static.vecteezy.com/system/resources/previews/039/673/686/non_2x/al-quran-logo-islamic-logo-illustration-and-book-logo-vector.jpg" 
      alt="Holy Quran Logo" 
      className="w-8 h-8 object-cover rounded-full"
    />
  </div>
  <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`} style={{fontFamily: 'Amiri, serif'}}>
                  القرآن الكريم
                </h1>
                <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  The Holy Quran
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedSurah && (
                <button
                  onClick={() => setSelectedSurah(null)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <option value="english">English</option>
                <option value="arabic">العربية</option>
                <option value="bengali">বাংলা</option>
                <option value="urdu">اردو</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedSurah ? (
          <div>
            {/* Hero Section with Quran Image */}
            <div className={`relative overflow-hidden rounded-3xl mb-12 ${
              darkMode 
                ? 'bg-slate-800/50 border border-slate-700' 
                : 'bg-white/70 border border-emerald-200'
            } backdrop-blur-sm`}>
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: "url('https://media.istockphoto.com/id/2062995221/photo/holy-quran.jpg?s=612x612&w=0&k=20&c=MQwGQC9D6UkxOYB-SKuL2fg_EdzzoEgQVv6gwYGnW30=')"
                }}
              ></div>
              <div className="relative p-12 text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
  darkMode ? 'bg-emerald-600' : 'bg-emerald-500'
} shadow-lg`}>
  <img 
    src="https://www.shutterstock.com/image-vector/holy-quran-islamic-book-calligraphy-600nw-281022530.jpg" 
    alt="Holy Quran Logo" 
    className="w-20 h-20 object-cover rounded-full"
  />
</div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
  darkMode ? 'text-white' : 'text-slate-800'
}`} style={{fontFamily: 'Amiri, serif', direction: 'rtl'}}>
  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
</h2>
                <p className={`text-xl mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  বিসমিল্লাহির রাহমানির রাহীম
                </p>
                <p className={`text-xl mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  In the name of Allah, the Most Gracious, the Most Merciful
                </p>
                
                {/* Navigation Tabs */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 w-full max-w-md sm:max-w-none mx-auto">
  {[
    { id: 'surahs', label: 'Surahs', icon: Book },
    { id: 'verse-search', label: 'Verse Search', icon: Search },
    { id: 'reciters', label: 'Reciters', icon: Headphones }
  ].map((tab) => {
    const Icon = tab.icon;
    return (
      <button
        key={tab.id}
        onClick={() => setActiveSection(tab.id)}
        className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl transition-all w-full sm:w-auto ${
          activeSection === tab.id
            ? (darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white')
            : (darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-white/50 hover:bg-white/70 text-slate-700')
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm sm:text-base">{tab.label}</span>
      </button>
    );
  })}
</div>
              </div>
            </div>

            {/* Surahs Section */}
            {activeSection === 'surahs' && (
              <div className="mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                  <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    All Surahs (114)
                  </h3>
                  
                  {/* Search Bar */}
                  <div className="relative w-full sm:max-w-md">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      type="text"
                      placeholder="Search Surahs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-3 rounded-xl border transition-colors w-full ${
                        darkMode 
                          ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                          : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Surahs Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSurahs.map((surah, index) => (
                    <div
                      key={index}
                      onClick={() => fetchSurahDetails(index + 1)}
                      className={`p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? 'bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700' 
                          : 'bg-white/70 hover:bg-white border border-emerald-200 hover:shadow-lg'
                      } backdrop-blur-sm group`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                      </div>
                      
                      <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {surah.surahName}
                      </h4>
                      <p className={`text-base mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`} 
                         style={{fontFamily: 'Amiri, serif', direction: 'rtl', textAlign: 'right'}}>
                        {surah.surahNameArabic}
                      </p>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {surah.surahNameTranslation}
                      </p>
                      
                      <div className="flex justify-between text-xs">
                        <span className={`px-2 py-1 rounded ${
                          darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {surah.totalAyah} Verses
                        </span>
                        <span className={`px-2 py-1 rounded ${
                          surah.revelationPlace === 'Mecca' 
                            ? (darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-700')
                            : (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700')
                        }`}>
                          {surah.revelationPlace}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verse Search Section */}
            {activeSection === 'verse-search' && (
              <div className="mb-12">
                <div className={`p-8 rounded-2xl ${
                  darkMode 
                    ? 'bg-slate-800/50 border border-slate-700' 
                    : 'bg-white/70 border border-emerald-200'
                } backdrop-blur-sm`}>
                  <h3 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Search Specific Verse
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 justify-center items-end mb-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Surah Number
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="114"
                        value={verseSearchSurah}
                        onChange={(e) => setVerseSearchSurah(e.target.value)}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Verse Number
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={verseSearchAyah}
                        onChange={(e) => setVerseSearchAyah(e.target.value)}
                        className={`px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'bg-white border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                    
                    <button
                      onClick={searchVerse}
                      disabled={loading}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        darkMode 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      } disabled:opacity-50`}
                    >
                      {loading ? 'Searching...' : 'Search Verse'}
                    </button>
                  </div>

                  {/* Searched Verse Result */}
                  {searchedVerse && (
                    <div className={`p-6 rounded-xl ${
                      darkMode 
                        ? 'bg-slate-900/50 border border-slate-600' 
                        : 'bg-emerald-50 border border-emerald-200'
                    }`}>
                      <div className="text-center mb-4">
                        <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {searchedVerse.surahName} - Verse {searchedVerse.ayahNo}
                        </h4>
                        <p className={`text-lg ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          {searchedVerse.surahNameTranslation}
                        </p>
                      </div>
                      
                      {selectedLanguage === 'arabic' && (
                        <p className={`text-2xl mb-4 text-center leading-relaxed ${
                          darkMode ? 'text-emerald-300' : 'text-emerald-700'
                        }`} style={{fontFamily: 'Amiri, serif', direction: 'rtl'}}>
                          {searchedVerse.arabic1}
                        </p>
                      )}
                      
                      <p className={`text-lg text-center leading-relaxed ${
                        darkMode ? 'text-white' : 'text-slate-800'
                      }`} style={{
                        direction: selectedLanguage === 'arabic' || selectedLanguage === 'urdu' ? 'rtl' : 'ltr',
                        fontFamily: selectedLanguage === 'bengali' ? 'Kalpurush, serif' : 'inherit'
                      }}>
                        {getLanguageText(searchedVerse, 'verse')}
                      </p>

                      {/* Audio for searched verse */}
                      {searchedVerse.audio && (
                        <div className="flex flex-wrap justify-center mt-4 gap-3">
                          {Object.entries(searchedVerse.audio).slice(0, 3).map(([id, audio]) => (
                            <button
                              key={id}
                              onClick={() => isPlaying ? pauseAudio() : playAudio(audio.url)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                darkMode 
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                              }`}
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              <span className="text-sm">{audio.reciter.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reciters Section */}
            {activeSection === 'reciters' && (
              <div className="mb-12">
                <h3 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  Featured Reciters
                </h3>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reciters.map((reciter) => (
                    <div
                      key={reciter.id}
                      className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? 'bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700' 
                          : 'bg-white/70 hover:bg-white border border-emerald-200 hover:shadow-lg'
                      } backdrop-blur-sm`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                        darkMode ? 'bg-emerald-600' : 'bg-emerald-500'
                      }`}>
                        <Headphones className="w-8 h-8 text-white" />
                      </div>
                      
                      <h4 className={`text-lg font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {reciter.name}
                      </h4>
                      <p className={`text-center text-sm mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {reciter.country}
                      </p>
                      
                      <div className="flex justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} fill-current`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Surah Detail View
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                  darkMode ? 'border-emerald-500' : 'border-emerald-600'
                }`}></div>
              </div>
            ) : (
              <div>
                {/* Surah Header with Background Image */}
                <div className={`relative overflow-hidden p-8 rounded-2xl mb-8 text-center ${
                  darkMode 
                    ? 'bg-slate-800/50 border border-slate-700' 
                    : 'bg-white/70 border border-emerald-200'
                } backdrop-blur-sm`}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80')"
                    }}
                  ></div>
                  <div className="relative">
                    <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {selectedSurah.surahName}
                    </h2>
                    <p className={`text-3xl mb-2 ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`} 
                       style={{fontFamily: 'Amiri, serif', direction: 'rtl'}}>
                      {selectedSurah.surahNameArabicLong}
                    </p>
                    <p className={`text-xl mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {selectedSurah.surahNameTranslation}
                    </p>
                    
                    <div className="flex flex-wrap justify-center items-center gap-4 text-sm mb-6">
                      <span className={`px-4 py-2 rounded-lg ${
                        darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {selectedSurah.totalAyah} Verses
                      </span>
                      <span className={`px-4 py-2 rounded-lg ${
                        selectedSurah.revelationPlace === 'Mecca' 
                          ? (darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-700')
                          : (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700')
                      }`}>
                        {selectedSurah.revelationPlace}
                      </span>
                    </div>

                    {/* Audio Controls */}
                  {selectedSurah.audio && (
  <div className="flex flex-wrap justify-center gap-4 p-4">
    {Object.entries(selectedSurah.audio).map(([id, audio]) => {
      const isCurrentlyPlaying = currentAudioUrl === audio.url && isPlaying;
      
      return (
        <div
          key={id}
          className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
            darkMode 
              ? 'bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600' 
              : 'bg-gradient-to-r from-white to-gray-50 border border-gray-200'
          } ${isCurrentlyPlaying ? 'shadow-lg scale-105' : 'hover:shadow-md hover:scale-102'}`}
        >
          {/* Audio Visualizer Background */}
          {isCurrentlyPlaying && (
            <div className="absolute inset-0 flex items-end justify-center gap-1 p-4 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`bg-emerald-400 rounded-full animate-pulse`}
                  style={{
                    width: '3px',
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: `${Math.random() * 500 + 500}ms`
                  }}
                />
              ))}
            </div>
          )}
          
          <button
            onClick={() => {
              if (isCurrentlyPlaying) {
                pauseAudio();
              } else {
                setCurrentAudioUrl(audio.url);
                playAudio(audio.url);
              }
            }}
            className={`relative z-10 flex items-center space-x-3 px-6 py-4 w-full transition-all duration-200 ${
              darkMode 
                ? 'text-white hover:bg-slate-700/50' 
                : 'text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {/* Play/Pause Button with Glow Effect */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              isCurrentlyPlaying
                ? darkMode
                  ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                  : 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                : darkMode
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}>
              {isCurrentlyPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </div>
            
            {/* Reciter Info */}
            <div className="flex flex-col items-start">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {audio.reciter.split(' ')[0]}
              </span>
              <span className={`text-xs ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>
                Reciter
              </span>
            </div>
            
            {/* Audio Waves Animation */}
            {isCurrentlyPlaying && (
              <div className="flex items-center space-x-1 ml-auto">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-emerald-400 rounded-full animate-bounce`}
                    style={{
                      height: `${Math.random() * 16 + 8}px`,
                      animationDelay: `${i * 150}ms`,
                      animationDuration: '0.8s'
                    }}
                  />
                ))}
              </div>
            )}
          </button>
        </div>
      );
    })}
  </div>
)}
                  </div>
                </div>

                                {/* Verses */}
          <div className="space-y-6">
        {selectedSurah.english && selectedSurah.english.map((verse, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl ${
              darkMode
                ? 'bg-slate-800/50 border border-slate-700'
                : 'bg-white/70 border border-emerald-200'
            } backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {index + 1}
              </div>
            </div>
            
            {/* Upper line: Selected language verse */}
            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-white' : 'text-slate-800'
            }`} style={{
              direction: selectedLanguage === 'arabic' || selectedLanguage === 'urdu' ? 'rtl' : 'ltr',
              fontFamily: selectedLanguage === 'arabic' ? 'Amiri, serif' : selectedLanguage === 'bengali' ? 'Kalpurush, serif' : 'inherit',
              textAlign: selectedLanguage === 'arabic' ? 'right' : 'left'
            }}>
              {selectedLanguage === 'bengali' && selectedSurah.bengali ? selectedSurah.bengali[index] :
               selectedLanguage === 'urdu' && selectedSurah.urdu ? selectedSurah.urdu[index] :
               selectedLanguage === 'arabic' && selectedSurah.arabic1 ? selectedSurah.arabic1[index] :
               verse}
            </p>
            
            {/* Lower line: Bengali verse (always shown, regular font) */}
            {selectedSurah.bengali && (
              <p className={`text-lg leading-relaxed font-normal mt-2 ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`} style={{
                direction: 'ltr',
                fontFamily: 'Kalpurush, serif',
                textAlign: 'left'
              }}>
                {selectedSurah.bengali[index]}
              </p>
            )}
          </div>
        ))}
      </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`mt-16 py-12 ${
        darkMode
          ? 'bg-slate-900/50 border-t border-slate-700'
          : 'bg-white/50 border-t border-emerald-200'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div
              className="mx-auto w-32 h-20 bg-cover bg-center rounded-lg mb-4 opacity-80"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1564769625392-651b2c3c4fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')"
              }}
            ></div>
          </div>
         
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                About Al-Quran
              </h4>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                The Holy Quran is the final revelation from Allah, preserved in its original form.
                Read, listen, and reflect upon the divine guidance.
              </p>
            </div>
           
            <div>
              <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Features
              </h4>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>• 114 Complete Surahs</li>
                <li>• Multiple Languages</li>
                <li>• Audio Recitations</li>
                <li>• Verse Search</li>
                <li>• Dark/Light Mode</li>
              </ul>
            </div>
           
            <div>
              <h4 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Languages
              </h4>
              <ul className={`text-sm space-y-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>• Arabic (العربية)</li>
                <li>• English</li>
                <li>• Bengali (বাংলা)</li>
                <li>• Urdu (اردو)</li>
              </ul>
            </div>
          </div>
         
          <div className={`pt-8 border-t ${
            darkMode ? 'border-slate-700' : 'border-emerald-200'
          }`}>
       <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} style={{fontFamily: 'Amiri, serif', direction: 'rtl'}}>
  رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
</p>
<p className={`text-xs mt-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
  "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing." - Al-Baqarah 2:127
</p>
<div className={`flex items-center justify-center mt-4 pt-3 border-t ${darkMode ? 'border-slate-600' : 'border-slate-300'}`}>
  <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
    Developed by{' '}
    <a 
      href="https://github.com/Apurba3036" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`font-medium transition-colors hover:underline ${
        darkMode 
          ? 'text-emerald-400 hover:text-emerald-300' 
          : 'text-emerald-600 hover:text-emerald-700'
      }`}
    >
      Nazmus Sakib Apurba
    </a>
  </p>
</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;