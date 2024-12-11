import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import axiosInstance from "../../axiosConfig";

interface CategorySelectProps {
  selectedCategory: string;
  setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  setCategory,
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category/currentUser");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorMessage("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategory) return;
    
    setCreatingCategory(true);
    try {
      const response = await axiosInstance.post("/category/create", {
        name: newCategory,
      });
      setCategories((prevCategories) => [response.data, ...prevCategories]);
      setCategory(response.data._id);
      setNewCategory("");
    } catch (error) {
      console.error("Error creating category:", error);
      setErrorMessage("Failed to create category.");
    } finally {
      setCreatingCategory(false);
    }
  };

  return (
    <div>
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setCategory(e.target.value as string)}
          label="Category"
        >
          {loading ? (
            <MenuItem value="">
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <TextField
        label="Enter Category Name"
        fullWidth
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        margin="normal"
        variant="filled"
      />
      
      <Button
        onClick={handleCreateCategory}
        color="success"
        fullWidth
        disabled={!newCategory || creatingCategory}
      >
        {creatingCategory ? <CircularProgress size={24} /> : "Create Category"}
      </Button>

      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
          message={errorMessage}
        />
      )}
    </div>
  );
};

export default CategorySelect;
