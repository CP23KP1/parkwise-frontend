import Modal from "react-responsive-modal";

interface DeleteModalProps {
    modalHeader: string
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal:React.FC<DeleteModalProps> = ({open, onClose, onDelete, modalHeader}) => {
    return (
        <Modal open={open} onClose={onClose} center>
            <div className="flex flex-col gap-5">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold">{modalHeader}</h1>
                </div>
                <div className="flex justify-center">
                    <button className="btn bg-red-400 py-2 px-4 rounded-md text-white" onClick={onDelete}>Delete</button>
                    <button className="btn bg-gray-400 py-2 px-4 rounded-md text-white" onClick={onClose}>Cancel</button>
                </div>
            </div>
            </Modal>
    )
}

export default DeleteModal;