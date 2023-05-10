import "./modal.css";

interface IModalProps {
  text: string;
}

const Modal = ({ text }: IModalProps) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h2 className="modal__title">{text}</h2>
        <p>A popup will disappear in few seconds.</p>
      </div>
    </div>
  );
};

export default Modal;
