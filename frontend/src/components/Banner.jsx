import { Link } from "react-router-dom";
function Banner() {
    return (
        <>
        <div className="banner">
            <div className="b-image">
                <img src="https://oyefill.vercel.app/assets/images/registration-form.png" alt="" />
            </div>

            <div className="content">
                <h1>FILL THE FORM SMOOTHLY</h1>
                <h2>Fill Any Form In Just 19 Rs</h2>
               <Link to="/alerts"> <button>Alerts</button></Link>
                 <Link to="/form">  <button>Forms</button></Link>
            </div>
        </div>
        </>
    )
}
export default Banner;  