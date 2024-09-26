import React from "react";
import { Slider } from ".";

export default function CaptureSlider({ dataArray }) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className=" relative p-2 md:self-stretch " style={{ maxWidth: '400px' }}>
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
            <div >
              <img
                src={carImage}
                alt=""
                style={{
                  width: "100%",
                  height: "120px", 
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
