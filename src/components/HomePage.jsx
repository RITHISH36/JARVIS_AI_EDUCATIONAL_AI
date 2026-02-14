import Button from "./button/Button";
import Header from "./Header";
import ReactLottie from "./lottie/ReactLottie";

const HomePage = () => {
  return (<>
  <ReactLottie/>
    <div className="Home-Page">
      <div className="HomePage-content-hdr">
        <Header />
      </div>
      <div className="about-content">

        <div className="about-quotes">
          <h1>Learn smarter. Prepare better. Succeed faster.</h1>
        </div>
        <div className="about-statement">
          Introducing Jarvis AI. Smarter answers. Faster insights. Built-in academic intelligence. Designed for everyone.
        </div>
        <div className="start-button">
          <Button text="Start Now" />
        </div>
        <div className="Learn-button">
          <div className="learn-btn">
            <button>Learn about Jarvis</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default HomePage;