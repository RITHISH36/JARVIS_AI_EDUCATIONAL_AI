import { useRef, useState } from "react";
import { LuArrowUp, LuPanelRight, LuPlus, LuSquarePen } from "react-icons/lu"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP)
const ChatPage = () => {
  const textarearef = useRef(null)
  const [Expanded, setExpanded] = useState(false)
  const [UserInput, setUserInput] = useState([])
  const GsapInput = useRef(null);
  const Gsapchat = useRef(null)
  const handleSubmit = (el) => {
    gsap.from(GsapInput.current, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      delay: 0.1,
      ease: "power2.out"
    });
    el.preventDefault();
    const data = textarearef.current.value;
    setUserInput((prev) => [...prev, data])
    console.log(UserInput)
    textarearef.current.value = "";
    handleInput();
  }

  const handleInput = () => {
    const textarea = textarearef.current;
    textarea.style.height = "auto";

    if (textarea.scrollHeight > 12) {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "auto";
      setExpanded(true);

      if (textarea.scrollHeight > 125) {
        textarea.style.height = "125px";
      }
    }
    else {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";
      setExpanded(false);
    }
    if (textarea.value === "") {
      textarea.style.height = "auto";
      setExpanded(false);
    }
  }
  console.log(Expanded);
  return (
    <>
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

      <div className="ChatPage">
        <div className="ChatPage-Input" ref={GsapInput}>
          {UserInput.map((el, index) => {
            return <p key={index} className="UserInput">{el}</p>
          })}
        </div>
        <div className={`ChatPage-Search ${UserInput.length ===0?"centre":""}`} >
          <div className={`Search-button ${Expanded ? "Search-button-down" : ""}`}>
            <LuPlus size={25} className={Expanded ? "downside" : "upload-btn"} />
            <textarea className="input" ref={textarearef} onInput={handleInput}></textarea>
            <button className={Expanded ? "downposition" : "default"} type="submit" onClick={handleSubmit}>
              <LuArrowUp size={25} className="arrow" />
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
export default ChatPage;