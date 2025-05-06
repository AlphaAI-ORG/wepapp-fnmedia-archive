import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";
import SearchResults from "../components/SearchResults";
import DocumentViewer from "../components/DocumentViewer";
import { DocumentItem } from "../types/document";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<"documents" | "search" | "home">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedDocument(null);
      setActiveView("home");
    }
  }, [location.pathname]);

  const handleSearchClick = () => {
    setActiveView("search");
    setSearchQuery("");
    setSelectedDocument(null);
  };

  const handleFileTextClick = () => {
    setActiveView("documents");
    setSelectedDocument(null);
  };

  const handleHomeClick = () => {
    setActiveView("home");
    setSelectedDocument(null);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchResultClick = (result: DocumentItem) => {
    setSelectedDocument(result);
  };

  const handleDocumentSelect = (doc: DocumentItem) => {
    // mock API 호출
    fetch(`/api/documents/${doc.id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch mock document");
        return res.json();
      })
      .then((fullDoc) => {
        setSelectedDocument(fullDoc);
        setActiveView("documents");
      })
      .catch((err) => {
        console.error("문서 mock 데이터 불러오기 실패:", err);
      });
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
          className={`${sidebarOpen ? "w-[233px]" : "w-0"
            } border-r h-[calc(100vh-40px)] bg-gray-50 transition-all duration-300 overflow-hidden`}
        >
          {activeView === "search" ? (
            <SearchResults
              isVisible={true}
              query={searchQuery}
              setQuery={setSearchQuery}
              onResultClick={handleSearchResultClick}
            />
          ) : (
            <Sidebar onDocumentSelect={handleDocumentSelect} />
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          {selectedDocument ? (
            <DocumentViewer document={selectedDocument} />
          ) : activeView === "home" ? (
            <ContentArea sidebarOpen={sidebarOpen} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a document from the sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
