// frontend\src\pages\expert\chat\ChatPage.tsx

import ExpertList from '../../../components/expert/chat/ExpertList';
import ChatInterface from '../../../components/expert/chat/ChatInterface';


const dummyExperts = [
    {
        id: 1,
        name: 'Dr. John Doe',
        profession: 'Psychologist',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c6310b8704a1f48d005623462dbcd466b1b0a94709e3bcadfeb4dea4c2c09432?apiKey=62cb0e3201dd4b038734137173080a0d&',
        isOnline: true,
    },
    {
        id: 2,
        name: 'Jane Smith',
        profession: 'Software Engineer',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c6310b8704a1f48d005623462dbcd466b1b0a94709e3bcadfeb4dea4c2c09432?apiKey=62cb0e3201dd4b038734137173080a0d&',
        isOnline: false,
    },
    {
        id: 3,
        name: 'Emily Johnson',
        profession: 'Nutritionist',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c6310b8704a1f48d005623462dbcd466b1b0a94709e3bcadfeb4dea4c2c09432?apiKey=62cb0e3201dd4b038734137173080a0d&',
        isOnline: true,
    },
    {
        id: 4,
        name: 'Michael Brown',
        profession: 'Financial Advisor',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c6310b8704a1f48d005623462dbcd466b1b0a94709e3bcadfeb4dea4c2c09432?apiKey=62cb0e3201dd4b038734137173080a0d&',
        isOnline: false,
    },
    {
        id: 5,
        name: 'Sarah Davis',
        profession: 'Career Coach',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c6310b8704a1f48d005623462dbcd466b1b0a94709e3bcadfeb4dea4c2c09432?apiKey=62cb0e3201dd4b038734137173080a0d&',
        isOnline: true,
    },
];


const ChatPage = () => {
    return (
        <main className="justify-center bg-white rounded-xl border border-solid border-zinc-200">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <aside className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                    <ExpertList experts={dummyExperts} />
                </aside>
                <section className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
                    <ChatInterface />
                </section>
            </div>
        </main>
    );
};

export default ChatPage;
