import { useSelector, useDispatch } from "react-redux";
import { setGlobalLoading } from '@/store/appSlice.js';


function useApp() {
    const dispatch = useDispatch()
    const appState = useSelector(state => state.app)

    return {
        ...appState,
        setLoading: (value) => dispatch(setGlobalLoading(value))
    }
}

export default useApp;