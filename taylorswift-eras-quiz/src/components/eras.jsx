import { useState } from "react";

export const ERAS = [
  { name: "Taylor Swift", img: "/TS.png", color: "#a8d5ba" },
  { name: "Fearless", img: "/Fearless.png", color: "#f9e0a1" },
  { name: "Speak Now", img: "/Speaknow.png", color: "#d9c2e9" },
  { name: "Red", img: "/Red.png", color: "#814950" },
  { name: "1989", img: "/1989.png", color: "#2c5d73" },
  { name: "Reputation", img: "/Rep.png", color: "#2c2c2c" },
  { name: "Lover", img: "/Lover.png", color: "#f6bcd8" },
  { name: "Folklore", img: "/Folklore.png", color: "#d6d6d6" },
  { name: "Evermore", img: "/evermore.png", color: "#c8a878" },
  { name: "Midnights", img: "/Midnights.png", color: "#4a5a9c" },
  { name: "Tortured Poets Department", img: "/TPD.png", color: "#383737ff" },
];

export default function Eras({
  items = ERAS,
  initial = null,
  onSelect,
  height = 300,            // px height of container
  collapsedWidth = 8,      // % width for non-selected items
  hoverBoost = 2.5,         // % extra width on hover when no selection
  imageScale = 1.03,        // scale for selected image
  hoverScale = 1.015,       // scale on hover (before selection)
  minExpandedWidth = 20,    // ensure selected item never shrinks too small
  transitionDuration = 400  // ms for animation
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
