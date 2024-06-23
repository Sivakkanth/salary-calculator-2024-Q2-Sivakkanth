"use client";  // Add this line to indicate a client component
import React, { useState } from 'react'
import CalculateSalary from "./Components/calculateSalary";
import SummarySalary from "./Components/summarySalary";

const Home:React.FC = () => {
  const [basic, setBasic] = useState<string>('0.00');
  const [earnings, setEarnings] = useState<string>('0.00');
  const [ePFEarnings, setEPFEarnings] = useState<string>('0.00');
  const [deductions, setDeductions] = useState<string>('0.00');
  const [item, setItem] = useState<string>('');
  const [itemAmount, setItemAmount] = useState<string>('0.00');
  const [check, setCheck] = useState<boolean>(false);

  return (
    <main className="flex h-auto lg:h-screen w-full flex-col lg:flex-row items-center lg:items-strech justify-center p-10 md:p-20">
      <CalculateSalary
        basic={basic} setBasic={setBasic} 
        earnings={earnings} setEarnings={setEarnings} 
        ePFEarnings={ePFEarnings} setEPFEarnings={setEPFEarnings}
        deductions={deductions} setDeductions={setDeductions}
        item={item} setItem={setItem}
        itemAmount={itemAmount} setItemAmount={setItemAmount}
        check={check} setCheck={setCheck}
        />
      <SummarySalary
        basic={basic} 
        earnings={earnings} 
        ePFEarnings={ePFEarnings} 
        deductions={deductions}/>
    </main>
  )
}

export default Home;