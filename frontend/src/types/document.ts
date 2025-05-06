export interface DocumentItem {
    id: number;
    title: string;
    url: string;
    similarity?: number;
    preview?: string;
    content?: string;
    highlightedParagraph?: string;
}