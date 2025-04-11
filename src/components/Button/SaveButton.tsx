interface CancelButtonProps {
    onClick: () => void;
}

function SaveButton({ onClick }: CancelButtonProps) {
    return (
        <button onClick={onClick} className="bg-blue-500 text-white py-2 px-4 rounded">
            Save
        </button>
    );
}

export default SaveButton;