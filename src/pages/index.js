import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


const Home = () => {
    const router = useRouter();
    const [user, setUser] = useAuthState(auth)
    const [quote, setQuote] = useState('');
    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
        fetchQuote();
    }, [router, user])

    const fetchdata = async () => {
        const response = await fetch("https://api.quotable.io/random");
        setQuote(await response.json());

    };
    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    const storeQuote = async (data) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.error('User not authenticated.');
                return;
            }

            const userId = user.uid;

            const quoteData = {
                quote: data.content,
                author: data.author,
                userId: userId,
                createdAt: serverTimestamp(),
            };

            const quotesRef = collection(db, 'quotes');
            await addDoc(quotesRef, quoteData);
            window.alert('Quote stored in the firestore database, successfully !!');
        } catch (error) {
            console.log('Error storing quote:', error);
        }
    };

    return (
        <main className="flex w-full flex-col items-center justify-center text-dark">
            <Layout className="pt-6 lg:pt-2">
                <div className="flex flex-col mt-[143px] px-5">
                    {
                        user &&
                        <h1 className='text-white mb-16 font-semibold text-xl'>Welcome , {`${user.displayName}`}</h1>
                    }
                    <div className='md:w-[773px] w-full mx-auto  h-[263px] bg-[#D05252] text-white rounded-[30px]  flex flex-col md:px-[120px] px-[25px] py-[23px]'>
                        <h1 className={`md:w-[521px] w-full h-[163px] px-[6px] py-[3px]  flex  align-bottom ${quote ? 'justify-start' : 'justify-center'}`}>
                            {quote ? quote.content : "Quote not fetched yet"}
                        </h1>
                        <div className='w-full flex justify-evenly items-center leading-7 mt-[15px]'>
                            <p className='px-[6px] py-[3px] flex justify-center text-[18px] font-semibold'>
                                - {quote && quote.author}
                            </p>
                            <button
                                className="bg-[#283db3] hover:bg-[#283de0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#283d3b]"
                                onClick={() => storeQuote(quote)}>
                                Store Quote
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center my-[75px] '>
                        <button onClick={fetchdata} className='w-[240px] h-[38px] next-button'>
                            <div className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >Next Quote</div>
                        </button>
                    </div>
                </div>
            </Layout>
        </main>
    );
};

export default Home;
