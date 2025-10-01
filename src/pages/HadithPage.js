import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';

const HadithPage = ({ darkMode }) => {
  const [searchHadith, setSearchHadith] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hadithCollection, setHadithCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const hadithsPerPage = 10;
  const navigate = useNavigate();
  const { url } = useParams();

  React.useEffect(() => {
    const fetchHadith = async () => {
      try {
        const decodedUrl = decodeURIComponent(url);
        const response = await fetch(decodedUrl);
        const data = await response.json();
        setHadithCollection(data);
      } catch (error) {
        console.error('Error fetching hadith:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHadith();
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          darkMode ? 'border-emerald-500' : 'border-emerald-600'
        }`}></div>
      </div>
    );
  }

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className={`p-8 rounded-2xl ${
        darkMode 
          ? 'bg-slate-800/50 border border-slate-700' 
          : 'bg-white/70 border border-emerald-200'
      } backdrop-blur-sm`}>
        {/* Back Button and Title */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              darkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            {hadithCollection?.metadata?.name}
          </h1>
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
            hadithCollection.hadiths.filter(hadith => 
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
                direction: hadithCollection.metadata.direction,
                fontFamily: hadithCollection.metadata.direction === 'rtl' ? 'Amiri, serif' : 'inherit',
                textAlign: hadithCollection.metadata.direction === 'rtl' ? 'right' : 'left'
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
            Page {currentPage} of {Math.ceil(hadithCollection.hadiths.length / hadithsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage >= Math.ceil(hadithCollection.hadiths.length / hadithsPerPage)}
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
    </div>
  );
};

export default HadithPage;