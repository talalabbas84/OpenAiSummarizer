import { Inter } from '@next/font/google';
import { Toaster } from 'react-hot-toast';
import LoadMoreButton from '../components/summaryPage/LoadMoreButton/LoadMoreButton';
import PromptBox from '../components/summaryPage/PromptBox/PromptBox';
import ResponseBox from '../components/summaryPage/ResponseBox/ResponseBox';
import useSummary from '../hooks/useSummary';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const {
    text,
    setText,
    tone,
    setTone,
    generateSummary,
    responses,
    setResponses,
    loading
  } = useSummary();
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center py-20'>
      <Toaster />
      <div className='bg-gray-100 h-full w-screen flex justify-center items-center'>
        <div className='bg-white   rounded-2xl shadow-xl flex flex-col justify-center items-center  w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12'>
          <PromptBox
            text={text}
            setText={setText}
            tone={tone}
            setTone={setTone}
            generateSummary={generateSummary}
            isLoading={loading.isGenerating}
          />
          {responses &&
            responses.length > 0 &&
            responses.map((response, i) => {
              return <ResponseBox key={i} response={response.text} />;
            })}
          {responses && responses.length > 0 && (
            <LoadMoreButton
              generateSummary={generateSummary}
              text={text}
              isLoading={loading.isGeneratingMore}
            />
          )}
        </div>
      </div>
    </div>
  );
}
