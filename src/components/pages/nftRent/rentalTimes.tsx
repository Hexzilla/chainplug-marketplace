interface Props {
  data: any;
  width?: number;
  handleDate: (date: any, type: string) => void;
}
const RentalTime = ({ data, width = 248, handleDate }: Props) => {
  return (
    <div className='mt-10'>
      <div
        className='text-[20px] text-white font-[400]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {data.title}
      </div>
      <div
        className='mt-1 text-[14px] text-[#CCCCCCCC] font-[500]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {data.description}
      </div>

      <input
        id='default-datepicker'
        type='date' // Changed from "text" to "date"
        className={`bg-white text-black text-sm block w-[${width}px] mt-2 ps-5 p-2`}
        placeholder='Select date'
        onChange={(e) => handleDate(e.target.value, data.title)}
      />
    </div>
  );
};
export default RentalTime;
