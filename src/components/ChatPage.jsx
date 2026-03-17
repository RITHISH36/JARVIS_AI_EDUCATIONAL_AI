import { useRef, useState } from "react";
import { LuArrowUp, LuPanelLeft, LuPanelRight, LuPlus, LuSquarePen } from "react-icons/lu"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
gsap.registerPlugin(useGSAP)
const DUMMY_OUTPUT = [{
  output: "this is a out from gemini."
}]
const ChatPage = () => {
  const textarearef = useRef(null)
  const [Expanded, setExpanded] = useState(false)
  const [UserInput, setUserInput] = useState([])
  const [UserOutput, setUserOutput] = useState(DUMMY_OUTPUT)
  const [OptionExpand, setOptionExpand] = useState(false)
  const GsapInput = useRef(null);
  const Gsapchat = useRef(null)
  const GsapOutput = useRef(null)
  const [SettingsOpen, setSettingsOpen] = useState(false);
  const handleOption = () => {
    setOptionExpand(!OptionExpand)
  }
  console.log(OptionExpand);
  const handelSettings = (el) => {
    el.preventDefault();
    setSettingsOpen(!SettingsOpen);
  }
  const handleSubmit = (el) => {
    el.preventDefault();
    gsap.from(GsapInput.current, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      delay: 0.1,
      ease: "power2.out"
    });
    gsap.from(GsapOutput.current, {
      y: 20,
      duration: 0.4,
      delay: 0.1,
      ease: "power2.inOut"
    })
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
        <div className={`Option-Wapper ${OptionExpand ? "Option-Open" : ""}`}>
          <div className="window-button">
            <LuPanelRight size={20} onClick={handleOption} />
          </div>
          <div className="NewPage-Button">
            <LuSquarePen size={20} />
            <span className={OptionExpand ? "Display" : "NotDisplay"}>New Page</span>
          </div>
          {OptionExpand ? (<>
            <div className="Super-Option">
              <div className="My-stuff">
                <Icon icon="lsicon:data-outline" width={24} />
                <span>My Stuff</span>
              </div>
              <div className="Smart-view">
                <Icon icon="material-symbols:youtube-video-outline-rounded" width={24} />
                <span>Smart View</span>
              </div>
              <div className="Insight-Scale">
                <Icon icon="iconamoon:scanner-bold" width={24} />
                <span>Insight Scale</span>
              </div>
              <div className="Knowledge-Tree">
                <Icon icon="tdesign:map-connection" width={24} />
                <span>Knowledge Tree</span>
              </div>
              <div className="Daily-Sparks">
                <Icon icon="material-symbols:quiz-outline" width={24} />
                <span>Daily Sparks</span>
              </div>
              <div className="Insight-Board">
                <Icon icon="akar-icons:dashboard" width={24} />
                <span>Insight Board</span>
              </div>
            </div>
            <hr className="Horizontal-Line" />
            <div className="User-Account-Option">
              {SettingsOpen ? (<div className="Settings-Option">
                <ul style={{ listStyle: "none" }}>
                  <li className="User-Name">Name<div className="Email">email</div></li>
                  <hr className="Horizontal-Settings" />
                  <li className="User-Customization">AI Control Panel</li>
                  <li className="User-Settings">Control Center</li>
                  <hr className="Horizontal-Settings" />
                  <li className="Help-Centre">Help Center</li>
                  <li className="Log-out">Power Down</li>
                </ul>
              </div>) : null}
              <div className="User-Profile" onClick={handelSettings}>
                <img src="src/assets/Dummy_profile.jpg" alt="User-Profile" />
              </div>
              <div className="Claim-offer">
                <button>Claim Offers</button>
              </div>
            </div>
          </>
          ) : null}
          <div className="Subcription-button">
            <img src="src/assets/avatar.svg" alt="Subcription" width={30} height={30} />
          </div>
        </div>
      </div>

      <div className="ChatPage">
        <div className="ChatPage-Input" ref={GsapInput}>
          {UserInput.map((el, index) => {
            return el ? (
              <p key={index} className="UserInput">{el}</p>
            ) : null
          })}
          <div className="Jarvis-res">
          <div className="ChatPage-Output" ref={GsapOutput}>
            {UserOutput.map((el, index) => {
              return <p className="UserOutput">{el.output}</p>
            })}
          </div>
        </div>
        </div>
        
        <div className={`ChatPage-Search ${UserInput.length === 0 ? "centre" : ""}`} >
          <div className={`Search-button ${Expanded ? "Search-button-down" : ""}`}>
            <LuPlus size={25} className={Expanded ? "downside" : "upload-btn"} />
            <textarea className="input" ref={textarearef} onInput={handleInput}></textarea>
            <button className={Expanded ? "downposition" : "default"} type="button" onClick={handleSubmit}>
              <LuArrowUp size={25} className="arrow" />
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
export default ChatPage;