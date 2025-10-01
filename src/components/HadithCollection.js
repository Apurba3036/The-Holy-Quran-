import React from 'react';
import { Search } from 'lucide-react';

const HadithCollection = ({ 
  collection, 
  searchHadith, 
  setSearchHadith, 
  currentPage, 
  setCurrentPage, 
  hadithsPerPage,
  darkMode 
}) => {
  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  return (
    <div className="mt-8">
      {/* Book Title */}
      <div className="mb-8 text-center">
        <h3 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-slate-800'
        }`}>
          {collection.metadata.name}
        </h3>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto mb-8">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`} />
        <input
          type="text"
          placeholder="Search Hadith..."
          value={searchHadith}
          onChange={(e) => setSearchHadith(e.target.value)}
          className={`pl-10 pr-4 py-3 rounded-xl border w-full ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 text-white' 
              : 'bg-white border-slate-300 text-slate-800'
          }`}
        />
      </div>

      {/* Hadiths */}
      <div className="space-y-6">
        {paginate(
          collection.hadiths.filter(hadith => 
            hadith.text.toLowerCase().includes(searchHadith.toLowerCase())
          ),
          hadithsPerPage,
          currentPage
        ).map((hadith) => (
          <div
            key={hadith.hadithnumber}
            className={`p-6 rounded-xl ${
              darkMode 
                ? 'bg-slate-700/50' 
                : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full">
                {hadith.hadithnumber}
              </span>
              {hadith.grades && (
                <div className="flex flex-wrap gap-2">
                  {hadith.grades.map((grade, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded-full ${
                        darkMode 
                          ? 'bg-slate-600 text-white' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {grade.name}: {grade.grade}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-white' : 'text-slate-800'
            }`} style={{
              direction: 'rtl',
              fontFamily: 'Amiri, serif',
              textAlign: 'right'
            }}>
              {hadith.text}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-slate-700 text-white disabled:bg-slate-800 disabled:text-slate-600' 
              : 'bg-white text-slate-800 disabled:bg-slate-100 disabled:text-slate-400'
          }`}
        >
          Previous
        </button>
        <span className={`px-4 py-2 ${
          darkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Page {currentPage} of {Math.ceil(collection.hadiths.length / hadithsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage >= Math.ceil(collection.hadiths.length / hadithsPerPage)}
          className={`px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-slate-700 text-white disabled:bg-slate-800 disabled:text-slate-600' 
              : 'bg-white text-slate-800 disabled:bg-slate-100 disabled:text-slate-400'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HadithCollection;