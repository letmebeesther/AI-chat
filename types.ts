export interface Message {
  id: string;
  author: 'user' | 'ai';
  content: string;
  isLoading?: boolean;
  error?: string | null;
}

// FIX: Add the missing 'Genre' interface to resolve the compilation error in constants.ts.
export interface Genre {
  name: string;
  emoji: string;
  description: string;
}
