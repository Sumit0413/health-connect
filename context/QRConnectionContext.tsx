import React, { createContext, useContext, useState, ReactNode } from "react";

export type ConnectionState =
  | "idle"
  | "doctor_waiting"
  | "patient_scanning"
  | "patient_details"
  | "patient_consent"
  | "connected";

export interface DoctorInfo {
  name: string;
  specialization: string;
  hospital: string;
}

export interface VisitRecord {
  date: string;
  diagnosis: string;
  doctor: string;
  notes: string;
}

export interface PatientData {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  medicalHistory: string[];
  medications: string[];
  allergies: string[];
  reports: { name: string; date: string; result: string }[];
  prescriptions: string[];
  visitHistory: VisitRecord[];
}

interface QRConnectionContextType {
  connectionState: ConnectionState;
  doctorInfo: DoctorInfo;
  patientData: PatientData;
  sessionId: string;
  doctorId: string;
  setConnectionState: (state: ConnectionState) => void;
  startDoctorSession: () => void;
  scanDoctorQR: (doctorId: string, sessionId: string) => void;
  approveAccess: () => void;
  confirmSharing: () => void;
  resetSession: () => void;
}

const defaultDoctorInfo: DoctorInfo = {
  name: "Dr. Vikram Mehta",
  specialization: "Cardiologist",
  hospital: "Metro Heart Hospital",
};

const mockPatientData: PatientData = {
  name: "Rahul Sharma",
  age: 28,
  gender: "Male",
  bloodGroup: "B+",
  height: "178 cm",
  weight: "72 kg",
  medicalHistory: ["Asthma", "Seasonal Allergies"],
  medications: ["Inhaler (Albuterol 100mcg - 2 puffs as needed)"],
  allergies: ["Penicillin"],
  reports: [
    { name: "Blood Test (CBC)", date: "15-May-2026", result: "Normal (Hb: 14.5, WBC: 6500)" },
    { name: "Chest X-Ray", date: "10-Apr-2026", result: "Clear lungs, no active infiltrates" },
  ],
  prescriptions: [
    "Montelukast 10mg (1 tablet daily at night)",
    "Fluticasone Nasal Spray (1 spray each nostril daily)",
  ],
  visitHistory: [
    {
      date: "12-Apr-2026",
      diagnosis: "Seasonal Asthma Exacerbation",
      doctor: "Dr. Vikram Mehta",
      notes: "Symptoms controlled with inhaler. Prescribed Montelukast. Follow up in 2 months.",
    },
    {
      date: "05-Jan-2026",
      diagnosis: "Annual Health Checkup",
      doctor: "Dr. Anil Sharma",
      notes: "Overall health is good. Recommended regular exercise and diet control for mild cholesterol.",
    },
  ],
};

const QRConnectionContext = createContext<QRConnectionContextType | undefined>(
  undefined
);

export function QRConnectionProvider({ children }: { children: ReactNode }) {
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>(defaultDoctorInfo);
  const [doctorId, setDoctorId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");

  const startDoctorSession = () => {
    setDoctorId("DOC123");
    setSessionId("SESSION456");
    setConnectionState("doctor_waiting");
  };

  const scanDoctorQR = (scannedDoctorId: string, scannedSessionId: string) => {
    setDoctorId(scannedDoctorId);
    setSessionId(scannedSessionId);
    // In a real application, we would fetch doctor info by doctorId.
    // Here we use the mock doctor details.
    setDoctorInfo({
      name: "Dr. Vikram Mehta",
      specialization: "Cardiologist",
      hospital: "Metro Heart Hospital",
    });
    setConnectionState("patient_details");
  };

  const approveAccess = () => {
    setConnectionState("patient_consent");
  };

  const confirmSharing = () => {
    setConnectionState("connected");
  };

  const resetSession = () => {
    setConnectionState("idle");
    setDoctorId("");
    setSessionId("");
  };

  return (
    <QRConnectionContext.Provider
      value={{
        connectionState,
        doctorInfo,
        patientData: mockPatientData,
        doctorId,
        sessionId,
        setConnectionState,
        startDoctorSession,
        scanDoctorQR,
        approveAccess,
        confirmSharing,
        resetSession,
      }}
    >
      {children}
    </QRConnectionContext.Provider>
  );
}

export function useQRConnection() {
  const context = useContext(QRConnectionContext);
  if (!context) {
    throw new Error(
      "useQRConnection must be used within a QRConnectionProvider"
    );
  }
  return context;
}
