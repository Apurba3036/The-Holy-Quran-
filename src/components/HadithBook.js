import React from 'react';

const HadithBook = ({ book, onSelectLanguage, darkMode }) => {
  const scrollToHadiths = async (linkmin) => {
    await onSelectLanguage(linkmin);
    // Wait for content to load then scroll
    setTimeout(() => {
      const hadithSection = document.getElementById('hadith-collection');
      if (hadithSection) {
        const yOffset = -100; // Offset to account for any fixed headers
        const y = hadithSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 500); // Small delay to ensure content is loaded
  };

  return (
    <div className={`p-6 rounded-xl ${
      darkMode 
        ? 'bg-slate-800/50 border border-slate-700' 
        : 'bg-white/70 border border-emerald-200'
    } backdrop-blur-sm`}>
      <h4 className={`text-xl font-bold mb-4 ${
        darkMode ? 'text-white' : 'text-slate-800'
      }`}>
        {book.name}
      </h4>

      <div className="grid grid-cols-2 gap-2">
        {book.collections.map((collection) => (
          <button
            key={collection.name}
            onClick={() => scrollToHadiths(collection.linkmin)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              darkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-white hover:bg-gray-50 text-slate-800 border border-slate-200'
            }`}
          >
            {collection.language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HadithBook;