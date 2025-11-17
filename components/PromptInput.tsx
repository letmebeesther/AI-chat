import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 p-4">
      <div className="relative flex items-center">
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="w-full p-3 pr-12 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 resize-none text-slate-200"
          rows={1}
          style={{ maxHeight: '120px' }}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt}
          className="absolute right-2 bg-indigo-600 text-white rounded-md p-2 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};