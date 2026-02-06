import { useContext } from 'react';
import VidaZenContext from '../context/VidaZenProvider';

const useVidaZen = () => {
    return useContext(VidaZenContext);
}
export default useVidaZen;