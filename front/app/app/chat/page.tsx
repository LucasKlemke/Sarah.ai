'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader, Send } from 'lucide-react';
import { submit_question } from '@/lib/request';
import { useState } from 'react';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[] | []
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const llm_answer: string = await submit_question(question, answers);
    if (llm_answer) {
      setAnswers((state) => [
        ...state,
        { question: question, answer: llm_answer },
      ]);
    }

    let history = localStorage.getItem('history');
    const newId = Math.random().toString(36).substring(7);

    if (history && JSON.parse(history).length > 0) {
        history = JSON.parse(history);
        history.push({ id: newId, content: JSON.stringify(answers) });
        localStorage.setItem('history', JSON.stringify(history));
    } else if (!history ) {
        localStorage.setItem('history', JSON.stringify([{ id: newId, content: JSON.stringify(answers) }]));
    }

    console.log(localStorage.getItem('history'));

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
            <h1 className="self-end bg-gray-500 px-3 py-3 text-white rounded-2xl">
              {item.question}
            </h1>
            <div className="self-start flex gap-x-2 w-">
              <div>
                <pre className={`${montserrat.className} whitespace-pre-line`}>
                  {item.answer
                    .split('**')
                    .map((part: string, index: any) =>
                      index % 2 === 1 ? <b key={index}>{part}</b> : part
                    )}
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
