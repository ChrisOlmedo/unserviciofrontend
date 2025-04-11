
interface CancelButtonProps {
    onClick: () => void;
}

function CancelButton({ onClick }: CancelButtonProps) {
    return (
        <button onClick={onClick} className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel
        </button>
    );
}

export default CancelButton;