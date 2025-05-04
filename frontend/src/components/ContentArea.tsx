import { FileText } from "lucide-react";

interface ContentAreaProps {
  selectedYear: number | null;
  sidebarOpen: boolean;
}

const ContentArea = ({ selectedYear, sidebarOpen }: ContentAreaProps) => {
  const getDocumentContent = (year: number) => {
    return {
      title: `${year} Letter to Shareholders`,
      date: `November 9, ${year}`,
      content: `To the Shareholders of
Berkshire Hathaway Inc.:

The fiscal year ended October 2, ${year} resulted in net earnings of $${(year - 1960) * 100000 + 279206} as compared to
net earnings of $${(year - 1961) * 100000 + 25586} for the prior year. These net earnings do not reflect any nonrecurring
losses incurred on the disposal of assets due to the permanent closing of the King Philip Plants
A and E in Fall River, Massachusetts, as such losses have been charged to a reserve previously
established for such purpose.

Because of loss carryovers, no federal income taxes were payable by the Corporation with
respect to either of these years; however, to prevent any misleading interpretation of future
earnings when loss carryovers shall not be available, the Corporation has included in
computing net earnings for ${year} and ${year - 1} a charge substantially equal to the federal income
taxes that would have been payable with respect to results of operations during each of these
years.

The Corporation is continuing to operate King Philip Plant D in Warren, Rhode Island, and
the Hathaway Synthetic, Box Loom and Home Fabrics Divisions in New Bedford,
Massachusetts.

During ${year} raw material, stock in process and cloth inventories were decreased by $1,411,967
and bank loans of $2,500,000 were paid off. Also, during the year the Corporation purchased
120,231 of its own shares, leaving a total of 1,017,547 shares outstanding at the end of the
fiscal year.

The Corporation made a substantial reduction in its overhead costs during the fiscal year just
ended. Approximately $811,812 was invested by the Corporation during the year in the
purchase of new machinery in a continuing effort to reduce costs and to improve quality. This
program will continue during the current fiscal year.

A major portion of the machinery at King Philip Plant E Division has been sold. We expect to
dispose of the remaining portion of this plant during the current fiscal year. This will complete
the liquidation of our unprofitable plants. The proposed sale of the King Philip E Division will
make it necessary to provide storage for raw cotton and grey cloth for the King Philip D
Division at the Hathaway Division Plant G (former Langshaw Mill). Plans are under way to
accomplish this within the current fiscal year.

After more than fifty years of service, Mr. Seabury Stanton resigned as a director and as
President and Mr. Kenneth V. Chace was elected to succeed him. At the same time, Mr. John
K. Stanton resigned as a director and as Treasurer and Clerk. Mr. Harold V. Banks was elected
to succeed him as Treasurer and Clerk.

All divisions of the Corporation currently have substantial backlogs of unfilled orders and we
presently anticipate that operations for the coming year will continue to be profitable.

We wish to express our thanks to all the employees of the Corporation whose loyal cooperation
and efforts have helped to make this year successful.`
    };
  };

  return (
    <div className={`flex-1 overflow-y-auto h-[calc(100vh-40px)] transition-all duration-300 ${sidebarOpen ? '' : 'ml-0'}`}>
      <div className="max-w-[800px] mx-auto py-8 px-4">
        {!selectedYear ? (
          <>
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
            </p>
            
            <p className="leading-relaxed text-gray-800">
              검색 엔진은 키워드 검색 및 의미 검색을 모두 지원합니다. 원족 사이트나 상단의 검색 창에서 문서를 검색할 수 있으며 특정 문서를 선택하면 분류 전체를 오픈했을 때 확인할 수 있습니다.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 mr-3 text-gray-700" />
              <h1 className="text-3xl font-bold text-gray-800">{getDocumentContent(selectedYear).title}</h1>
            </div>
            
            <div className="max-w-none leading-relaxed text-gray-800 space-y-6">
              <div className="mb-2">{getDocumentContent(selectedYear).date}</div>
              
              {getDocumentContent(selectedYear).content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentArea;
