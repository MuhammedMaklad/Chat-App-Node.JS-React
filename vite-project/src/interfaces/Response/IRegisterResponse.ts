export interface IRegisterResponse {
  message: string;
  success: boolean;
  data: {
    name: string;
    email: string;
  }
}