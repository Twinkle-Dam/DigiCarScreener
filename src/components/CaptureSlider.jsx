import React from "react";
import { Slider } from ".";

export default function CaptureSlider({ dataArray }) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="w-[700px]  md:self-stretch">
      <Slider
        responsive={{
          0: { items: 1 },
          551: { items: 1 },
          1051: { items: 1 },
        }}
        disableDotsControls
        activeIndex={sliderState}
        onSlideChanged={(e) => {
          setSliderState(e?.item);
        }}
        ref={sliderRef}
        items={dataArray.map((carImage, index) => {
          return (
            <img
              src={carImage}
              alt=""
              style={{
                width: "90%",
                height: "200px",
                objectFit: "cover",
                margin: "auto",
              }}
            />
          );
        })}
      />
    </div>
  );
}
