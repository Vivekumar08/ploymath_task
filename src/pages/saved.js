import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Saved = () => {
    const router = useRouter();
    const [user, setUser] = useAuthState(auth)
    const [quotes, setQuotes] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
        fetchSavedQuotes()
    }, [router, user])

    const fetchSavedQuotes = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('User not authenticated.');
                return;
            }

            const userId = user.uid;

            const quotesRef = collection(db, 'quotes');
            const userQuotesQuery = query(quotesRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(userQuotesQuery);

            const fetchedQuotes = [];
            querySnapshot.forEach((doc) => {
                fetchedQuotes.push({ id: doc.id, ...doc.data() });
            });

            setQuotes(fetchedQuotes);
        } catch (error) {
            console.error('Error fetching saved quotes:', error);
        }
    };

    return (
        <main className="flex w-full bg-gray-700 flex-col items-center justify-center text-dark ">
            <Layout className="pt-6 lg:pt-2">
                <div className=" flex-col mt-[143px] px-5 ">
                    {quotes.length > 0 ? quotes.map((quote) => (
                        <div key={quote.id} className='md:w-[773px] w-full mx-auto my-5 h-[263px] bg-[#D05252] text-white rounded-[30px]  flex flex-col md:px-[120px] px-[25px] py-[23px]'>
                            <h1 className={`md:w-[521px] w-full h-[163px] px-[6px] py-[3px]  flex  align-bottom ${true ? 'justify-start' : 'justify-center'}`}>
                                {quote.quote}
                            </h1>
                            <div className='w-full flex justify-evenly items-center leading-7 mt-[15px]'>
                                <p className='px-[6px] py-[3px] flex justify-center text-[18px] font-semibold'>
                                    {quote.author}
                                </p>
                            </div>
                        </div>
                    )) :
                        <div className='md:w-[773px] w-full mx-auto my-5 h-[263px] bg-[#D05252] text-white rounded-[30px]  flex flex-col md:px-[120px] px-[25px] py-[23px]'>
                            <h1 className={`md:w-[521px] w-full h-[163px] px-[6px] py-[3px]  flex  align-bottom ${true ? 'justify-start' : 'justify-center'}`}>
                                {"There is no quote save in the firestore yet"}
                            </h1>
                            <div className='w-full flex justify-evenly items-center leading-7 mt-[15px]'>
                                <p className='px-[6px] py-[3px] flex justify-center text-[18px] font-semibold'>
                                    {"No Quote - No Author"}
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </Layout>
        </main>
    );
}

export default Saved