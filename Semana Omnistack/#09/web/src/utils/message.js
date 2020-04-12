import { toast } from 'react-toastify';
const Message = ({ message, type }) => toast(message, {
    type: type,
    autoClose: 3000,
    closeOnClick: true,
    position: "top-right",
    closeButton: false,
  })
export default Message;