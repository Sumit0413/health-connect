import React, { createContext, useContext, useState } from "react";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  // Add a new appointment
  const addAppointment = (appointment) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointment,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppointment, ...prev]);

    // TODO: API call to save appointment to backend
    // Example:
    // await fetch('/api/appointments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newAppointment),
    // });

    return newAppointment;
  };

  // Remove an appointment
  const removeAppointment = (appointmentId) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));

    // TODO: API call to delete appointment
    // await fetch(`/api/appointments/${appointmentId}`, {
    //   method: 'DELETE',
    // });
  };

  // Reschedule an appointment
  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              date: newDate,
              time: newTime,
              updatedAt: new Date().toISOString(),
            }
          : apt,
      ),
    );

    // TODO: API call to update appointment
    // await fetch(`/api/appointments/${appointmentId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ date: newDate, time: newTime }),
    // });
  };

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    // TODO: API call to fetch appointments
    // const response = await fetch('/api/appointments');
    // const data = await response.json();
    // setAppointments(data);
  };

  const value = {
    appointments,
    addAppointment,
    removeAppointment,
    rescheduleAppointment,
    fetchAppointments,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider",
    );
  }
  return context;
}
