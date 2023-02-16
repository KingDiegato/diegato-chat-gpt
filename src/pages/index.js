/* eslint-disable @next/next/no-img-element */
import TypeEffect from '@/components/TypeEffect'
import { KingIcon, UserIcon, PlusIcon, SendIcon } from '@/icons/index'
import { Avatar } from '@/Images/Avatar'
import { useMessageStore } from '@/store/messages'
import Head from 'next/head'
import { useRef } from 'react'

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
    </>
  )
}

function Message({ ia, message }) {
  const textElement = ia ? <TypeEffect text={message} /> : message
  return (
    <div className={`text-gray-100, ${ia ? 'bg-gptlightgray' : 'bg-gptgray'}`}>
      <article className='text-gray-100 flex gap-4 p-6 m-auto'>
        <Avatar>{ia ? <KingIcon /> : <UserIcon />}</Avatar>
        <p>{textElement}</p>
      </article>
    </div>
  )
}

function Chat() {
  const messages = useMessageStore((state) => state.messages)
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
  const sendPrompt = useMessageStore((state) => state.sendPrompt)
  const textAreaRef = useRef()

  const handleSubmit = (event) => {
    event?.preventDefault()
    const { value } = textAreaRef.current
    if (value === '') {
      console.error('prompt is required')
      return
    }
    sendPrompt({ prompt: value })
    textAreaRef.current.value = ''
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = () => {
    const element = textAreaRef.current

    element.style.height = '0px'
    const scrollHeight = element.scrollHeight
    element.style.height = scrollHeight + 'px'
  }

  return (
    <section className='absolute bottom-0 w-full ml-32 left-0 right-0'>
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className='flex flex-row max-w-3xl pr-2 pl-2 pt-2 pb-2 m-auto bg-gptlightgray mb-12 rounded-xl'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            onChange={handleChange}
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            className='w-full resize-none bg-transparent outline-none'
          />
        </div>
        <button type='submit' className='p-1 rounder-md bottom-2.5 right-2.5'>
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
