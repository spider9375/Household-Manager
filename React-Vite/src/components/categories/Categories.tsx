import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "./Modal";
import { ICategory } from "./category.model";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [fetchCategories, setFetchCategories] = useState(true);
  const [selectedCategoryDelete, setSelectedCategoryDelete] =
    useState<any>(null);
  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState<any>(null);
  const [empty, setIsEmpty] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleAdd = useCallback(() => {
    if (ref.current?.value === "") {
      setIsEmpty(true);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: ref.current?.value }),
      };
      fetch("http://localhost:8080/category", requestOptions)
        .then((response) => response.json())
        .then(() => setFetchCategories(true));
      setIsEmpty(false);
      ref.current!.value = "";
    }
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("http://localhost:8080/category");
      const data = await response.json();

      setCategories(data);
      setFetchCategories(false);
    };
    if (fetchCategories) {
      getCategories();
    }
  }, [fetchCategories]);

  const handleDelete = useCallback((category: ICategory) => {
    fetch(`http://localhost:8080/category/${category.id}`, {
      method: "DELETE",
    }).then(() => setFetchCategories(true));
    handleClose();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleEdit = useCallback((category: ICategory) => {
    fetch(`http://localhost:8080/category/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    }).then(() => setFetchCategories(true));
  }, []);

  const handleCloseEdit = useCallback((category?: ICategory) => {
    setOpenEdit(false);
    if (category) {
      handleEdit(category);
    }
  },[handleEdit]);

  const handleOpenEdit = useCallback((category: ICategory) => {
    setOpenEdit(true);
    setSelectedCategoryEdit(category);
  },[]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);

  const handleOpen = useCallback((category: ICategory) => {
    setOpen(true);
    setSelectedCategoryDelete(category);
  },[]);

  return (
    <>
      {empty && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">Please enter a name.</Alert>
        </Stack>
      )}
      <Button onClick={handleAdd}>Add Category</Button>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        inputRef={ref}
      ></TextField>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleOpen(category)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEdit(category)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${selectedCategoryDelete?.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {selectedCategoryDelete?.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDelete(selectedCategoryDelete)}
            autoFocus
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        category={selectedCategoryEdit}
      />
      {/* <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Edit ${selectedCategoryEdit?.name}`}
        </DialogTitle>
        <DialogContent >
          <DialogContentText sx={{paddingTop: '5px'}} id="alert-dialog-description">
            <TextField  label="Name" inputRef={editedName} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEdit(selectedCategoryEdit)} autoFocus>
            Confirm
          </Button>
          <Button onClick={handleCloseEdit}>Cancel</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}
