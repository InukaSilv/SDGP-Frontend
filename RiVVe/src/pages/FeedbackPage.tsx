import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HostelReview from "../components/hostelFeedback/HostelFeedback";

const FeedbackPage: React.FC = () => {
    const [hostelData, setHostelData] = useState({
        hostelName: "Cozy Hostel",
        landlordName: "Landlords Name",
        price: "LKR 15,000/Month",
        currentRating: 4.0,
        hostelImage: "", // Update with image path
        totalUsers: 3
    });

    const location = useLocation();

    useEffect(() => {
        if (location.state?.hostelData) {
            setHostelData(location.state.hostelData);
        } else {
            //Fetch from an API
        }
    }, [location.state]);

    return (
        <HostelReview
            hostelName={hostelData.hostelName}
            landlordName={hostelData.landlordName}
            price={hostelData.price}
            currentRating={hostelData.currentRating}
            hostelImage={hostelData.hostelImage}
            totalUsers={hostelData.totalUsers}
        />
    );
};

export default FeedbackPage;