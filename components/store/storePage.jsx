import CtaSection from "@/components/store/ctaSection";
import { ctaSection, ctaSectionTwo,ctaSectionTwos,cardSection,ctaSectionTwos1,cardSectionTwo} from "../../assets/DummyData";
import Card from "@/components/store/card";
import CtaSectionTwo from "@/components/store/ctaSectionTwo";
import CtaSectionThree from "@/components/store/ctaSectionThree";
import CardTwo from "@/components/store/cardTwo";
export default function StorePage() {
    return (
        <div className="mx-auto max-w-7xl sm:px-4 mt-5 lg:px-8 bg-white">
            {ctaSection.map((item) => (
                <CtaSection key={item.name} content={item} />
            ))}
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl my-10">
                Take a look at<span className="text-gray-500"> what’s new</span></h2>
            {ctaSectionTwo.map((item) => (
                <CtaSection key={item.name} content={item} />
            ))}
            <Card content={cardSection}/>
            {ctaSectionTwos.map((item) => (
                <CtaSectionTwo key={item.name} content={item} />
            ))}
            <CtaSectionThree content={ctaSectionTwos1}/>
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl my-10">
            Check out<span className="text-gray-500"> our top accessories</span></h2>
            <CardTwo content={cardSectionTwo}/>
        </div>
    )
}