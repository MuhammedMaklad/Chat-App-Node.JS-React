/* eslint-disable @typescript-eslint/no-explicit-any */

interface UploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  original_filename: string;
  resource_type: string;
}
interface UploadError {
  message: string;
  error?: any;
}

class UploadService {
  private readonly cloudName: string;
  private readonly uploadPreset: string;
  private readonly baseUrl: string;

  constructor() {
    this.cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME || '';
    this.uploadPreset = 'chat-app-file'; // Your upload preset name
    this.baseUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`;

    if (!this.cloudName) {
      console.error('Cloudinary cloud name is not configured!');
    }
  }

  async uploadFile(file: File): Promise<UploadResponse | UploadError> {
    try {
      // validate file
      if (!file)
        return {
          message: 'Provide File to Upload',
        }
      // Validate configuration
      if (!this.cloudName) {
        return { message: 'Failed to Upload Image' };
      }

      // create form
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);

      // send request

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: formData,
      })
      console.log(response);
      if (!response.ok)
        return { message: 'Failed to Upload Image' };

      const data = await response.json();

      console.log(data);
      if (data.error)
        return { message: 'Failed to Upload Image' };
      return data as UploadResponse;
    }
    catch (error) {
      return {
        message: 'Failed to Upload Image',
        error
      }
    }
  }
  // Helper method to check if the response is an error
  isUploadError(response: UploadResponse | UploadError): response is UploadError {
    return 'message' in response;
  }
}

export const uploadService = new UploadService();