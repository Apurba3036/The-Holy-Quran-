import React from 'react';

const HadithBook = ({ book, onSelectLanguage, darkMode }) => {
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
            onClick={() => onSelectLanguage(collection.linkmin)}
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