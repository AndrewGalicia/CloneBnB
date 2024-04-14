import { create } from 'zustand';

interface RegisterModalStore {
    isOpen: boolean; // Corrected property name
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), // Removed extra period after this line
}));

export default useRegisterModal;
