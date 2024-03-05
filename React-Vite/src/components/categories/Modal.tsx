import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { ICategory } from "./category.model";

export default function Modal({ open, onClose, category }) {
  const editedName = useRef<HTMLInputElement>(null);
  const [empty, setIsEmpty] = useState<boolean | null>(null);

  useEffect(() => {
    setIsEmpty(null);
  }, [open]);

  const handleEdit = useCallback(() => {
    onClose({ ...category, name: editedName.current?.value });
  }, [onClose, category]);

  const handleCreate = useCallback(() => {
    const newCategoryName = editedName.current?.value;
    if (newCategoryName === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      onClose(newCategoryName);
    }
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    category?.id ? handleEdit() : handleCreate();
  }, [handleEdit, handleCreate, category]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle id="alert-dialog-title">
        {category?.id ? `Edit ${category?.name}` : "Add a category"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ paddingTop: "5px" }}
          id="alert-dialog-description"
        >
          <TextField
            label="Name"
            inputRef={editedName}
            autoFocus
            error={empty ? true : false}
            helperText={empty ? "Incorrect entry" : ""}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>
          {category?.id ? "Confirm" : "Add"}
        </Button>
        <Button onClick={() => onClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
