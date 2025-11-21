import { useRef, useState } from "react";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    console.log("data",data)
    const { token, expire, signature, publicKey } = data;
    console.log("pk",publicKey)
    return data;
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};
const Upload = ({children,type,setData,setProgress,mutation,className}) => {
  const abortController = new AbortController();
  const fileInputRef = useRef();
 
    const handleUpload = async () => {
      const fileInput = fileInputRef.current;
      console.log("FI",fileInput)
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Please select a file to upload");
        return;
      }
  
      const file = fileInput.files[0];
  
      let authParams;
      try {
        authParams = await authenticator();
        console.log("authParams",authParams)
      } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return;
      }
      const { signature, expire, token, publicKey } = authParams;
  
      try {
        const uploadResponse = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name, 
          onProgress: (event) => {
            setProgress(Math.round((event.loaded / event.total) * 100));
          },
          abortSignal: abortController.signal,
        });
        console.log("Upload response:", uploadResponse);
        toast.success("Upload success")
        setData(uploadResponse)
      } catch (error) {
        // Handle specific error types provided by the ImageKit SDK.
        if (error instanceof ImageKitInvalidRequestError) {
          console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
          console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
          console.error("Server error:", error.message);
        } else {
          // Handle any other errors that may occur.
          console.error("Upload error:", error);
        toast.error("Upload failed",error)
  
        }
      }
    };
  return (
    <div>
  <label className="cursor-pointer">
  {children}

  <input type="file" id="file" ref={fileInputRef} className={className} onChange={handleUpload}/> 
  {/* <button type="button" onClick={handleUpload}> Upload file </button> */}
  
</label>
</div>
  )
}

export default Upload
