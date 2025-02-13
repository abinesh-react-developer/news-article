import Axios from "axios";
import ToastMessage from "@/utility/Toast"; 

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
  },
});


instance.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  if (!config.url?.includes("everything")) {
    config.params.country =  "us";
  }

  return config;
});


instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      handleNetworkOrUnknownError(error);
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        handleBadRequest(data?.message);
        break;
      case 401:
        handleUnauthorized(data?.message);
        break;
      case 403:
        handleForbidden(data?.message);
        break;
      case 404:
        handleNotFound(data?.message);
        break;
      case 422:
        handleUnprocessableEntity(data?.message);
        break;
      case 500:
        handleServerError(error.response.statusText);
        break;
      case 409:
        handleConflict(data?.message);
        break;
      default:
        ToastMessage({ type: "error", message: "An unexpected error occurred." });
    }

    return Promise.reject(error);
  }
);


function handleBadRequest(message) {
  ToastMessage({ type: "error", message: message || "Bad Request" });
}

function handleUnauthorized(message) {
  ToastMessage({ type: "error", message: message || "Unauthorized access" });
}

function handleForbidden(message) {
  ToastMessage({ type: "error", message: message || "Access forbidden" });
}

function handleNotFound(message) {
  ToastMessage({ type: "error", message: message || "Resource not found" });
}

function handleUnprocessableEntity(message) {
  ToastMessage({ type: "error", message: message || "Unprocessable entity" });
}

function handleServerError(message) {
  ToastMessage({ type: "error", message: message || "Server error" });
}

function handleConflict(message) {
  ToastMessage({ type: "error", message: message || "Conflict detected" });
}

function handleNetworkOrUnknownError(error) {
  if (error.code === "ERR_NETWORK") {
    ToastMessage({ type: "error", message: "Network Error: Unable to reach the server." });
  } else {
    ToastMessage({ type: "error", message: "An unexpected error occurred." });
  }
}

export default instance;
