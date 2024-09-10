import { useContext } from 'react';
import { StateContext } from '../context/state';

const AddLinkButton = () => {
    const { addSocialCard } = useContext(StateContext);


    const handleAddCard = () => {
        console.log('AddLinkButton clicked');
        addSocialCard();
        console.log('SocialCards after adding:', addSocialCard);
    };

    return (
        <button 
            onClick={handleAddCard}
            className="w-full h-auto px-[27px] py-[11px] gap-[8px] rounded-[8px]  font-instrument-sans text-[16px] font-semibold leading-[24px] hover:bg-[#EFEBFF]  bg-none border border-[#633CFF] text-[#633CFF]">
            +Add new link
        </button>
    );
};

export default AddLinkButton

















{/* <button 
                onClick={handleShowsocial}
                className="w-full h-auto px-[27px] py-[11px] gap-[8px] rounded-[8px] font-instrument-sans text-[16px] font-semibold leading-[24px] hover:bg-[#EFEBFF]  bg-none border border-[#633CFF] text-[#633CFF]">
                  +Add new link
                </button> */}