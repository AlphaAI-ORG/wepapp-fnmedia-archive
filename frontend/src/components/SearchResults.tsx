import { FileText, Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { DocumentItem } from "../types/document";


interface SearchResultsProps {
  isVisible: boolean;
  query: string;
  setQuery: (query: string) => void;
  onResultClick: (result: DocumentItem) => void;
}

const SearchResults = ({ isVisible, query, setQuery, onResultClick }: SearchResultsProps) => {
  const [hasSearched, setHasSearched] = useState(false);

  // Reset hasSearched when query is cleared
  useEffect(() => {
    if (query === '') {
      setHasSearched(false);
    }
  }, [query]);

  // Mock data that matches the image
  const searchResults: DocumentItem[] = [
    {
      id: 1,
      title: "1998 Letter",
      url: "/media/documents/letter.pdf",
      preview: "The growth of our Home Fabrics Division over the past few years is, in large part, due to our development of both new products and new...",
      similarity: 0.843,
      content: `To the Shareholders of
Berkshire Hathaway Inc.:

The fiscal year ended October 2, 1966 resulted in net earnings of $679206 as compared to
net earnings of $125586 for the prior year. These net earnings do not reflect any nonrecurring
losses incurred on the disposal of assets due to the permanent closing of the King Philip Plants
A and E in Fall River, Massachusetts, as such losses have been charged to a reserve previously
established for such purpose.

Because of loss carryovers, no federal income taxes were payable by the Corporation with
respect to either of these years; however, to prevent any misleading interpretation of future
earnings when loss carryovers shall not be available, the Corporation has included in
computing net earnings for 1966 and 1965 a charge substantially equal to the federal income
taxes that would have been payable with respect to results of operations during each of these
years.

The Corporation is continuing to operate King Philip Plant D in Warren, Rhode Island, and
the Hathaway Synthetic, Box Loom and Home Fabrics Divisions in New Bedford,
Massachusetts.

The growth of our Home Fabrics Division over the past few years is, in large part, due to our development of both new products and new markets. We have been exploring other opportunities to broaden our product line further.

During 1966 raw material, stock in process and cloth inventories were decreased by $1,411,967
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
and efforts have helped to make this year successful.`,
      highlightedParagraph: "The growth of our Home Fabrics Division over the past few years is, in large part, due to our development of both new products and new markets. We have been exploring other opportunities to broaden our product line further."
    },
    {
      id: 2,
      title: "1968 Letter",
      url: "/media/documents/letter.pdf",
      preview: "Sales volume increased about 14% with good gains in both Home Fabrics and Menswear Linings. Over the years, these have been our...",
      similarity: 0.763,
      content: `To the Shareholders of
Berkshire Hathaway Inc.:

The fiscal year ended October 2, 1968 resulted in net earnings of $879206 as compared to
net earnings of $775586 for the prior year.

Sales volume increased about 14% with good gains in both Home Fabrics and Menswear Linings. Over the years, these have been our most consistent operations in terms of profitability and growth potential.

Because of our success in these areas, we have allocated additional capital expenditures toward expanding these operations while continuing to rationalize our other textile operations.

The Corporation has continued to invest in new machinery and equipment, spending approximately $1,250,000 during the fiscal year. These investments have been targeted primarily at our most profitable divisions to further enhance their competitive position.

All divisions currently have substantial backlogs of unfilled orders, and we anticipate that operations for the coming year will continue to be profitable.`,
      highlightedParagraph: "Sales volume increased about 14% with good gains in both Home Fabrics and Menswear Linings. Over the years, these have been our most consistent operations in terms of profitability and growth potential."
    },
    {
      id: 3,
      title: "1967 Letter",
      url: "/media/documents/letter.pdf",
      preview: "Total sales showed a decline from $49.4 million in fiscal 1966 to $39 million in fiscal 1967. The cause of the drop in dollar volume...",
      similarity: 0.720,
      content: `To the Shareholders of
Berkshire Hathaway Inc.:

The fiscal year ended October 2, 1967 resulted in net earnings of $779206 as compared to
net earnings of $679206 for the prior year.

Total sales showed a decline from $49.4 million in fiscal 1966 to $39 million in fiscal 1967. The cause of the drop in dollar volume was primarily due to our strategic decision to exit certain unprofitable product lines.

Despite the lower sales figure, our profitability improved significantly as we focused our resources on our most profitable divisions. The concentration of our activities in higher-margin products has allowed us to generate more profit from less revenue.

During the year, we completed the liquidation of our unprofitable plants as planned, and we are now operating with a more streamlined and efficient production structure.

We anticipate that the coming year will show continued improvement in profitability as we benefit from the full effect of our restructuring efforts.`,
      highlightedParagraph: "Total sales showed a decline from $49.4 million in fiscal 1966 to $39 million in fiscal 1967. The cause of the drop in dollar volume was primarily due to our strategic decision to exit certain unprofitable product lines."
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="h-full w-full flex flex-col">
      <form onSubmit={handleSearch} className="p-3 border-b flex items-center">
        <Input
          type="text"
          placeholder="Search documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <button type="submit" className="ml-2 cursor-pointer" aria-label="Search">
          <Search className="h-5 w-5 text-gray-500" />
        </button>
      </form>

      <ScrollArea className="flex-1">
        {!hasSearched ? (
          <div className="p-4 text-center">
            <p className="text-gray-500 mb-4">
              Try searching for something by keyword, topic, or more. Examples include:
            </p>
            <div className="space-y-3 max-w-md mx-auto">
              <div className="border p-4 rounded-md text-gray-500">Evaluating a business</div>
              <div className="border p-4 rounded-md text-gray-500">How does Berkshire think about compensation?</div>
              <div className="border p-4 rounded-md text-gray-500">What were Berkshire's biggest mistakes?</div>
              <div className="border p-4 rounded-md text-gray-500">The story of Rose Blumkin</div>
            </div>
          </div>
        ) : (
          <div className="py-2">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="border-b px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => onResultClick(result)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium mb-1">{result.title}</div>
                    {result.preview && (
                      <p className="text-xs text-gray-600 line-clamp-3">{result.preview}</p>
                    )}
                  </div>
                  {typeof result.similarity === "number" && (
                    <div className="bg-green-100 rounded px-2 py-1 text-xs font-medium ml-2">
                      {result.similarity.toFixed(3)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SearchResults;
