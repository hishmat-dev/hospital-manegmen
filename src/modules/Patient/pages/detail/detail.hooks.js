import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPatient, setLoading, setError } from "../../../../store/slices/patientSlice";

export const useDetailHooks = (patientId="P-1001") => {
  const dispatch = useDispatch();
  const { patients, selectedPatient, loading, error } = useSelector((state) => state.patients);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    console.log("useDetailHooks - patientId:", patientId);
    console.log("useDetailHooks - selectedPatient:", selectedPatient);
    console.log("useDetailHooks - patients:", patients);
    console.log("useDetailHooks - loading:", loading);
    console.log("useDetailHooks - error:", error);

    if (patientId) {
      dispatch(setLoading(true));
      console.log("patients",patients);
      const existingPatient = patients.find((p) => p.id === patientId);
      console.log("useDetailHooks - existingPatient:", existingPatient);
      if (existingPatient) {
        setPatient(existingPatient);
        dispatch(setSelectedPatient(existingPatient));
      } else {
        setPatient(null);
        dispatch(setError(`Patient with ID ${patientId} not found`));
      }
      dispatch(setLoading(false));
    }
  }, [patientId, dispatch, patients]);

  return { patient, loading, error };
};