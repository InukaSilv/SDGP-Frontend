import { useState } from "react";
import Navbar from "../../components/navbar/navbar";

interface EditAdProps {
  ad: {
    id: number;
    title: string;
    description: string;
    rooms: number;
    availableSlots: number;
    price: string;
    address: string;
    imageUrl: string;
  };
}

function EditAd() {
  return (
    <>
      <Navbar />
    </>
  );
}
export default EditAd;
