import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, IconButton, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../axiosConfig";

interface Category {
  _id: string;
  name: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category/currentUser"); 
        setCategories(response.data);
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axiosInstance.delete(`/category/delete/${categoryId}`);
      setCategories(categories.filter((category) => category._id !== categoryId));
      setSnackbarMessage("Category deleted successfully");
      setOpenSnackbar(true);
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (loading) {
    return <Typography>Loading categories...</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" className="text-lg font-semibold">Your Categories</Typography>

      {error && (
        <Typography color="error" className="mb-4">{error}</Typography>
      )}

      {categories.length === 0 ? (
        <Typography>No categories available</Typography>
      ) : (
        <List>
          {categories.map((category) => (
            <ListItem
              key={category._id}
              className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-lg"
            >
              <Typography className="text-sm">{category.name}</Typography>
              <IconButton
                color="error"
                onClick={() => handleDeleteCategory(category._id)}
                className="ml-16"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default CategoriesList;
