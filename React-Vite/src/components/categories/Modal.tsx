import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useCallback, useRef } from "react";
import { ICategory } from "./category.model";

export default function Modal({ open, onClose, category }) {
  const editedName = useRef<HTMLInputElement>(null);

    const handleEdit = useCallback(()=>{
        onClose({...category, name: editedName.current?.value })
    },[onClose, category])

  return (
    <Dialog
      open={open}
      onClose={()=>onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Edit ${category?.name}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ paddingTop: "5px" }}
          id="alert-dialog-description"
        >
          <TextField label="Name" inputRef={editedName} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleEdit()} autoFocus>
          Confirm
        </Button>
        <Button onClick={() => onClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}