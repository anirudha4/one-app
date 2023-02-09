import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAuthStatusSelector } from "../../selectors/current";

const withGaurd = (WrappedComponent) => {
    return function Component(props) {
        const { isLoggedIn, currentUser } = useSelector(currentAuthStatusSelector);
        const location = useLocation();
        if (!isLoggedIn) {
            const navigation_url = `/auth${location.search}`;
            return <Navigate to={navigation_url} />
        }
        if (!currentUser.isEmailVerified) {
            return <Navigate to={'/verify_email'} />
        }
        return <WrappedComponent {...props} />;
    }
};
withGaurd.displayName = 'withGaurd';
export default withGaurd