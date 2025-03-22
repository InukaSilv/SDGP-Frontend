import { Slider } from "@mui/material";
interface RadiusSlider {
  radius: number;
  setRadius: (value: number) => void;
}
function RadiusSlider({ radius, setRadius }: RadiusSlider) {
  const changeRadius = (_: Event, newValue: number | number[]) => {
    setRadius(typeof newValue === "number" ? newValue : newValue[0]);
  };

  return (
    <Slider
      defaultValue={5}
      value={radius}
      aria-label="Radius"
      valueLabelDisplay="auto"
      onChange={changeRadius}
      min={1}
      max={10}
      step={0.5}
      sx={{
        color: "#3b82f6",
        height: 6,
        width: "90%",
        borderRadius: "10px",
      }}
    />
  );
}
export default RadiusSlider;
