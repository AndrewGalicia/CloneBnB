'use client'

// UserMenu component

// Import necessary dependencies
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem'; // Import MenuItem component
import { useCallback, useState} from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/Types';
import useRentModal from '@/app/hooks/useRentModal';

// Define UserMenuProps interface
interface UserMenuProps {
    currentUser?: SafeUser | null
}

// Define UserMenu component
export default function UserMenu({currentUser}: UserMenuProps) {
    // Define state variables and event handlers
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
         }
         rentModal.onOpen()
        }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                {/* Bearbnb your cave section */}
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Bearbnb your cave
                </div>
                {/* Menu toggle section */}
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        transition
                    "
                >
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {/* Menu items section */}
            {isOpen && (
                <div
                    className='
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    '
                >
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                             <>
                                <MenuItem
                                    onClick={() => {}}
                                    label="My Trips"
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label="My Favorites"
                                />
                                <MenuItem
                                    onClick={()=> {}}
                                    label="My reservations"
                                />
                                <MenuItem
                                    onClick={()=> {}}
                                    label="My caves"
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="Bearbnb my home"
                                />
                                <hr />
                                <MenuItem
                                    onClick={()=> signOut()}
                                    label="Logout"
                                />
                         </>
                        ) : (
                          <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign Up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

