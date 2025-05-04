
import { FileText } from "lucide-react";

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

interface DocumentViewerProps {
  document: SearchResult | null;
}

const DocumentViewer = ({ document }: DocumentViewerProps) => {
  if (!document) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a document to view its content
      </div>
    );
  }

  const renderContent = () => {
    if (!document.content) return null;
    
    const paragraphs = document.content.split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (document.highlightedParagraph && paragraph.includes(document.highlightedParagraph)) {
        // Find the index of the highlighted paragraph within this paragraph
        const start = paragraph.indexOf(document.highlightedParagraph);
        const end = start + document.highlightedParagraph.length;
        
        if (start !== -1) {
          return (
            <div key={index} className="mb-6">
              <div className="border-2 border-yellow-400 p-4 rounded-md bg-yellow-50">
                <p className="text-gray-800 leading-relaxed">
                  {document.highlightedParagraph}
                </p>
              </div>
            </div>
          );
        }
      }
      return (
        <p key={index} className="mb-6 text-gray-800 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 mr-3 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-800">{document.year} {document.title}</h1>
        </div>
        
        <div className="text-sm text-sky-500 font-medium mb-4">{document.category}</div>
        
        <div className="max-w-none leading-relaxed text-gray-800 space-y-2">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
