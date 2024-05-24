'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;

}

export default function HeartButton({listingId, currentUser}: HeartButtonProps) {
    const hasFavorited = false;
    const toggleFavorite = () => {} 
    return(
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
                "
                >
                    <
                    AiOutlineHeart
                    size={28}
                        className="
                            fill-white
                            absolute
                            -top-[2px]
                            -right-[2px]"/>
                    <AiFillHeart
                    size={24}
                    className={
                     hasFavorited ? 'fill-rose-600': 'fill-neutral-500/70'
                    }
                    />
                        </div>
    )
}