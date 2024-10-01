interface Props {
  text: string;
  size: number;
  color?: string;
}
const Texts = ({ text, size, color = 'white' }: Props) => {
  return (
    <div
      className={`bg-transparent text-[${size}px] font-[400] text-${color}`}
      style={{ fontFamily: 'Sora, sans-serif' }}
    >
      {text}
    </div>
  );
};

export default Texts;
