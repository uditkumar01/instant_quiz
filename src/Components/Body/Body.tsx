import { CardCollection } from "..";
import useDataContext from "../../Context/DataContext/DataContext";
import { CardDataType } from "../CardCollection/CardCollection.types";
import { ContactUs } from "../ContactUs/ContactUs";
import "./Body.css";

export function Body() {
    const { dataState } = useDataContext();
    const cardData: CardDataType[] = [
        {
            title: `Achieve Your Goals`,
            content: `Each thing you learn is an achievement. Instant Quiz breaks down topics, so you accomplish something new every step of the way.`,
            image: "https://webengage.com/blog/wp-content/uploads/sites/4/2018/04/How-to-Use-an-Interactive-Quiz-to-Boost-Your-Online-Conversions.png",
        },
        {
            title: `Responsive Design Layout`,
            content: `We have this web app responsive for your comfort and ease of access. You don't need any app this will give you much better experience.`,
            image: `https://assets.justinmind.com/wp-content/uploads/2020/09/responsive-design-adaptive-design-ux-design-responsive-websites-examples-ui-header.png`,
        },
        {
            title: `Online Quiz Battles`,
            content: `You can do quiz battles with your friends you can even create you own quiz challenge.`,
            image: `https://blog.capterra.com/wp-content/uploads/2019/07/HEAD-HEAD-Your_One-Click_Guide_to_Online_Quiz_Design-_The_Easiest_Way_to_Catch_New_Leads-Hero_no_text_international-1200x630.png`,
        },
        {
            title: `Informative Questions`,
            content: `We have selected the best questions to give you an amazing learning experience.`,
            image: `https://wpeverest.com/blog/wp-content/uploads/2019/08/Best-WordPress-Quiz-Plugins.jpg`,
        },
    ];
    return (
        <>
            <div className={`container-body`}>
                <CardCollection
                    list={cardData}
                    heading={`Learn and Explore`}
                    subHeading={`So if you want to know more about what we and what this website is all about then check this out.`}
                />
                <CardCollection
                    list={dataState!.quizData}
                    addButton={true}
                    heading={`Quiz Time`}
                    subHeading={`So whom you are waiting for lets do a quick test of your knowledge. Choose one quiz and get started.`}
                />
                <ContactUs />
            </div>
        </>
    );
}
