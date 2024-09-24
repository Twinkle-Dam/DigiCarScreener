import React from "react";
import { Slider } from ".";

export default function CaptureSlider({ dataArray }) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="relative w-full md:self-stretch" style={{ maxWidth: '300px' }}>
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
            <div className="flex justify-center items-center">
              <img
                src={carImage}
                alt=""
                style={{
                  width: "100%",
                  height: "auto", 
                  maxHeight: "200px", 
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      />
    
      
      </div>
    
  );
}
