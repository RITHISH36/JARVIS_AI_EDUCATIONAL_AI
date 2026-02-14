import Lottie from "lottie-react";
import Arcreactorsvg from "../../assets/iron man.json";
const ReactLottie=()=>{
    return(
    <>
    <div className="lottie">
        <div className="reactor-lottie">
         <Lottie animationData={Arcreactorsvg} 
         loop={true}
         autoPlay={true}/>
        </div>
    </div>
    </>
    )
}
export default ReactLottie;