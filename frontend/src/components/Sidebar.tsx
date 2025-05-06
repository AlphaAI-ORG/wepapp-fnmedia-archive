import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { DocumentItem } from "../types/document";

const Sidebar = ({ onDocumentSelect }: { onDocumentSelect: (doc: DocumentItem) => void }) => {
  const [filter, setFilter] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    fetch("/api/documents/list/")
      .then(res => res.json())
      .then(setDocuments)
      .catch(err => console.error("문서 목록 가져오기 실패:", err));
  }, []);

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-[233px] border-r h-[calc(100vh-40px)] bg-gray-50">
      <div className="p-3 border-b flex items-center">
        <input
          type="text"
          className="w-full border p-2 text-sm rounded"
          placeholder="Filter by title..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="ml-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18"></path>
          </svg>
        </button>
      </div>

      <ScrollArea className="h-[calc(100vh-40px-56px)]">
        <div>
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center p-3 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onDocumentSelect(doc)}
            >
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700">
                {doc.title}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
