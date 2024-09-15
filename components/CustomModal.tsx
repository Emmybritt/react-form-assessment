import { FormData } from "@/app/hooks/useForm";
import { Modal } from "antd";

interface CustomModalProps {
  isOpen: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  formData?: FormData | null;
}
const CustomModal = ({
  isOpen,
  handleCancel,
  handleOk,
  formData,
}: CustomModalProps) => {
  return (
    <Modal
      title="Registeration successfull"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>
        <b>Unique Id</b>: {formData?.uniqueId}
      </p>
      <p>
        <b>Name:</b> {formData?.name}
      </p>
      <p>
        <b>Email:</b> {formData?.email}
      </p>
      <p>
        <b>Contact Number:</b> {formData?.contact}
      </p>
      <p>
        <b>Country:</b> {formData?.country}
      </p>
      <p>
        <b>State:</b> {formData?.state}
      </p>
      <p>
        <b>City:</b> {formData?.city}
      </p>
    </Modal>
  );
};

export default CustomModal;
