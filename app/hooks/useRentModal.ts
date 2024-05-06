import { create } from 'zustand';

interface RentModalStore {
    isOpen: boolean; // Corrected property name
    onOpen: () => void;
    onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), // Removed extra period after this line
}));

export default useRentModal;
