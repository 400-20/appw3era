export interface Tool {
  id: number;
  title: string;
  slug_link: string;
  image: string;
  image_alt: string;
}

export interface ToolBody {
  // Define the structure of tool body here
  // For example:
  description: string;
  instructions: string;
}

export interface ToolResult {
  // Define the structure of tool result here
  // For example:
  id: number;
  Page: string;
  Status: string;
}

