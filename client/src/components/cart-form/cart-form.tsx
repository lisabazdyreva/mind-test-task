import { ChangeEvent, FormEvent, useState } from "react";
import { InfoContentMessage, InfoStatusMessage } from "../../utils/const.ts";

interface ICartFormProps {
  onSubmitCartFormHandler: (
    evt: FormEvent,
    phoneNumber: string,
    clearInput: () => void
  ) => void;
  onResetCartFormHandler: (clearInput: () => void) => void;
  isCartFull: boolean;
  isSending: boolean;
  isRemoving: boolean;
}

const CartForm = ({
  onSubmitCartFormHandler,
  onResetCartFormHandler,
  isCartFull,
  isSending,
  isRemoving,
}: ICartFormProps) => {
  const clearInput = () => {
    setPhoneNumber("");
    setIsPhoneNumberValid(false);
  };

  const onSubmitCartFormHandlerH = async (evt: FormEvent) => {
    if (isPhoneNumberValid) {
      await onSubmitCartFormHandler(evt, phoneNumber, clearInput);
    }
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const onChangePhoneNumberInputHandler = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    if (value === "" || value === "+" || Number(value)) {
      setPhoneNumber(value);
    }
  };

  const onInputPhoneNumberInputHandler = (evt: FormEvent<HTMLInputElement>) => {
    const cleanedNumber = (evt.target as HTMLInputElement).value.replace(
      /\D/g,
      ""
    );
    setIsPhoneNumberValid(/^(\+?7|8)9\d{9}$/.test(cleanedNumber));
  };

  const onResetCartFormHandlerH = async () => {
    await onResetCartFormHandler(clearInput);
  };

  const isPostOrderDisabled = !isCartFull || !phoneNumber.length;
  const isButtonSubmitDisabled =
    !isCartFull || isSending || isRemoving || !isPhoneNumberValid;
  const isButtonResetDisabled = !isCartFull || isSending || isRemoving;

  const disableWarningElement = <p>{InfoContentMessage.EmptyCart}</p>;

  return (
    <form onSubmit={onSubmitCartFormHandlerH} onReset={onResetCartFormHandlerH}>
      <label htmlFor="user_phone_number">Where to post order</label>
      <input
        id="user_phone_number"
        type="tel"
        placeholder="Enter your phone number, please"
        value={phoneNumber}
        onChange={onChangePhoneNumberInputHandler}
        onInput={onInputPhoneNumberInputHandler}
      />
      <p>{isPhoneNumberValid ? "Correct" : "Format: +79.... or 89..."}</p>

      <button type="reset" disabled={isButtonResetDisabled}>
        {isRemoving ? InfoStatusMessage.Removing : "Remove cart"}
      </button>
      <button type="submit" disabled={isButtonSubmitDisabled}>
        {isSending ? InfoStatusMessage.Sending : "Send cart"}
      </button>
      {isPostOrderDisabled && disableWarningElement}
    </form>
  );
};

export default CartForm;
