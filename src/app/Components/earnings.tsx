import React, { useState } from 'react';
import Image from 'next/image';

interface EarningsItems {
    id: number;
    checked: boolean;
    item: string;
    amount: string;
  }

interface EarningsProps{
    Title: string;
    SubTitle: string;
    ButtonName: string;
    handleOpenAddWindow: () => void;
    list:EarningsItems[];
    setList: (value: EarningsItems[]) => void;
    handleDeleteItem: (value: number) => void;
    handleUpdateOpenWindow: (value: number) => void;
}

const Earnings:React.FC<EarningsProps> = ({Title, SubTitle, ButtonName, handleOpenAddWindow, handleDeleteItem, list, handleUpdateOpenWindow, setList}) => {
  return (
    <div className='flex flex-col items-start justify-start max-h-[36%]'>
      <h2 className='mb-1 font-semibold text-gray-700 mt-3'>{Title}</h2>
      <p className='text-[12px] text-gray-300 font-medium'>{SubTitle}</p>
      <div className="mt-[10px] overflow-auto bg-transparent max-h-[35%]">
        <table>
            <tbody className=' overflow-auto'>
                {list.map((item) => (
                    <tr className='flex flex-row my-1 items-center'>
                        <td className='flex flex-row flex-nowrap' key={item.id}>
                            <p className='text-[12px] font-medium'>{item.item}: </p>
                            <p className='text-[12px] font-medium pl-[5px]'>{parseFloat(item.amount).toFixed(2)}</p>
                        </td>
                        <td className='pl-[10px]'>
                            {item.checked && (<div className='flex flex-row flex-nowrap'>
                                <Image src="/check.png" width={12} height={12} className='object-contain' alt="ResetLogo" />
                                <p className='text-[10px] font-[500]'>EPF/ETF</p>
                            </div>)}
                        </td>
                        <td className='flex flex-row flex-nowrap items-center justify-center'>
                            <div onClick={() => handleUpdateOpenWindow(item.id)} className='ml-[10px] cursor-pointer pl-[10px] border-s-[1.5px] border-[#E0E0E0]'><Image className='bg-[#E0E0E0] p-[2px] rounded-full pointer' src="/edit.png" width={15} height={15} alt="ResetLogo"/></div>
                            <div className='ml-[5px] cursor-pointer' onClick={() => handleDeleteItem(item.id)}><Image className='bg-[#E0E0E0] p-[2px] rounded-full' src="/delete.png" width={15} height={15} alt="delete" /></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      <div onClick={handleOpenAddWindow} className='mt-5 text-[12px] text-blue-500 cursor-pointer hover:text-blue-700 hover:font-medium'>{ButtonName}</div>
    </div>
  );
}

export default Earnings;