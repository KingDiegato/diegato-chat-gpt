/* eslint-disable @next/next/no-img-element */
import TypeEffect from '@/components/TypeEffect'
import { KingIcon, UserIcon, PlusIcon, SendIcon } from '@/icons/index'
import { Avatar } from '@/Images/Avatar'
import Head from 'next/head'

function Aside() {
  return (
    <aside className='bg-gptdarkgray fixed flex w-64 h-screen flex-col'>
      <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
        <button className='flex py-3 px-3 items-center gap-3 rounded-md border border-white/20 cursor-pointer text-sm text-white mb-2 flex-shrink-0 hover:bg-gray-500/10 transition-colors duration-200'>
          <PlusIcon />
          New Chat
        </button>
      </nav>
    </aside>
  )
}
function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Chat-Dpt</title>
      </Head>
      <div className='w-full relative h-screen bg-gptgray'>
        <Aside />
        {children}
      </div>
      <div>Hola</div>
    </>
  )
}

function Message({ ia, message }) {
  const textElement = ia ? <TypeEffect text={message} /> : message
  return (
    <div className={`text-gray-100, ${ia ? 'bg-gptlightgray' : 'bg-gptgray'}`}>
      <article className=' text-gray-100 flex gap-4 p-6 m-auto'>
        <Avatar>{ia ? <KingIcon /> : <UserIcon />}</Avatar>
        <p>{textElement}</p>
      </article>
    </div>
  )
}

function Chat() {
  const messages = [
    {
      id: 1,
      ia: false,
      message: 'De que color es el caballo blanco de santiago?'
    },
    {
      id: 2,
      ia: true,
      message:
        'El caballo blanco de santiago es el caballo mas negro de todos El caballo blanco de santiago es el caballo mas negro de todos El caballo blanco de santiago es el caballo mas negro de todos El caballo blanco de santiago es el caballo mas negro de todos'
    }
  ]
  return (
    <div className='flex flex-col h-full flex-1 pl-64'>
      <main>
        {messages.map((entry) => (
          <Message key={entry.id} {...entry} />
        ))}
      </main>
      <ChatForm />
    </div>
  )
}

function ChatForm() {
  return (
    <section className='absolute bottom-0 w-full ml-32 left-0 right-0'>
      <form className='flex flex-row max-w-3xl pr-2 pl-2 pt-2 pb-2 m-auto bg-gptlightgray mb-12 rounded-xl'>
        <textarea className='w-full resize-none bg-transparent outline-none border-0 h-10 pt-2 pl-6 pr-6' />
        <button className='p-1 rounder-md bottom-2.5 right-2.5'>
          <SendIcon />
        </button>
      </form>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Layout>
        <Chat />
      </Layout>
    </>
  )
}
