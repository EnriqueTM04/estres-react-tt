import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import dayjs from "dayjs";

const VidaZenContext = createContext();

const VidaZenProvider = ({ children }) => {

  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('isoWeek'));
  const [citas, setCitas] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [modalidad, setModalidad] = useState('presencial');

  const obtenerCitasPorSemana = async (week) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    try {
      const {data} = await clienteAxios(`/api/sesiones?week=${week}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      setCitas(data);
    } catch (error) {
      console.error('Error al traer citas', error);
    }
  };

  const getCita = (dia, hora) =>
    citas.find(c =>
      c.fecha === dia.format('YYYY-MM-DD') &&
      c.hora.startsWith(hora)
    );

  const startOfWeek = currentWeek.startOf('isoWeek'); // lunes real
  const daysOfWeek = Array.from({ length: 5 }).map((_, i) =>
    startOfWeek.add(i, 'day')
  );

  useEffect(() => {
    obtenerCitasPorSemana(currentWeek.format('YYYY-MM-DD'));
  }, [currentWeek]);


  return (
    <VidaZenContext.Provider
      value={{
        currentWeek,
        setCurrentWeek,
        citas,
        daysOfWeek,
        getCita,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedCita,
        setSelectedCita,
        modalidad,
        setModalidad,
        obtenerCitasPorSemana
      }}
    >
      {children}
    </VidaZenContext.Provider>
  );
};

export { VidaZenProvider };
export default VidaZenContext;
