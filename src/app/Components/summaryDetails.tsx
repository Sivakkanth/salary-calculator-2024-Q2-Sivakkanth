import React from 'react';

interface SummarySalaryProps{
    Item:string;
    Amount: string; 
}

const SummaryDetails:React.FC<SummarySalaryProps> = ({Item, Amount}) => {
  return (
    <div className='flex flex-row flex-nowrap items-center justify-between text-[13px] font-[400] my-[3px]'>
      <p>{Item}</p>
      <p>{Amount}</p>
    </div>
  );
}

export default SummaryDetails;