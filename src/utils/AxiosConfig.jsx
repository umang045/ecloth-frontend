// import {jw} from "jwt-decode";

//export url for reuse in every api request
// export const base_url = "http://localhost:8000/api";
export const base_url = "https://intern-e-com.vercel.app/api";

//fetch token from localstorage
export const fetchToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

//take token and set to headers of fetch request
export const getConfig = () => {
  const token = fetchToken();
  return {
    headers: {
      Authorization: `Bearer ${token !== null ? token : ""}`,
      Accept: "application/json",
    },
  };
};

//export Const checkLogin
export const isLogin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

//check token is expire or not
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
