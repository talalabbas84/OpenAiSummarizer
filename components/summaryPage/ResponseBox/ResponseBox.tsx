import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { countCharacters, countWords } from '../../../utils/helper_function';

interface IProps {
  response: any;
}

const ResponseBox = ({ response }: IProps) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (response) {
      setText(response);
    }
  }, [response]);

  return (
    <div className='w-full flex flex-col justify-center items-center p-10 border-t-2 border-gray-200'>
      <div
        className='w-full  shadow-sm focus:outline-gray-300 focus:ring-1 focus:ring-gray-300 focus:border-gray-300  rounded-md'
        contentEditable='true'
      >
        {response}
      </div>
      <div className='flex flex-row w-full items-center gap-4 mt-2'>
        <button
          className='w-1/6 h-12 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md
            hover:bg-gray-200 active:bg-gray-300
          '
          onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success('Copy to Clipboard', {
              position: 'top-right'
            });
          }}
        >
          Copy
        </button>

        <p className='text font-bold'>Word Count: {countWords(text)}</p>
        <p className='text font-bold'>
          Character Count: {countCharacters(text)}
        </p>
      </div>
    </div>
  );
};

export default ResponseBox;
