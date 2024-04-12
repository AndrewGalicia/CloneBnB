'use client';

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

function MenuItem({ onClick, label }: MenuItemProps): JSX.Element {
    return (
        <div
            onClick={onClick}
            className="px-4 py-3 transition font-semibold"
        >
            {label}
        </div>
    );
}

export default MenuItem;
