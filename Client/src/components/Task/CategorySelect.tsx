import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel, FormControl, TextField, Button } from "@mui/material";
import axios from "axios";

interface CategorySelectProps {
  selectedCategory: string;
  setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategory, setCategory }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/category/currentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/category/create",
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setCategory(response.data._id); 
      setNewCategory(""); 
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory} onChange={(e) => setCategory(e.target.value as string)} label="Category">
          {loading ? (
            <MenuItem value="">Loading...</MenuItem>
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
        label="Create New Category"
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
        disabled={!newCategory}
        
      >
        Create Category
      </Button>
    </div>
  );
};

export default CategorySelect;
