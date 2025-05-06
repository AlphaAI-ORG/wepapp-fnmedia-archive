// 메인 화면

interface ContentAreaProps {
  sidebarOpen: boolean;
}

const ContentArea = ({ sidebarOpen }: ContentAreaProps) => {
  return (
    <div className={`flex-1 overflow-y-auto h-[calc(100vh-40px)] transition-all duration-300 ${sidebarOpen ? '' : 'ml-0'}`}>
      <div className="max-w-[800px] mx-auto py-8 px-4">
        <div className="relative mb-8">
          <img
            src="/lovable-uploads/cb9cf200-45b0-49b0-9ed6-077d668ae9cc.png"
            alt="Warren Buffett and Charlie Munger"
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-300"></div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">에프엔미디어 아카이브</h1>

        <p className="mb-6 leading-relaxed text-gray-800">
          에프엔미디어 아카이브는 에프엔미디어의 사내 검색 엔진으로, 검색 엔진의 데이터베이스는 에프엔미디어 도서 일부를 포함하고 있습니다.
          검색 엔진은 키워드 검색 및 의미 검색을 모두 지원합니다.
        </p>

        <p className="leading-relaxed text-gray-800">
          왼쪽 사이드바 상단의 검색 창에서 문서를 검색할 수 있으며 특정 문서를 선택하면 문서 원본을 확인할 수 있습니다.
          특정 문구로 도서를 검색할 경우 관련 있는 문단 영역을 노란색으로 표시합니다.
        </p>
      </div>
    </div>
  );
};

export default ContentArea;
