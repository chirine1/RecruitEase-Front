



import { chatSidebarToggle } from "@/features/toggle/toggleSlice";
import { useDispatch } from "react-redux";


export default function ChatHamburger() {
  const dispatch = useDispatch();

  const chatToggle = () => {
    dispatch(chatSidebarToggle());
  };
  return (
    <>
      <button onClick={chatToggle} className="toggle-contact">
        <span className="fa fa-bars"></span>
      </button>
    </>
  );
}
