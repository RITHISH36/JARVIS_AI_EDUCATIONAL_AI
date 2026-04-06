const Button = (props) => {
    const { text} = props;
    const handlelogin =()=>{
    console.log("hi")
     window.location.href="http://localhost:3000/auth/google";
  }
    return (
        <>
            <div className="btn">
                <button onClick={handlelogin}>{text} &nbsp;<span className="button-arrow" style={{ paddingLeft: "2px", fontSize: "16px" }} ><b>&gt;</b></span></button>
            </div>
        </>
    )
}
export default Button;