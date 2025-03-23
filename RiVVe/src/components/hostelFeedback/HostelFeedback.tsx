import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Star, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface HostelReviewProps {
    hostelName: string;
    landlordName: string;
    price: string;
    currentRating: number;
    hostelImage: string;
    totalUsers?: number;
}

const HostelReview: React.FC<HostelReviewProps> = ({
    hostelName,
    landlordName,
    price,
    currentRating,
    hostelImage,
    totalUsers = 0
}) => {
    const [userRating, setUserRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [recommend, setRecommend] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   
    const handleRatingChange = (value: number) => {
        // If the clicked star is the same as current rating, deselect it
        setUserRating(prevRating => prevRating === value ? 0 : value);
    };

    const handleRecommendChange = (value: string) => {
        // If the clicked option is the same as current recommendation, deselect it
        setRecommend(prevRecommend => prevRecommend === value ? null : value);
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };    

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulating an API call
        setTimeout(() => {
            console.log({
                hostelName,
                userRating,
                review,
                recommend,
            });
            // Reset form or show success message
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
                <div className="flex flex-col md:flex-row transition-all duration-300 hover:shadow-lg">
                    
                    {/*Hostel Image*/}
                    <div className="md:w-1/2 overflow-hidden">
                        <img
                            src={hostelImage}
                            alt={`${hostelName} interior`}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Hostel Info */}
                    <div className="md:w-1/2 p-6 bg-white">
                        <h1 className="text-3xl font-bold mb-2 transition-colors duration-300 hover:text-blue-900">
                            Rate {hostelName}
                        </h1>
                        <div className="flex items-center mb-2 animate-fade-in">
                            <span className="text-gray-600">Rated {currentRating.toFixed(0)} out of 5</span>
                        </div>
                        <div className="mb-2 hover:bg-gray-50 p-2 rounded-md transition-colors">
                            <span className="text-xl">Owner : {landlordName}</span>
                        </div>
                        <div className="text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors">
                            <p>Price : {price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6 mx-4 max-w-4xl md:mx-auto transform transition-all duration-300 hover:scale-[1.01]">
                <h2 className="text-center text-2xl text-gray-400 mb-6 animate-pulse">
                    Make your review help others
                </h2>

                {/*Rating Stars*/}
                <div className="mb-6">
                    <p className="text-center text-xl mb-4">How would you rate this hostel ?</p>
                    <div className="flex justify-center gap-2">
                        {[1,2,3,4,5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                className="focus:outline-none transform transition-all duration-200 hover:scale-110 group"
                                aria-label={`${star} star rating`}
                            >
                                <Star
                                    size={48}
                                    className={`${
                                        star <= userRating
                                            ? "fill-blue-900 text-blue-900"
                                            : "text-gray-300"
                                    } transition-all duration-300 
                                    group-hover:fill-blue-900 text-blue-900 
                                    ${userRating === star ? "hover:fill-white" : ""}`}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-gray-500 mt-2">
                        {userRating > 0 
                            ? `Rated ${userRating}.0 out of 5` 
                            : "No rating selected"}
                    </p>
                </div>

                {/* Review Text Area */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="text-lg font-semibold">Your review :</label>
                    </div>
                    <div className="flex gap-4">
                        <textarea
                            className="w-full h-32 p-4 bg-gray-200 rounded-lg resize-none 
                            focus:ring-2 focus:ring-blue-900 focus:outline-none 
                            transition-all duration-300 hover:bg-gray-100"
                            placeholder="Share details of your experiences in this place....."
                            value={review}
                            onChange={handleReviewChange}
                        ></textarea>
                    </div>
                </div>

                {/* Recommendation section */}
                <div className="mb-6">
                    <p className="text-lg font-semibold mb-2 flex items-center gap-2">
                        Would you recommend this place?
                        <span 
                            className="cursor-help group"
                            title="Your recommendation helps future travelers make informed decisions"
                        >
                            {/* <HelpCircle 
                                size={16} 
                                className="text-gray-400 group-hover:text-blue-600 transition-colors"
                            /> */}
                        </span>
                    </p>
                    <div className="space-y-3">
                        <div 
                            className={`border border-gray-300 rounded-full p-3 
                            transition-all duration-300 
                            ${recommend === "yes" ? "bg-blue-50 border-blue-900" : ""}
                            hover:bg-blue-50/50
                            cursor-pointer`}
                            onClick={() => handleRecommendChange("yes")}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="recommend"
                                    className="form-radio h-5 w-5"
                                    checked={recommend === "yes"}
                                    onChange={() => handleRecommendChange("yes")}
                                />
                                <div className="flex-grow flex justify-between items-center">
                                    <span>Yes</span>
                                    {recommend === "yes" && <CheckCircle2 className="text-blue-900" />}
                                </div>
                            </div>
                        </div>
                        <div 
                            className={`border border-gray-300 rounded-full p-3 
                            transition-all duration-300 
                            ${recommend === "no" ? "bg-red-50 border-red-900" : ""}
                            hover:bg-red-50/50
                            cursor-pointer`}
                            onClick={() => handleRecommendChange("no")}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="recommend"
                                    className="form-radio h-5 w-5"
                                    checked={recommend === "no"}
                                    onChange={() => handleRecommendChange("no")}
                                />
                                <div className="flex-grow flex justify-between items-center">
                                    <span>No</span>
                                    {recommend === "no" && <XCircle className="text-red-900" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {recommend === null && (
                        <p className="text-gray-500 text-sm mt-2 text-center">
                            No recommendation selected
                        </p>
                    )} */}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting || userRating === 0}
                        className={`bg-indigo-800 text-white py-3 px-16 rounded-full font-semibold
                        transition-all duration-300 
                        ${(isSubmitting || userRating === 0) 
                            ? "opacity-50 cursor-not-allowed" 
                            : "hover:bg-indigo-900 hover:shadow-lg"}
                        transform active:scale-95`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HostelReview;