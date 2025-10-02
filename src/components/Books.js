import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink } from 'lucide-react';

const Books = ({ darkMode }) => {
  const [searchBook, setSearchBook] = useState('');
  const [books, setBooks] = useState([]);

  React.useEffect(() => {
    // Fetch books from your JSON file
    fetch('/assets/Book.json')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Error loading books:', err));
  }, []);

  return (
    <div className="mb-12">
      <div className={`p-8 rounded-2xl ${
        darkMode 
          ? 'bg-slate-800/50 border border-slate-700' 
          : 'bg-white/70 border border-emerald-200'
      } backdrop-blur-sm`}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-emerald-600' : 'bg-emerald-500'
            }`}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            Islamic Books Collection
          </h3>
          <p className={`text-sm max-w-2xl mx-auto ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Explore our vast collection of Islamic books covering various topics including Seerah, Fiqh, and Islamic history.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto mb-12">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
          <input
            type="text"
            placeholder="Search Books..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className={`pl-10 pr-4 py-3 rounded-xl border transition-colors w-full ${
              darkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
            }`}
          />
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books
            .filter(book => 
              book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
              book.author.toLowerCase().includes(searchBook.toLowerCase())
            )
            .map((book) => (
              <div
                key={book.id}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-slate-700/50 hover:bg-slate-700 border border-slate-600' 
                    : 'bg-white hover:shadow-lg border border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-emerald-600' : 'bg-emerald-500'
                  }`}>
                    <span className="text-white font-bold">{book.id}</span>
                  </div>
                </div>

                <h4 className={`text-lg font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {book.title}
                </h4>

                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  By: {book.author}
                </p>

                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  <span>Read Book</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {books.filter(book => 
          book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
          book.author.toLowerCase().includes(searchBook.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              No books found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;