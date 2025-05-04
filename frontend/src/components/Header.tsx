
import { Home, FileText, Search, ArrowLeft, ArrowRight } from "lucide-react";

interface HeaderProps {
  onSearchClick: () => void;
  onHomeClick: () => void;
  onFileTextClick: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  activeView: 'documents' | 'search' | 'home';
}

const Header = ({ 
  onSearchClick, 
  onHomeClick, 
  onFileTextClick,
  onToggleSidebar, 
  sidebarOpen,
  activeView 
}: HeaderProps) => {

  return (
    <div className="flex border-b">
      <div className="w-[58.25px] border-r">
        <div 
          className="h-[40px] flex items-center justify-center cursor-pointer"
          onClick={onHomeClick}
        >
          <Home className="h-5 w-5 text-sky-500" />
        </div>
      </div>
      <div className="flex h-[40px] justify-between flex-grow">
        <div className="flex">
          <div 
            className={`h-full w-[58.25px] flex items-center justify-center border-r cursor-pointer ${activeView === 'documents' ? 'bg-gray-100' : ''}`}
            onClick={onFileTextClick}
          >
            <FileText className={`h-5 w-5 ${activeView === 'documents' ? 'text-gray-700' : 'text-gray-500'}`} />
          </div>
          <div 
            className={`h-full w-[58.25px] flex items-center justify-center border-r cursor-pointer ${activeView === 'search' ? 'bg-gray-100' : ''}`}
            onClick={onSearchClick}
          >
            <Search className={`h-5 w-5 ${activeView === 'search' ? 'text-gray-700' : 'text-gray-500'}`} />
          </div>
          <div 
            className="h-full w-[58.25px] flex items-center justify-center border-r cursor-pointer"
            onClick={onToggleSidebar}
          >
            {sidebarOpen ? (
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            ) : (
              <ArrowRight className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center flex-grow">
          <img 
            src="/lovable-uploads/f1af2011-82ae-42c5-98c9-6f2a98385b2b.png" 
            alt="F&M 에프엔미디어" 
            className="h-6" 
          />
        </div>
        
        <div className="w-[58.25px]"></div>
      </div>
    </div>
  );
};

export default Header;
