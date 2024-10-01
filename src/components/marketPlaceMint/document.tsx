import Texts from './text';

interface Props {
  text: string;
}
const Document = ({ text }: Props) => {
  return (
    <div className='mt-[30px]'>
      <Texts text={text} size={16} />
      <textarea
        id='message'
        rows={4}
        className='block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-gray-300'
      />
    </div>
  );
};

export default Document;
