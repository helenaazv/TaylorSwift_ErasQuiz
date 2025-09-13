import { useState } from "react";

export const ERAS = [
  { name: "Taylor Swift", img: import.meta.env.BASE_URL + "TS.png", color: "#a8d5ba", btnBg: "#0b7417ff", btnText: "#ffffff" },
  { name: "Fearless", img: import.meta.env.BASE_URL + "Fearless.png", color: "#f9e0a1", btnBg: "#f3960bff", btnText: "#ffffff" },
  { name: "Speak Now", img: import.meta.env.BASE_URL + "Speaknow.png", color: "#d9c2e9", btnBg: "#9b5de5", btnText: "#ffffff" },
  { name: "Red", img: import.meta.env.BASE_URL + "Red.png", color: "#7d3240", btnBg: "#dc3939ff", btnText: "#ffffff" },
  { name: "1989", img: import.meta.env.BASE_URL + "1989.png", color: "#b9e2f0", btnBg: "#257eddff", btnText: "#ffffff" },
  { name: "Reputation", img: import.meta.env.BASE_URL + "Rep.png", color: "#787173", btnBg: "#070707ff", btnText: "#ffffff" },
  { name: "Lover", img: import.meta.env.BASE_URL + "Lover.png", color: "#f6bcd8", btnBg: "#e55dc1ff", btnText: "#ffffff" },
  { name: "Folklore", img: import.meta.env.BASE_URL + "Folklore.png", color: "#d6d6d6", btnBg: "#737373ff", btnText: "#ffffff" },
  { name: "Evermore", img: import.meta.env.BASE_URL + "evermore.png", color: "#d3ad88", btnBg: "#b67642ff", btnText: "#ffffff" },
  { name: "Midnights", img: import.meta.env.BASE_URL + "Midnights.png", color: "#475380ff", btnBg: "#5853e8d4", btnText: "#ffffff" },
  { name: "The Tortured Poets Department", img: import.meta.env.BASE_URL + "TPD.png", color: "#4e4c4cff", btnBg: "#000000ff", btnText: "#ffffff" },
];

export default function Eras({
  items = ERAS,
  initial = null,
  onSelect,
  height = 300,           
  collapsedWidth = 8,      
  hoverBoost = 2.5,         
  imageScale = 1.03,        
  hoverScale = 1.015,       
  minExpandedWidth = 20,    
  transitionDuration = 400  
}) {
  const [active, setActive] = useState(initial);
  const [hovered, setHovered] = useState(null);

  const n = items.length;
  const equal = 100 / n;
  const expanded = Math.max(minExpandedWidth, 100 - collapsedWidth * (n - 1));

  const handleClick = (i) => {
    const next = active === i ? null : i;
    setActive(next);
    if (onSelect) onSelect(next === null ? null : items[next].name);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        borderRadius: "0",
        userSelect: "none",
        backgroundColor: "black"
      }}
    >
      {items.map((era, i) => {
        const isActive = i === active;
        const isHovered = i === hovered;

        let width;
        if (active === null) {
          width = `${equal + (isHovered ? hoverBoost : 0)}%`;
        } else {
          width = isActive ? `${expanded}%` : `${collapsedWidth}%`;
        }

        return (
          <button
            key={era.name}
            type="button"
            onClick={() => handleClick(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="reset-button"
            style={{
              flex: "none",
              position: "relative",
              height: "100%",
              overflow: "hidden",
              padding: 0,
              margin: 0,
              background: "transparent",
              outline: "none",
              border: "none",
              width,
              transition: `width ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
            }}
            aria-pressed={isActive}
            aria-label={era.name}
          >
            <img
              src={era.img}
              alt={era.name}
              draggable={false}
              style={{
                display: "block",
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                pointerEvents: "none",
                userSelect: "none",
                transform: isActive
                  ? `scale(${imageScale})`
                  : isHovered && active === null
                  ? `scale(${hoverScale})`
                  : "scale(1)",
                transition: `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
