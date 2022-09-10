import { useForm } from 'react-hook-form'

interface FormFields {
  number: string
  name: string
  CVV: string
  expires_in: string
}

export default function Home() {
  const { register, handleSubmit } = useForm<FormFields>()

  async function onSubmitCard(data: FormFields) {
    console.log(data)

    await fetch('/api/card/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmitCard)}
        className='w-full  max-w-2xl flex flex-col'
      >
        <label className='flex flex-col gap-1 my-2'>
          <span className='block font-medium'>Número do cartão:</span>
          <input
            className='border border-indigo-200 p-2 rounded w-full'
            type='text'
            id='number'
            {...register('number')}
          />
        </label>
        <label className='flex flex-col gap-1 my-2'>
          <span className='block font-medium'>Nome no cartão:</span>
          <input
            className='border border-indigo-200 p-2 rounded w-full'
            type='text'
            id='name'
            {...register('name')}
          />
        </label>
        <label className='flex flex-col gap-1 my-2'>
          <span className='block font-medium'>Código de segurança (CVV):</span>
          <input
            className='border border-indigo-200 p-2 rounded w-full'
            type='text'
            id='CVV'
            {...register('CVV')}
          />
        </label>
        <label className='flex flex-col gap-1 my-2'>
          <span className='block font-medium'>Data de validade:</span>
          <input
            className='border border-indigo-200 p-2 rounded w-full'
            type='text'
            id='expires_in'
            {...register('expires_in')}
          />
        </label>
        <button
          type='submit'
          className='bg-indigo-800 w-full rounded p-2 text-white scale-100 cursor-pointer hover:scale-105 transition-all hover:bg-indigo-900 disabled:cursor-auto disabled:pointer-events-none'
        >
          Ficar Milionário
        </button>
      </form>
    </div>
  )
}
