import { auth } from '@/pages/firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Navbar = () => {
    const router = useRouter()
    const [user, setUser] = useAuthState(auth)
    const signOut = () => {
        auth.signOut()
        router.push('/login');
    }
    const CustomLink = ({ href, title, className = "" }) => {
        return (
            <Link href={href} className={router.pathname === href
                ? `${className}  decoration-[white] md:decoration-[white] underline decoration-2 leading-snug  hover:opacity-75`
                : `${className}  hover:decoration-[white] md:hover:decoration-[white] hover:underline hover:decoration-2 leading-snug  hover:opacity-75`
            }>
                <span className={` text-white`}>
                    {title}
                </span>
            </Link>
        )
    }
    return (
        <header className='fixed bg-gray-800 w-full px-[69px] py-[24px] '>
            <div className='flex w-full justify-between items-center '>
                <div className=' flex w-1/2'>
                    <CustomLink href={'/'} title={"Home"} className='px-3 py-2 flex items-center  uppercase underline-offset-4' />
                    <CustomLink href={'/saved'} title={"Saved"} className='px-3 py-2 flex items-center  uppercase underline-offset-4' />
                </div>
                <div className=' flex w-1/2 justify-end'>
                    {user ?
                        <button className='border border-slate-200 px-2 py-1 cursor-pointer rounded-lg text-white hover:bg-slate-400 hover:text-slate-900' onClick={() => signOut()}>SignOut</button>
                        : <CustomLink href={'/login'} title={"login"} className='px-3 py-2 flex items-center  uppercase underline-offset-4' />
                    }
                </div>

            </div>
        </header>
    )
}

export default Navbar
