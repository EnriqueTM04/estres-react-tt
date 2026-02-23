import { useContext } from 'react';
import CitasContext from '../context/CitasProvider';

const useCitas = () => {
    return useContext(CitasContext);
}
export default useCitas;