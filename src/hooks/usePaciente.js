import { useContext } from 'react';
import PacienteContext from '../context/PacienteProvider';

const usePaciente = () => {
    return useContext(PacienteContext);
}
export default usePaciente;