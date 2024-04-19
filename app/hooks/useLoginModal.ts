import { create } from 'zustand';

interface LoginModalStore {
    isOpen: boolean; // Corrected property name
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), // Removed extra period after this line
}));

export default useLoginModal;
