"use client";

import { ChangeEvent } from 'react';
import { useFormCtx } from '@/components/FormCtxProvider';

export default function Form() {
  const { formData, update } = useFormCtx();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    update(name, value);
  };

  return (
    <form className='p-4 my-12 mx-4 w-full max-w-[30rem] border'>
      <h1 className='text-2xl font-semibold text-center'>Multi-tab form autofill</h1>
      <div className='w-full flex flex-col gap-2 my-4'>
        <label>Name:</label>
        <input 
          type="text" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
          className='border p-2'
        />
      </div>
      
      <div className='w-full flex flex-col gap-2 my-4'>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className='border p-2'
        />
      </div>
      
      <div className='w-full flex flex-col gap-2 my-4'>
        <label>Hobby:</label>
        <input 
          type="text" 
          name="hobby" 
          value={formData.hobby} 
          onChange={handleChange}
          className='border p-2' 
        />
      </div>
    </form>
  );
}
