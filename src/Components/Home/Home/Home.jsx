import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
const Home = () => {
    return (
        <div className="  ">
            <Helmet>
                <title className="">InfanPortfolio</title>
                <meta name="description"  content="Infan Jioun Rahman's Developer Portfolio" />
            </Helmet>
            <Banner></Banner>

        </div>
    );
};

export default Home;