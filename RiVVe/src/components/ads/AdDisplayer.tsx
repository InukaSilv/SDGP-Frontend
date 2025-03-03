import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";

function AdDisplayer() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to="/target-page" style={{ textDecoration: "none" }}>
      <div className="flex flex-wrap">
        <Card sx={{ maxWidth: 400, cursor: "pointer", position: "relative" }}>
          <CardMedia
            sx={{ height: 140 }}
            image="src/assets/main-background.jpeg"
            title="green iguana"
          />
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
            }}
            onClick={handleFavoriteClick}
          >
            <IconButton aria-label="add to favorites">
              {isFavorite ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica.
            </Typography>
            <Typography variant="h6" component="div">
              Available slots{" "}
              <span className="p-2 bg-blue-600 rounded-lg px-3 text-white">
                5
              </span>
            </Typography>
            <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
              Rs.15,000/month
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

export default AdDisplayer;
