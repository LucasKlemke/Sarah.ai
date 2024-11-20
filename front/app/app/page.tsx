'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Send, SendIcon } from 'lucide-react';
import Image from 'next/image';
import AutosizeTextareaWithRef from './auto-size-text-area';
import { ask_question } from '@/lib/request';
import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const resposta: string = await ask_question(question, answers);
    if (resposta) {
      setAnswers((state) => [
        ...state,
        { question: question, answer: resposta },
      ]);
    }

    setQuestion('');
    setLoading(false);
  };

  return (
    <div className="px-10">
      <div className=" w-full">
        <h1 className="text-4xl text-center font-extralight pb-5">Sarah.ai</h1>
      </div>
      <div className="h-[82vh] w-full flex flex-col space-y-10 overflow-scroll">
        {answers.map((item, index) => (
          <div className="flex flex-col space-y-5 px-10" key={index}>
            <h1 className="self-end bg-gray-500 px-3 py-3 text-white rounded-2xl">{item.question}</h1>
            <div className="self-start flex gap-x-2 w-">
              <div>
                <pre
                  className=" whitespace-pre-line "
                  onClick={() => console.log(answers)}
                >
                  {item.answer}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="  rounded-t-xl justify-center  flex">
        <div className="w-1/2 gap-x-2 flex items-center justify-center py-3">
          <Input
            disabled={loading}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button disabled={loading} onClick={() => handleSubmit()} size="icon">
            {loading ? <Loader className="animate-spin" /> : <Send />}
          </Button>
        </div>
      </div>
    </div>
  );
}
