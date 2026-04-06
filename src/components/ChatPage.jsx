import { useRef, useState } from "react";
import { LuArrowUp, LuPanelLeft, LuPanelRight, LuPlus, LuSquarePen } from "react-icons/lu"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
gsap.registerPlugin(useGSAP)
const DUMMY_OUTPUT = []
const ChatPage = () => {
  const textarearef = useRef(null)
  const [Expanded, setExpanded] = useState(false)
  const [UserInput, setUserInput] = useState(DUMMY_OUTPUT)
  // const [UserOutput, setUserOutput] = useState(DUMMY_OUTPUT)
  const [OptionExpand, setOptionExpand] = useState(false)
  const GsapInput = useRef(null);
  const FileRef = useRef(null)
  const GsapOutput = useRef(null)
  const [SettingsOpen, setSettingsOpen] = useState(false);
  const [File, setFile] = useState([]);
  const [Preview, setPreview] = useState([]);
  const removefile = (index) => {
    setFile((prev) => prev.filter((_, i) => i !== index))
    setPreview((prev) => prev.filter((_, i) => i !== index))
  }
  // handle file of user//
  const handlefile = (e) => {
    const file = Array.from(e.target.files);
    setFile((prev) => [...prev, ...file])
    const filePreview = file.map((file) => {
      if (file.type.startsWith("image/")) {
        return {
          type: "image",
          url: URL.createObjectURL(file),
          name: file.name
        }
      }
      else {
        return {
          type: "file",
          name: file.name
        }
      }
    })
    setPreview((prev) => [...prev, ...filePreview])
    e.target.value = null;
  }


  const handleOption = () => {
    setOptionExpand(!OptionExpand)
  }
  console.log(OptionExpand);
  const handelSettings = (el) => {
    el.preventDefault();
    setSettingsOpen(!SettingsOpen);
  }


  const handleSubmit = async (el) => {
    el.preventDefault();
    gsap.from(GsapInput.current, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      delay: 0.1,
      ease: "power2.out"
    });
    const data = textarearef.current.value;
    const formData = new FormData();
    formData.append("UserInput", data);
    File.forEach((file) => { formData.append("file", file) });
    setUserInput((prev) => [...prev, { role: "user", output: data }])
    console.log(UserInput)
    const Respone = await fetch("http://localhost:3000/AiResponse", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserInput: data })

    });
    const FileInput = await fetch("http://localhost:3000/pdf", {
      method: "POST",
      credentials: "include",
      body: formData
    })

    try {
      console.log(Respone)
      const JarvisResponse = await Respone.json();
      setUserInput((prev) => [...prev, { role: "Gemini", output: JarvisResponse }])
    }
    catch (err) {
      console.log("error in response message")
    }
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
              <p key={index} className={`Chat-Box ${el.role === "user" ? "UserInput" : "UserOutput"}`}>{el.output}</p>
            ) : null
          })}
        </div>
        <div className={`ChatPage-Search ${UserInput.length === 0 ? "centre" : ""}`} >
          <div className={`Search-button ${Expanded ? "Search-button-down" : ""}`}>

            <LuPlus size={25} className={Expanded ? "downside" : "upload-btn"} onClick={() => FileRef.current.click()} />
            <input type="file" ref={FileRef} style={{ display: "none" }} onChange={handlefile} />
            {Preview.length > 0 && (
              <div className="file-preview">
                {Preview.map((file, index) => {
                  return (
                    <div className="files">
                      {file.type === "image" ? (<img src={file.url} alt="previewimage" />) : (<span>{file.name}</span>)}
                      <button className="file-cancle" onClick={() => removefile(index)}>X</button>
                    </div>
                  )
                })}
              </div>
            )}
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