'use client'
import { useParams, useSearchParams } from 'next/navigation'

export default function TestRoute() {
  const searchParams = useSearchParams();
  const useParam = useParams();
  const search = searchParams.get('search');
  const code = searchParams.get('code');
  const key = useParam.key;
  const departement = useParam.departement;
  return <>
    <h1>Dynamic Route : {key} {departement}</h1>
    <h1 className='text-white text-3xl'>Search : {search}</h1>
    <h1 className='text-white text-3xl'>Code: {code}</h1>
  </>
}