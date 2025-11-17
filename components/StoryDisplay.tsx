import React, { useEffect, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Message } from '../types';

interface StoryDisplayProps {
  messages: Message[];
}

const Placeholder: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <h3 className="text-xl font-semibold text-slate-400">AI Chat Assistant</h3>
      <p>How can I help you today? Ask me anything!</p>
    </div>
);

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.author === 'user';

  const formattedContent = message.content.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4 last:mb-0">
      {paragraph}
    </p>
  ));
  
  return (
    <div className={`flex items-end gap-2 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 font-bold text-lg">
                AI
            </div>
        )}
        <div className={`max-w-xl rounded-xl p-4 shadow-md ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-300 rounded-bl-none'}`}>
          {message.isLoading ? (
            <div className="flex items-center justify-center p-4">
                <LoadingSpinner />
            </div>
          ) : message.error ? (
            <div className="text-red-400">
                <p className="font-semibold">Oops! Something went wrong.</p>
                <p>{message.error}</p>
            </div>
          ) : (
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {formattedContent}
            </div>
          )}
        </div>
    </div>
  );
};


export const StoryDisplay: React.FC<StoryDisplayProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return <Placeholder />;
  }

  return (
    <div className="h-full">
        {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
    </div>
  );
};