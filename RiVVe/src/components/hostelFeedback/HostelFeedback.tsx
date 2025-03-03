import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Star } from "lucide-react";

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
    const [userRating, setUserRating] = useState<number>(3);
    const [review, setReview] = useState<string>("");
    const [recommend, setRecommend] = useState<string | null>(null);
   
    const handleRatingChange = (value: number) => {
        setUserRating(value);
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };    

    const handleSubmit = () => {
        //Logic to submit review...
        console.log({
            hostelName,
            userRating,
            review,
            recommend,
        });
        //API call
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex flex-col md:flex-row">
                    
                    {/*Hostel Image*/}
                    <div className="md:w-1/2">
                        <img
                            src={hostelImage}
                            alt={`${hostelName} interior`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Hostel Info */}
                    <div className="md:w-1/2 p-6">
                        <h1 className="text=3xl font-bold mb-2">Rate {hostelName}</h1>
                        <div className="flex items-center mb-2">
                            <span className="text-gray-600">rated {currentRating.toFixed(1)} out of 5</span>
                        </div>
                        <div className="mb-2">
                            <span className="text-xl">owner : {landlordName}</span>
                        </div>
                        <div className="text-gray-600">
                            <p>Price : {price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-center text-2xl text-gray-400 mb-6">Make your review help others</h2>

                {/*Rating Stars*/}
                <div className="mb-6">
                    <p className="text-center text-xl mb-4">How would you rate this hostel</p>
                    <div className="flex justify-center gap-2">
                        {[1,2,3,4,5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                className="focus:outline-none"
                            >
                                <Star
                                    size={48}
                                    className={`${
                                        star <= userRating
                                            ? "fill-blue-900 text-blue-900"
                                            : "text-gray-300"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-gray-500 mt-2">rated {userRating}.0 out of 5</p>
                </div>

                {/* Review Text Area */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <label className="text-lg font-semibold">Your review</label>
                    </div>
                    <div className="flex gap-4">
                        <textarea
                            className="w-full h-32 p-4 bg-gray-200 rounded-lg resize-none"
                            placeholder="Share details of your experiences in this place....."
                            value={review}
                            onChange={handleReviewChange}
                        ></textarea>
                        {/* <div className="flex flex-col justify-start">
                            <button className="bg-gray-300 text-black py-2 px-4 rounded-lg">
                                
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Recommendation section */}
                <div className="mb-6">
                    <p className="text-lg font-semibold mb-2">Would you recommend this place ?</p>
                    <div className="space-y-3">
                        <div className="border border-gray-300 rounded-full p-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="recommend"
                                    className="form-radio h-5 w-5"
                                    checked={recommend == "yes"}
                                    onChange={() => setRecommend("yes")}
                                />
                                <span>Yes</span>
                            </label>
                        </div>
                        <div className="border border-gray-300 rounded-full p-3">
                            <label className="flex item-center gap-3 cursor-pointer">
                                <input  
                                    type="radio"
                                    name="recommend"
                                    className="form-radio h-5 w-5"
                                    checked={recommend === "no"}
                                    onChange={() => setRecommend("no")}
                                />
                                <span>No</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleSubmit}
                        className="bg-indigo-800 text-white py-3 px-16 rounded-full font-semibold"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HostelReview;