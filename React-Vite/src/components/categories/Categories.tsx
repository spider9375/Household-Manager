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
  const [fetchCategories, setFetchCategories] = useState<boolean>(true);
  const [selectedCategoryDelete, setSelectedCategoryDelete] =
    useState<any>(null);
  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);


  const handleAdd = useCallback((categoryName: string) => {
      if (categoryName) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoryName }),
        };
        fetch("http://localhost:8080/category", requestOptions)
          .then((response) => response.json())
          .then(() => setFetchCategories(true));
        setOpenCreate(false);
      }
      setOpenCreate(false);
    }
  , []);

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

  const handleEdit = useCallback((category: ICategory) => {
    fetch(`http://localhost:8080/category/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    }).then(() => setFetchCategories(true));
  }, []);

  const handleCloseEdit = useCallback(
    (category?: ICategory) => {
      setOpenEdit(false);
      setOpenCreate(false);
      if (category) {
        handleEdit(category);
      }
    },
    [handleEdit]
  );

  const handleOpenEdit = useCallback((category: ICategory) => {
    if(category.id) {
      setOpenEdit(true);
      setSelectedCategoryEdit(category);
    } else {
      setOpenEdit(true);
    }

    setSelectedCategoryEdit(category);
  }, []);

  const handleOpenCreate = useCallback(() => {
    setOpenCreate(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback((category: ICategory) => {
    setOpen(true);
    setSelectedCategoryDelete(category);
  }, []);

  return (
    <>
      <Button sx={{ paddingTop: "20px" }} onClick={handleOpenCreate}>
        Add Category
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(categories) &&
              categories.map((category) => (
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
      <Modal
        open={openCreate}
        onClose={handleAdd}
        category={selectedCategoryEdit}
      />
    </>
  );
}