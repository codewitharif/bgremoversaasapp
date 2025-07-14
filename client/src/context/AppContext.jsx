import { useAuth } from "@clerk/clerk-react";
import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [credit, setCredit] = useState(0); // Initialize with 0 instead of false
  const [currentPlan, setCurrentPlan] = useState("");
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const loadcreditsData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backend}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setCurrentPlan(data.currentPlan);
      }
    } catch (error) {
      console.error("Credit load error:", error);
      toast.error(error.response?.data?.message || "Failed to load credits");
    }
  };

  const removeBg = async (imageFile) => {
    if (!isSignedIn) {
      toast.error("Please Login to continue!");
      navigate("/sign-in");
      return;
    }

    try {
      setIsProcessing(true); // Start loading
      setIsLoading(true);
      setImage(imageFile);
      setResultImage(null);

      const token = await getToken();
      const formData = new FormData();
      formData.append("image", imageFile);
      navigate("/result");

      const { data } = await axios.post(
        `${backend}/api/image/remove-bg`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setResultImage(data.resultImage);
        setCredit(data.creditBalance ?? credit);
      } else {
        toast.error(data.message);
        setCredit(data.creditBalance ?? credit);
        if (data.creditBalance === 0) {
          navigate("/buy-credit");
        }
      }
    } catch (error) {
      console.error("BG removal error:", error);
      toast.error(error.response?.data?.message || "Background removal failed");
    } finally {
      setIsLoading(false);
      setIsProcessing(false); // Start loading
    }
  };

  const value = {
    backend,
    credit,
    setCredit,
    loadcreditsData,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage,
    isLoading,
    isProcessing,
    setIsProcessing,
    currentPlan,
    setCurrentPlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
