'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  const [question, setQuestion] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    });
    const reader = res.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';

    while (true) {
      const { done, value } = await reader?.read()!;
      if (done) break;
      result += decoder.decode(value, { stream: true });
      setResponse(result);
    }

    setLoading(false);
    setQuestion('');
  };

  return (
    <div>
      <div className="flex w-1/2 gap-x-3 p-5">
        <Input
          disabled={loading}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button disabled={loading} onClick={() => handleSubmit()}>
          {loading ? <Loader2Icon className="animate-spin" /> : 'Enviar'}
        </Button>
      </div>

      <div className="w-1/2 p-5">
        <h1>Resposta</h1>

        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatPage;
