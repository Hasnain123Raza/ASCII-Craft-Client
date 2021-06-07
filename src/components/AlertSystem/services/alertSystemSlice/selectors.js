export const selectAlertSystem = (state) => state.alertSystem;

export const selectAlert = (state) => selectAlertSystem(state).alert;
