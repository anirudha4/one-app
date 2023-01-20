import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAuthStatusSelector } from "../../selectors/current";

const withGaurd = (WrappedComponent) => {
    return function Component(props) {
        const { isLoggedIn } = useSelector(currentAuthStatusSelector);
        if (!isLoggedIn) {
            return <Navigate to={'/auth'} />
        }
        return <WrappedComponent {...props} />;
    }
};
withGaurd.displayName = 'withGaurd';
export default withGaurd