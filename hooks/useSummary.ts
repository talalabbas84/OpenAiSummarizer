import { useState } from 'react';
import { Tone, tones } from '../utils/data';

const useSummary = (): {
  text: string;
  setText: (text: string) => void;
  tone: string;
  setTone: (tone: Tone) => void;
  generateSummary: (isLoadMore: boolean) => Promise<void>;
  responses: any[];
  setResponses: (responses: any[]) => void;
  loading: {
    isGenerating: boolean;
    isGeneratingMore: boolean;
  };
} => {
  const [text, setText] = useState('');
  const [tone, setTone] = useState(tones[0]);
  const [responses, setResponses] = useState<any>([]);
  const [loading, setLoading] = useState({
    isGenerating: false,
    isGeneratingMore: false
  });

  const generateSummary = async (isLoadMore: boolean) => {
    if (!text) return;
    isLoadMore
      ? setLoading({ ...loading, isGeneratingMore: true })
      : setLoading({ ...loading, isGenerating: true });
    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, tone })
    });
    isLoadMore
      ? setLoading({ ...loading, isGeneratingMore: false })
      : setLoading({ ...loading, isGenerating: false });
    const data = await response.json();
    if(isLoadMore) {
      setResponses([...responses, ...data]);
      return;
    }
    setResponses(data);
  };

  return {
    text,
    setText,
    tone,
    setTone,
    generateSummary,
    responses,
    setResponses,
    loading
  };
};

export default useSummary;
