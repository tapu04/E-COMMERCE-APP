import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, search, hash } = useLocation();
    const navigationType = useNavigationType(); // PUSH, REPLACE, POP

    useEffect(() => {
        // If user used browser back/forward (POP), scroll instantly
        // For normal navigation, use smooth scroll
        if (navigationType === "POP") {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname, search, hash, navigationType]);

    return null;
};

export default ScrollToTop;
