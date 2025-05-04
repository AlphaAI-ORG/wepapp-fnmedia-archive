
import { FileText } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const Sidebar = ({ onYearSelect }: { onYearSelect: (year: number) => void }) => {
  const [filter, setFilter] = useState("");
  
  // 원본 이미지에 맞게 1965년부터 1995년까지 항목 생성
  const years = Array.from({ length: 31 }, (_, i) => 1965 + i);
  
  const filteredYears = years.filter(year => 
    year.toString().includes(filter)
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18"></path>
          </svg>
        </button>
      </div>
      <ScrollArea className="h-[calc(100vh-40px-56px)]">
        <div>
          {filteredYears.map(year => (
            <div 
              key={year} 
              className="flex items-center p-3 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onYearSelect(year)}
            >
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700">{year} Letter</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
