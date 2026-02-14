const Button = (props) => {
    const { text } = props;
    return (
        <>
            <div className="btn">
                <button>{text} &nbsp;<span className="button-arrow" style={{ paddingLeft: "2px", fontSize: "16px" }}><b>&gt;</b></span></button>
            </div>
        </>
    )
}
export default Button;