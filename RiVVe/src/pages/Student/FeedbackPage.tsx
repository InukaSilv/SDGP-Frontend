import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Star, CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface FeedbackForm {
  rating: number;
  review: string;
  recommend: string | null;
}

function FeedbackPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const property = location.state;
  const [ownerDetail, setOwnerDetail] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [formData, setFormData] = useState<FeedbackForm>({
    rating: 0,
    review: "",
    recommend: null,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  /**
   * Fetch the owner details for the property from the database
   */
  useEffect(() => {
    const fetchOwnerDetail = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/listing/getowner`,
          {
            params: { propertyId: property._id },
          }
        );
        setOwnerDetail(data);
      } catch (error) {
        console.error("Failed to fetch owner details:", error);
      }
    };
    fetchOwnerDetail();
  }, [property?._id]);

  /**
   * If the property is not found, return a message
   */
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">
            No Property Found
          </h2>
          <p className="mt-2 text-gray-600">
            Please select a property to review.
          </p>
        </div>
      </div>
    );
  }

  /**
   * Handle the rating change
   */
  const handleRatingChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: prev.rating === value ? 0 : value,
    }));
  };

  /**
   * Handle the recommendation change
   */
  const handleRecommendChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      recommend: prev.recommend === value ? null : value,
    }));
  };

  /**
   * Handle the submit
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    const authToken = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${API_BASE_URL}/api/listing/post-review`,
        { ...formData, propertyId: property._id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSubmitStatus("success");
      setFormData({ rating: 0, review: "", recommend: null });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        <Link
          to="/student-review"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Reviews</span>
        </Link>
        {/* Property Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative overflow-hidden">
              <img
                src={property.images[0]}
                alt={`${property.title} interior`}
                className="w-full h-[300px] md:h-[300px] object-cover transition-transform duration-400 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h1 className="text-3xl font-bold text-white">
                  {property.title}
                </h1>
              </div>
            </div>

            {/* Current Rating */}
            <div className="md:w-1/2 p-6 space-y-4">
              <div className="flex items-center space-x-2 text-lg">
                <span className="font-semibold">Current Rating:</span>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">
                    {property.averageRating || "Not rated yet"}
                  </span>
                </div>
              </div>

              {/* Owner Details */}
              <div className="space-y-2">
                <p className="text-xl font-semibold">
                  Owner: {ownerDetail?.firstName || "N/A"}{" "}
                  {ownerDetail?.lastName}
                </p>
                <p className="text-lg text-gray-700">Price: {property.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8 space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Share Your Experience
            </h2>
            <p className="text-gray-600">
              Your feedback helps others make better decisions
            </p>
          </div>

          {/* Rating Stars */}
          <div className="space-y-4">
            <label className="block text-xl font-medium text-center">
              How would you rate this property?
            </label>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none transform transition-all duration-200 hover:scale-110"
                  aria-label={`${star} star rating`}
                >
                  <Star
                    size={48}
                    className={`${
                      star <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors duration-300 hover:text-yellow-400`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600">
              {formData.rating > 0
                ? `${formData.rating}.0 out of 5 stars`
                : "Select your rating"}
            </p>
          </div>

          {/* Review Text */}
          <div className="space-y-3">
            <label className="block text-xl font-medium">Your Review</label>
            <textarea
              className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-300 hover:border-blue-300"
              placeholder="What did you like or dislike? Share your honest opinion..."
              value={formData.review}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, review: e.target.value }))
              }
              required
            />
          </div>

          {/* Recommendation */}
          <div className="space-y-4">
            <label className="block text-xl font-medium">
              Would you recommend this property?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRecommendChange("yes")}
                className={`flex items-center justify-between p-4 rounded-lg border-2
                          transition-all duration-300
                          ${
                            formData.recommend === "yes"
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
              >
                <span className="text-lg">Yes, I recommend it</span>
                <CheckCircle2
                  className={`w-6 h-6 ${
                    formData.recommend === "yes"
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => handleRecommendChange("no")}
                className={`flex items-center justify-between p-4 rounded-lg border-2
                          transition-all duration-300
                          ${
                            formData.recommend === "no"
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200 hover:border-red-300"
                          }`}
              >
                <span className="text-lg">No, I don't recommend it</span>
                <XCircle
                  className={`w-6 h-6 ${
                    formData.recommend === "no"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                formData.rating === 0 ||
                !formData.review ||
                !formData.recommend
              }
              className={`relative w-full md:w-auto px-12 py-4 text-lg font-semibold text-white
                        rounded-full transition-all duration-300
                        ${
                          isSubmitting ||
                          formData.rating === 0 ||
                          !formData.review ||
                          !formData.recommend
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                        }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-600 font-medium">
                Thank you for your feedback!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 font-medium">
                Failed to submit feedback. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackPage;
