import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";



/**
 * Creates a Zustand store to handle user actions and state updates.
 */
const userDetailsStore = create((set, get) => ({
  
  
  getSpecificUserLoader: false,
  usersData: [],
  selectedUser: null,
  user: null,
  error: null,


  /**
   * Fetches specific user details from API.
   * @param {string} userId - User's unique identifier.
   * @return {Promise<Object>} API response.
   */
  async getSpecificUserData(userId) {
    set({
      getSpecificUserLoader: true,
    });
    try {
      const response = await axios
        .get(`${process.env.API}/users/${userId}`)
        .catch(function (error) {
          console.log(error.response.data);
        });

      set({
        selectedUser: response.data.data,
        getSpecificUserLoader: false,
      });
      return response;
    } catch (error) {
      set({ getSpecificUserLoader: false });
      toast.error("Unable to fetch user data");
    }
  },

}));

export default userDetailsStore;
