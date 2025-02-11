import { AxiosError } from "axios";

// Custom interface for your application's Axios error handling
export interface ICustomAxiosError {
  message: string; // General error message
  status?: number; // HTTP status code (optional)
  response?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any; // The data returned from the server
    status?: number; // Status code of the response
    statusText?: string; // HTTP status text
    msg?: string; // Custom message from the server
  };
  // You can add additional properties here based on your needs
}

// Utility function to transform AxiosError into ICustomAxiosError
export const transformAxiosError = (error: AxiosError): ICustomAxiosError => {
  return {
    message: error.message,
    status: error.response?.status,
    response: {
      data: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
    },
  };
};