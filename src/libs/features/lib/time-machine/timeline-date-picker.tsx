"use client";

import { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTimelineState } from "@aces/store";
import { FlexBox, Paper, Text } from "@aces/ui";

const formatForTimeline = (dateString: string) => {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const absOffset = Math.abs(offset);
  const offsetHours = pad(Math.floor(absOffset / 60));
  const offsetMinutes = pad(absOffset % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
};

const formatForInput = (timelineDate: string) => {
  const date = new Date(timelineDate);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formatForDisplay = (timelineDate: string) => {
  const date = new Date(timelineDate);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getCurrentDateForTimeline = () =>
  formatForTimeline(new Date().toISOString());
const getCurrentDateForInput = () => formatForInput(new Date().toISOString());

export const TimelineDatePicker = () => {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<string>(getCurrentDateForInput());

  const { simulationDate, setSimulationDate } = useTimelineState();

  const handleOpen = () => {
    setTempDate(
      simulationDate
        ? formatForInput(simulationDate)
        : getCurrentDateForInput(),
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (value: string) => {
    setTempDate(value);
    setSimulationDate(formatForTimeline(value));
  };

  const handleReset = () => {
    const nowTimeline = getCurrentDateForTimeline();
    setSimulationDate(nowTimeline);
    setTempDate(getCurrentDateForInput());
    handleClose();
  };

  return (
    <>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        gap={3}
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}
      >
        <Paper
          style={{
            padding: "8px 12px",
          }}
          elevation={3}
        >
          <FlexBox alignItems="center" justifyContent="center">
            <Text>
              {simulationDate
                ? formatForDisplay(simulationDate)
                : "No date set"}
            </Text>
          </FlexBox>
        </Paper>
        <Fab color="primary" aria-label="select-date" onClick={handleOpen}>
          <AccessTimeIcon />
        </Fab>
      </FlexBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Date</DialogTitle>
        <DialogContent>
          <TextField
            label="Simulation Date"
            type="datetime-local"
            value={tempDate}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
