import { create } from 'zustand';

interface SearchModalStore {
    isOpen: boolean; // Corrected property name
    onOpen: () => void;
    onClose: () => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }), // Removed extra period after this line
}));

export default useSearchModal;
