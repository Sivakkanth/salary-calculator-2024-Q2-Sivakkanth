import React from 'react'
import SummaryDetails from './summaryDetails'

interface SummarySalaryProps {
    basic: string;
    earnings: string;
    ePFEarnings: string;
    deductions: string;
  }

const SummarySalary: React.FC<SummarySalaryProps> = ({ 
    basic, earnings, ePFEarnings, deductions 
  }) => {

  const grossEarning = parseFloat(basic) + parseFloat(earnings) - parseFloat(deductions);
  const total_Earning_EPF = parseFloat(basic) + parseFloat(ePFEarnings);
  const gross_Salary_EPF = total_Earning_EPF + parseFloat(deductions);
  const employee_EPF = gross_Salary_EPF * 0.08;
  const employer_EPF = gross_Salary_EPF * 0.12;
  const employer_ETF = gross_Salary_EPF * 0.03;
  const APIT = (grossEarning*0.18)-25500;
  const netSalary = grossEarning - parseFloat(ePFEarnings) - APIT;
  const CTC = grossEarning + employer_EPF;

  return (
    <div className='flex flex-col items-start justify-between h-full w-full lg:w-[35%] lg:min-w-[350px] p-5 rounded-[10px] border-[1px] border-[#E0E0E0]'>
      <div className='flex flex-col w-full h-auto'>
      <h3 className='text-lg font-semibold mb-3'>Your Salary</h3>
        <div className='flex flex-row flex-nowrap items-center justify-between my-2 text-[13px] text-gray-400 font-medium'>
            <p>Items</p>
            <p>Amount</p>
        </div>
        <SummaryDetails Item='Basic Salary' Amount={parseFloat(basic).toFixed(2)}/>
        <SummaryDetails Item='Gross Earning' Amount={grossEarning.toFixed(2)}/>
        <SummaryDetails Item='Gross Deduction' Amount={deductions}/>
        <SummaryDetails Item='Employee EPF(8%)' Amount={employee_EPF.toFixed(2)}/>
        <SummaryDetails Item='APIT' Amount={APIT.toFixed(2)}/>
      </div>
      <div className='flex flex-row flex-nowrap items-center justify-between text-[15px] font-medium border-[1px] rounded-[5px] p-3 w-full'>
        <p>Net Salary(Take Home)</p>
        <p>{netSalary.toFixed(2)}</p>
      </div>
      <div className='flex flex-col w-full'>
        <p className='my-2 text-[13px] text-gray-400 font-medium'>Contribution from the Employer</p>
        <SummaryDetails Item='Employeer EPF(12%)' Amount={employer_EPF.toFixed(2)}/>
        <SummaryDetails Item='Employeer ETF(3%)' Amount={employer_ETF.toFixed(2)}/>
      </div>
      <div className='flex flex-row flex-nowrap items-center justify-between w-full text-[14px] mt-3 mb-5 font-[400]'>
        <p>CTC (Cost of Company)</p>
        <p>{CTC.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default SummarySalary
