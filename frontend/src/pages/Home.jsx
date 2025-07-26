import Banner from "../components/Banner";
import Category from "../components/Category";
;
import Footer from "../components/Footer";
import FormSection from "../components/FormSection";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
        <Navbar/>
        <Banner/>
       <Category/>

        <div className="info">
            <h3 className="info-one">""Don't be affraid from sending data, oyefill are always with you""</h3>

            <p className="info-p">
                ""This is a security policy,Our website does not use your data in any other way,
                but we need to fill your form,which is necessary for your form and we keep your data
                protected whenever  you fill any  form . we can use for you. ""
            </p>
        </div>
    <FormSection/>
        <Footer/>
        </>
    )
}
export default Home;