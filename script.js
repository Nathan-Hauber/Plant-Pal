import { createClient } from '@supabase/supabase-js';

import { supabase } from './supabaseClient'; // Import your Supabase client



const supabaseUrl = 'https://vsmkcqccghgjbeovtqom.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbWtjcWNjZ2hnamJlb3Z0cW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MjYyNDksImV4cCI6MjA1MjIwMjI0OX0.XKAh7Yky0mrM94QpiFNVcEG9fXUGb8FTDuI5wNztu40'; // Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Create user with Supabase Auth
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error('Error signing up:', error.message);
      return;
    }
  
    // Save additional user profile information
    const { data, error: profileError } = await supabase
      .from('users')
      .insert([{ user_id: user.id, username }]);
  
    if (profileError) {
      console.error('Error creating profile:', profileError.message);
    } else {
      console.log('Profile created:', data);
    }
  });
  
  

document.addEventListener("DOMContentLoaded", () => {
    const addPlantButton = document.getElementById("addPlantButton");
    const plantModal = document.getElementById("plantModal");
    const closeModal = document.getElementById("closeModal");
    const plantForm = document.getElementById("plantForm");
    const plantList = document.getElementById("plantList");

    // Load plants from local storage
    const loadPlants = () => {
        const plants = JSON.parse(localStorage.getItem("plants")) || [];
        plantList.innerHTML = "";
        plants.forEach((plant, index) => {
            const li = document.createElement("li");
            li.textContent = `${plant.name} (${plant.type}): ${plant.notes}`;
            li.dataset.index = index;
            plantList.appendChild(li);
        });
    };

    // Save plants to local storage
    const savePlant = (plant) => {
        const plants = JSON.parse(localStorage.getItem("plants")) || [];
        plants.push(plant);
        localStorage.setItem("plants", JSON.stringify(plants));
        loadPlants();
    };

    // Event listeners
    addPlantButton.addEventListener("click", () => {
        plantForm.reset(); // Clear the form each time
        plantModal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
        plantModal.classList.add("hidden");
    });

    plantForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate user input
        const plantName = document.getElementById("plantName").value.trim();
        const plantType = document.getElementById("plantType").value.trim();
        const plantNotes = document.getElementById("plantNotes").value.trim();

        if (!plantName || !plantType) {
            alert("Please enter both a plant name and type!");
            return;
        }

        const plant = {
            name: plantName,
            type: plantType,
            notes: plantNotes,
        };
        savePlant(plant);
        plantModal.classList.add("hidden");
        plantForm.reset();
    });

    // Initial load
    loadPlants();
});

