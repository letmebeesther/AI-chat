import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StoryDisplay } from './components/StoryDisplay';
import { generateChatResponse } from './services/geminiService';
import { Message } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    if (!prompt || isLoading) {
      return;
    }

    setIsLoading(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      author: 'user',
      content: prompt,
    };

    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      author: 'ai',
      content: '',
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setPrompt('');

    try {
      const generatedStory = await generateChatResponse(prompt);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, content: generatedStory, isLoading: false } : msg
      ));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, content: '', isLoading: false, error: errorMessage } : msg
      ));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="h-screen bg-slate-900 font-sans flex flex-col">
      <div className="p-4 sm:p-6 lg:p-8 flex-shrink-0">
        <Header />
      </div>
      <main className="flex-grow container mx-auto max-w-4xl w-full flex flex-col p-4 overflow-y-auto">
        <StoryDisplay messages={messages} />
      </main>
      <footer className="flex-shrink-0 p-4 sm:p-6 lg:p-8 container mx-auto max-w-4xl w-full">
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <p className="text-center text-slate-500 text-xs pt-4">Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;