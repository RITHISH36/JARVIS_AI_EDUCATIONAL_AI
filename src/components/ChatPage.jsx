import { useRef, useState } from "react";
import {  LuArrowUp, LuPanelRight, LuPlus, LuSquarePen } from "react-icons/lu"
const ChatPage = () => {
  const textarearef = useRef(null)
  const [Expanded,setExpanded]=useState(false)
  const handleInput = () => {
    const textarea = textarearef.current;
    textarea.style.height = "auto";

    if (textarea.scrollHeight > 24) {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "auto";
      setExpanded(true);
    }
    else {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";
      setExpanded(false);
    }
  }

  return (
    <>
      <div className="ChatPage">
        <div className="ChatPage-Option">
          <div className="Option-Wapper">
            <div className="window-button">
              <LuPanelRight size={20} />
            </div>
            <div className="NewPage-Button">
              <LuSquarePen size={20} />
            </div>
            <div className="Subcription-button">
              <img src="src/assets/avatar.svg" alt="Subcription" width={30} height={30} />
            </div>
          </div>
        </div>
        <div className="ChatPage-Search">
          <div className={`Search-button ${Expanded? "Search-button-down": ""}`}>
            <LuPlus size={25} className="upload-btn"/>
            <textarea className="input" ref={textarearef} onInput={handleInput}></textarea>
              <button className={Expanded? " downposition ": " default "}>
                  <LuArrowUp size={25} className="arrow"/>
                  </button>
            
          </div>
        </div>
      </div>
    </>
  )
}
export default ChatPage;