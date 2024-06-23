"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Earnings from './earnings';

interface CalculateSalaryProps {
  basic: string;
  setBasic: (value: string) => void;
  earnings: string;
  setEarnings: (value: string) => void;
  ePFEarnings: string;
  setEPFEarnings: (value: string) => void;
  deductions: string;
  setDeductions: (value: string) => void;
  item: string;
  setItem: (value: string) => void;
  itemAmount: string;
  setItemAmount: (value: string) => void;
  check: boolean;
  setCheck: (value: boolean) => void;
}

const CalculateSalary:React.FC<CalculateSalaryProps> = ({
  basic, setBasic, 
  earnings, setEarnings, 
  ePFEarnings, setEPFEarnings, 
  deductions, setDeductions,
  item, setItem,
  itemAmount, setItemAmount,
  check, setCheck
}) => {
  const [window,setWindow] = useState(false);
  const [updateWindow, setUpdateWindow] = useState(false);
  const [type, setType] = useState<'earning' | 'deduction'>('earning');
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [earningList, setEarningList] = useState<any[]>([])
  const [deductionList, setDeductionList] = useState<any[]>([])
  
  // Functions
  const handleReset = () => {
    setBasic('0.00');
    setEarningList([]);
    setDeductionList([]);
    setEarnings('0.00');
    setEPFEarnings('0.00');
    setDeductions('0.00');
  }

  const handleDelete = (id:number, type: 'earning' | 'deduction') => {
    if (type === 'earning') {
      const listItem = earningList.filter((item) => item.id !== id);
      setEarningList(listItem);
      localStorage.setItem("Earning_List", JSON.stringify(listItem));
    } else {
      const listItem = deductionList.filter((item) => item.id !== id);
      setDeductionList(listItem);
      localStorage.setItem("Deduction_List", JSON.stringify(listItem));
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: type === 'earning' ? earningList.length + 1 : deductionList.length + 1,
      checked: check,
      item,
      amount: itemAmount,
    };
    if (type === 'earning') {
      const updatedEarningList = [...earningList, newItem];
      setEarningList(updatedEarningList);
      localStorage.setItem("Earning_List", JSON.stringify(updatedEarningList));
    } else {
      const updatedDeductionList = [...deductionList, newItem];
      setDeductionList(updatedDeductionList);
      localStorage.setItem("Deduction_List", JSON.stringify(updatedDeductionList));
    }
    setItem('');
    setItemAmount('');
    setCheck(false);
    setWindow(false);
  }

  const handleUpdateItem = (e:React.FormEvent) => {
    e.preventDefault();
    if(currentItemId != null){
      const updateItem = {
        id: currentItemId,
        checked: check,
        item,
        amount: itemAmount,
      };
      if(type === 'earning'){
          const updatedEarningList = earningList.map((item)=>
          item.id === currentItemId ? updateItem : item
        );
        setEarningList(updatedEarningList);
        localStorage.setItem("Earning_List", JSON.stringify(updatedEarningList));
      }else{
        const updatedDeductionList = deductionList.map((item) => 
          item.id === currentItemId ? updateItem : item
        );
        setDeductionList(updatedDeductionList);
        localStorage.setItem("Deduction_List", JSON.stringify(updatedDeductionList));
      }
      setItem('');
      setItemAmount('');
      setCheck(false);
      setUpdateWindow(false);
    }
  };

  const handleOpenUpdateWindow = (id:number, type: 'earning' | 'deduction') => {
    setType(type); // Set the type when opening the update window
    setCurrentItemId(id);
    const list = type === 'earning' ? earningList : deductionList;
    const currentItem = list.find((item) => item.id === id);
    if(currentItem){
      setUpdateWindow(true);
      setItem(currentItem.item);
      setItemAmount(currentItem.amount);
      setCheck(currentItem.checked);
    }
  };
  
  // Calculations
  const calculateEarnings = (earningList: any[]) => {
    const total = earningList.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0); // Ensure item.amount is a number
    setEarnings(total.toFixed(2));
  }

  const calculateDeductions = (deductionList: any[]) => {
    const total = deductionList.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0); // Ensure item.amount is a number
    setDeductions(total.toFixed(2));
  }
  
  const calculateEPFEarnings = (earningList: any[]) => {
    const total = earningList.reduce((sum, item) => item.checked ? sum + (parseFloat(item.amount) || 0) : sum, 0); // Ensure item.amount is a number
    setEPFEarnings(total.toFixed(2)); // Update EPF earnings state with formatted total
  }

  useEffect(() => {
    calculateEarnings(earningList);
    calculateEPFEarnings(earningList);
  }, [earningList]);

  useEffect(() => {
    calculateDeductions(deductionList);
  }, [deductionList]);

  return (
    <div className="bg-[#FAFAFA] flex flex-col p-5 mr-0 lg:mr-10 rounded-[10px] border-[1px] border-[#E0E0E0] w-full lg:w-[50%] h-auto lg:h-[100%] my-3">
      <div className="flex flex-row flex-nowrap items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Calculate Your Salary</h3>
        <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-[5px] hover:bg-[#E0E0E0]"  onClick={handleReset}>
          <Image className='p-[5px] mr-[-8px] md:mr-[-3px]' src="/reset.png" width={25} height={25} alt="ResetLogo" />
          <p className='text-[15px] text-blue-700'>Reset</p>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-semibold text-gray-700">Basic Salary</label>
        <input type='number' placeholder='Eg 100,000.00'
         className='max-w-[250px] rounded-[5px] border-[1px] border-[#E0E0E0] p-2 text-[15px]' value={basic} onChange={(e) => setBasic(e.target.value)}/>
      </div>
      <Earnings
       list={earningList}
       setList={setEarningList}
       handleDeleteItem={(id) => handleDelete(id, 'earning')} 
       handleOpenAddWindow={()=>{setWindow(true); setType('earning');}}
       handleUpdateOpenWindow={(id) => handleOpenUpdateWindow(id, 'earning')}  
       Title={"Earnings"} 
       SubTitle={"Allowance, Fixed Allowance, Bonus and etc."} 
       ButtonName='+ Add New Allowance'
       />
      <div className='w-full h-[1px] my-5 md:my-3 bg-[#E0E0E0]'></div>
      <Earnings
       list={deductionList}
       setList={setDeductionList}
       handleDeleteItem={(id) => handleDelete(id, 'deduction')} 
       handleOpenAddWindow={()=>{ setWindow(true); setType('deduction'); }}
       handleUpdateOpenWindow={(id) => handleOpenUpdateWindow(id, 'deduction')} 
       Title={"Deductions"} 
       SubTitle={"Salary Advances, Loan Deductions and all"} 
       ButtonName='+ Add New Deduction'
       />
      {window && (
      <div className='fixed bg-opacity-50 w-screen h-screen bg-[#000000] z-10 m-0 p-0 inset-0 flex flex-row items-center justify-center'>
        <form onSubmit={handleAddItem} className='absolute flex flex-col rounded-[5px] items-center justify-center w-[50%] bg-[#FFFFFF]'>
          <div className='flex flex-row items-center justify-between flex-nowrap border-b-[3px] w-full px-3 md:px-5 py-3'>
            <h2 className='font-semibold'>{type === 'earning' ? 'Add New Earnings' : 'Add New Deductions'}</h2>
            <Image onClick={()=>setWindow(false)} className='cursor-pointer hover:bg-[#E0E0E0] p-1 rounded-full' src="/delete.png" width={20} height={20} alt='close'/>
          </div>
          <div className='flex flex-col items-center justify-center w-full px-3 md:px-5'>
            <div className="flex flex-col mb-4 w-full">
              <label className="my-2 text-blue-600 font-semibold">{type === 'earning' ? 'Earnings Items' : 'Deductions Items'}</label>
              <input type='text' placeholder='Eg: Travel' onChange={(e)=>setItem(e.target.value)} required
                className='rounded-[5px] border-[1px] border-[#E0E0E0] p-2 text-[15px]' value={item}/>
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label className="my-2 font-medium text-blue-600 font-semibold">Amount</label>
              <input type='number' placeholder='Eg: 100,000.00' onChange={(e) => setItemAmount(e.target.value)} required
              className='rounded-[5px] border-[1px] border-[#E0E0E0] p-2 text-[15px]' value={itemAmount}/>
            </div>
            <div className="flex flex-row flex-nowrap mb-4 w-full">
              <input type='checkBox' placeholder='Eg: Travel' checked={check} onChange={(e) => setCheck(e.target.checked)}
                className='rounded-[5px] border-[1px] cursor-pointer border-[#E0E0E0] p-2 text-[15px]'/>
              <label className="ml-3 my-2 text-[15px] font-medium text-gray-700">EPF/ETF</label>
            </div>
          </div>
          <div className='flex flex-row flex-nowrap w-full items-center justify-end  px-3 md:px-5 py-3 border-t-[3px]'>
            <div className='text-blue-700 font-medium text-[15px] mx-3 cursor-pointer hover:font-semibold' onClick={()=>setWindow(false)}>Cancel</div>
            <button type='submit' className='bg-blue-700 text-gray-100 px-4 py-2 rounded-[5px] font-medium text-[15px] mx-3 cursor-pointer hover:font-bold'>Add</button>
          </div>
          </form>
      </div>)}
      {updateWindow && (
      <div className='fixed bg-opacity-50 w-screen h-screen bg-[#000000] z-10 m-0 p-0 inset-0 flex flex-row items-center justify-center'>
        <form onSubmit={handleUpdateItem} className='absolute flex flex-col rounded-[5px] items-center justify-center w-[50%] bg-[#FFFFFF]'>
          <div className='flex flex-row items-center justify-between flex-nowrap border-b-[3px] w-full px-3 md:px-5 py-3'>
            <h2 className='font-semibold'>{type === 'earning' ? 'Update Earnings Item' : 'Updaete Deduction Item'}</h2>
            <Image onClick={()=>setUpdateWindow(false)} className='cursor-pointer hover:bg-[#E0E0E0] p-1 rounded-full' src="/delete.png" width={20} height={20} alt='close'/>
          </div>
          <div className='flex flex-col items-center justify-center w-full px-3 md:px-5'>
            <div className="flex flex-col mb-4 w-full">
              <label className="my-2 text-blue-600 font-semibold">{type === 'earning' ? 'Earnings Items' : 'Deductions Items'}</label>
              <input type='text' placeholder='Eg: Travel' onChange={(e)=>setItem(e.target.value)}
                className='rounded-[5px] border-[1px] border-[#E0E0E0] p-2 text-[15px]' value={item}/>
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label className="my-2 font-medium text-blue-600 font-semibold">Amount</label>
              <input type='number' placeholder='Eg: 100,000.00' onChange={(e) => setItemAmount(e.target.value)}
              className='rounded-[5px] border-[1px] border-[#E0E0E0] p-2 text-[15px]' value={parseFloat(itemAmount).toFixed(2)}/>
            </div>
            <div className="flex flex-row flex-nowrap mb-4 w-full">
              <input type='checkBox' placeholder='Eg: Travel' checked={check} onChange={(e) => setCheck(e.target.checked)}
                className='rounded-[5px] border-[1px] cursor-pointer border-[#E0E0E0] p-2 text-[15px]'/>
              <label className="ml-3 my-2 text-[15px] font-medium text-gray-700">EPF/ETF</label>
            </div>
          </div>
          <div className='flex flex-row flex-nowrap w-full items-center justify-end px-3 md:px-5 py-3 border-t-[3px]'>
            <div className='text-blue-700 font-medium text-[15px] mx-3 cursor-pointer hover:font-semibold' onClick={()=>setUpdateWindow(false)}>Cancel</div>
            <button type='submit' className='bg-blue-700 text-gray-100 px-4 py-2 rounded-[5px] font-medium text-[15px] mx-3 cursor-pointer hover:font-bold'>Add</button>
          </div>
          </form>
      </div>)}
    </div>
  );
};

export default CalculateSalary;