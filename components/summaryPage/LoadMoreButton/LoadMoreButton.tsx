
interface IProps {
  text: string;
  generateSummary: (isLoadMore: boolean) => void;
  isLoading: boolean;
}

const LoadMoreButton = ({ text, generateSummary, isLoading }: IProps) => {
  return (
    <div className='w-full flex flex-col justify-center items-center p-10'>
      <div className='col-span-2 w-full'>
        <button
          className='w-full h-12 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md bg-black text-white
          hover:bg-transparent hover:text-black hover:border-black
           disabled:cursor-not-allowed
          '
          disabled={text.length === 0}
          onClick={() => generateSummary(true)}
        >
          {isLoading ? 'Loading...' : 'Generate More'}
        </button>
      </div>
    </div>
  );
};

export default LoadMoreButton;
