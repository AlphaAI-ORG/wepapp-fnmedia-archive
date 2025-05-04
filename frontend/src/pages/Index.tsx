
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";
import SearchResults from "../components/SearchResults";
import DocumentViewer from "../components/DocumentViewer";

interface SearchResult {
  id: number;
  year: number;
  title: string;
  category: string;
  preview: string;
  similarity: number;
  content?: string;
  highlightedParagraph?: string;
}

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'documents' | 'search' | 'home'>('home');
  const [selectedDocument, setSelectedDocument] = useState<SearchResult | null>(null);
  const location = useLocation();

  // Reset selectedYear when the URL changes to root
  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedYear(null);
    }
  }, [location.pathname]);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setActiveView('documents');
    setSelectedDocument(null); // Clear any selected search result
  };

  const handleSearchClick = () => {
    setActiveView('search');
    setSearchQuery(""); // Clear search query when switching to search view
    setSelectedYear(null); // Clear selected year when showing search
    setSelectedDocument(null); // Clear any selected search result
  };

  const handleFileTextClick = () => {
    setActiveView('documents');
    setSelectedDocument(null); // Clear any selected search result
    if (selectedYear === null) {
      // If no year is selected, keep sidebar visible showing documents list
      setSidebarOpen(true);
    }
  };

  const handleHomeClick = () => {
    setSelectedYear(null); // Reset selected year to show the main content
    setActiveView('home');
    setSelectedDocument(null); // Clear any selected search result
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    setSelectedDocument(result);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        onSearchClick={handleSearchClick} 
        onHomeClick={handleHomeClick}
        onToggleSidebar={handleToggleSidebar}
        onFileTextClick={handleFileTextClick}
        sidebarOpen={sidebarOpen}
        activeView={activeView}
      />
      <div className="flex flex-1 overflow-hidden">
        <div 
          className={`${sidebarOpen ? 'w-[233px]' : 'w-0'} border-r h-[calc(100vh-40px)] bg-gray-50 transition-all duration-300 overflow-hidden`}
        >
          {activeView === 'search' ? (
            <SearchResults 
              isVisible={true} 
              query={searchQuery}
              setQuery={setSearchQuery}
              onResultClick={handleSearchResultClick}
            />
          ) : (
            <Sidebar onYearSelect={handleYearSelect} />
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          {selectedDocument ? (
            <DocumentViewer document={selectedDocument} />
          ) : (
            <ContentArea 
              selectedYear={selectedYear} 
              sidebarOpen={sidebarOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
