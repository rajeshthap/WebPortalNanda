// src/components/ProtectedStepRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const ProtectedRoute = ({ step, children }) => {
  const { currentStep } = useFormContext();

  if (currentStep < step) {
    return <Navigate to={`/step${currentStep}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
