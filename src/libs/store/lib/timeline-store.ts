import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimelineState {
  simulationDate: string | null;
  setSimulationDate: (date: string | null) => void;
}

export const useTimelineState = create(
  persist<TimelineState>(
    (set) => ({
      simulationDate: null,
      setSimulationDate: (date) => set({ simulationDate: date }),
    }),
    {
      name: "timeline-storage",
    },
  ),
);
