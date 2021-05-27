import { CardSm } from "..";
import { CardCollectionType } from "./CardCollection.types";
import "./CardCollection.css";
export function CardCollection({
    heading,
    subHeading,
    list,
    addButton,
}: CardCollectionType) {
    return (
        <>
            {list && (
                <div className={`about-us`}>
                    <h1 className={`about-heading`}>{heading}</h1>
                    <p className={`about-text`}>
                        <span>{subHeading}</span>
                    </p>
                    <div className={`card-collection`}>
                        {list.map((item: any) => (
                            <CardSm
                                key={item._id}
                                {...item}
                                addButton={addButton}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
