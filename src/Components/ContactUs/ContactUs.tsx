import { Button } from "@material-ui/core";
import {
    AiOutlineMail,
    BiPaperPlane,
    GoLocation,
    IoCalendarClearOutline,
    IoCallOutline,
} from "react-icons/all";
import { FormInput } from "../FormInput/FormInput";

export function ContactUs() {
    return (
        <>
            <div className="about-us">
                <h3 className="about-heading">Contact Us</h3>
                <p className={`about-text`}>
                    <span>
                        So if you want to know more about what we and what this
                        website is all about then check this out.
                    </span>
                </p>
            </div>
            <div className="row">
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.3649120726877!2d76.80064021436948!3d30.708140193870072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fecea554a782f%3A0xfe56912e1b710d34!2sHometel%20Chandigarh!5e0!3m2!1sen!2sin!4v1598196270380!5m2!1sen!2sin"
                        className={`map-iframe`}
                        title={`map`}
                        allowFullScreen={true}
                        aria-hidden="false"
                        tabIndex={0}
                        frameBorder={0}
                    ></iframe>
                </div>
                <div className={`details`}>
                    <span>
                        <div className="row-entity">
                            <i>
                                <GoLocation />
                            </i>
                            <p>#147 Industrial Area Phase 1 Chandigarh</p>
                        </div>
                        <div className="row-entity">
                            <i>
                                <IoCalendarClearOutline />
                            </i>
                            <p>24x7 active</p>
                        </div>
                    </span>
                    <span>
                        <div className="row-entity">
                            <i>
                                <AiOutlineMail />
                            </i>
                            <p>demo@example.com</p>
                        </div>
                        <div className="row-entity">
                            <i>
                                <IoCallOutline />
                            </i>
                            <p>+91 xxx xxx xxxx</p>
                        </div>
                    </span>

                    <div className={`form-field`}>
                        <FormInput label={`name`} />
                        <FormInput label={"email"} />
                        <FormInput label={"message"} rows={4} />
                        <div className={`send-btn`}>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<BiPaperPlane />}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
