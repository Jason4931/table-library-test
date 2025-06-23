'use client';
import { login } from '@/app/actions/auth'
 
export default function AuthForm() {
  return (
    <form action={login} className='flex flex-col gap-4 w-lg'>
      <div className="flex flex-col">
        <label className='text-gray-500' htmlFor="name">Name</label>
        <input className='px-3 py-3 mx-2 w-full  rounded-2xl' id="name" name="name" placeholder="Name" />
      </div>
      <div className="flex flex-col">
        <label className='text-gray-500' htmlFor="password">Password</label>
        <input className='px-3 py-3 mx-2 w-full rounded-2xl' id="password" name="password" type="password" placeholder='Password' />
      </div>
      <button className="bg-blue-400 cursor-pointer text-white p-3 m-5 rounded-full" type="submit">Sign Up</button>
    </form>
  )
}