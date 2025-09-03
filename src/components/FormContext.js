// src/context/FormContext.js
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(); // start at step 1
  const navigate = useNavigate();

  const goToStep = (step) => {
    setCurrentStep(step);
    navigate(`/step${step}`);
  };

  return (
    <FormContext.Provider value={{ currentStep, setCurrentStep, goToStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
