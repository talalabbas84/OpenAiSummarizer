import { Tone, tones } from '../../../utils/data';
import {
  countWords,
  firstLetterUppercase
} from '../../../utils/helper_function';

interface IProps {
  text: string;
  setText: (text: string) => void;
  tone: string;
  setTone: (tone: Tone) => void;
  generateSummary: (isLoadMore: boolean) => void;
  isLoading: boolean;
}
const PromptBox = ({
  text,
  setText,
  tone,
  setTone,
  isLoading,
  generateSummary
}: IProps) => {
  return (
    <div className='w-full flex flex-col justify-center items-center p-10'>
      <div className='w-full grid grid-cols-2 gap-2 justify-items-start my-2'>
        <div className='col-span-2 w-full'>
          <p className='text font-bold'>
            Enter the text you want to summarize: (Max 2000 words)
          </p>

          <textarea
            className='w-full h-40 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md'
            placeholder='Enter the text you want to summarize'
            value={text}
            onChange={e => {
              if (countWords(e.target.value) <= 2000) {
                setText(e.target.value);
              }
            }}
          />
          {/* on flex end  show total word counts */}
          <div className='flex flex-row justify-end w-full items-center gap-4 mt-2'>
            Words Count: {countWords(text)}
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-2 gap-2 justify-items-start'>
        <div className='col-span-2 w-full'>
          <p className='text font-bold'>Choose a tone:</p>
          <select
            className='w-full h-10 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md'
            value={tone}
            onChange={e => setTone(e.target.value as Tone)}
          >
            {tones.map(tone => {
              return (
                <option key={tone} value={tone}>
                  {firstLetterUppercase(tone)}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className='w-full grid grid-cols-2 gap-2 justify-items-start my-4'>
        <div className='col-span-2 w-full'>
          <button
            className='w-full h-12 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md bg-black text-white
          hover:bg-transparent hover:text-black hover:border-black
           disabled:cursor-not-allowed
          '
            disabled={text.length === 0}
            onClick={() => generateSummary(false)}
          >
            {isLoading ? 'Loading...' : 'Generate Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
