import BasicAppbar from "../components/common/AppBar";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useState,
} from "react";
import { Box, Grid } from "@mui/material";
import { TestDnd } from "@/components/dnd/TestDnd";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
  ResponderProvided,
} from "react-beautiful-dnd";
import { ColumnWidget } from "@/components/dnd/ColumnWidget";
interface User {
  id: string;
  name: string;
}

const defaultValuesMap: { [key: string]: User[] } = {
  droppable1: [
    { id: "10", name: "user 11" },
    { id: "12", name: "user 12" },
    { id: "13", name: "user 13" },
  ],
  droppable2: [
    { id: "20", name: "user 21" },
    { id: "22", name: "user 22" },
    { id: "23", name: "user 23" },
  ],
  droppable3: [
    { id: "30", name: "user 31" },
    { id: "32", name: "user 32" },
    { id: "33", name: "user 33" },
  ],
};

export const TestPage = () => {
  return (
    <Box>
      <ColumnWidget defaultValues={defaultValuesMap} />
    </Box>
  );
};
