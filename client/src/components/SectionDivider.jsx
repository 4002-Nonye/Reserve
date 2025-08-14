

function SectionDivider({ sectionNumber,wrapperStyle }) {
  return (
    <div className={wrapperStyle}>
      <div className='border-emerald-500 h-32 border-[1px]'></div>
      <div className=' border-emerald-500 border-[1px] rounded-full h-28 w-28 flex items-center  justify-center'>
        {' '}
        <span className='  text-emerald-500 text-3xl font-bold font-mono'>
          {sectionNumber}
        </span>
      </div>
    </div>
  );
}

export default SectionDivider;
