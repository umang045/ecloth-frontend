import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//generate extra reducer to reduce state code
export default function generateExtraReducers(thunk, name) {
  return (builder) => {
    builder
      .addCase(thunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // alag alag name add kari sakay url par thi - slice ma call
        state[name] = action.payload;
      })
      .addCase(thunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(`Error: ${action.error?.message}`);
      });
  };
}
