import { useEffect, useState } from "react";

export default function TextButton({ activeWhen, children, onClick }) {
  const [active, setActive] = useState(false);

  useEffect(()=>{
    setActive(activeWhen)
  },[activeWhen])
  return (
    <button
      onClick={() => {
        onClick();
      }}
      style={{
        border: "none",
        ...(active
          ? {
              textDecoration: "underline",
              textDecorationColor: "var(--font-color)",
              textDecorationThickness: 3,
            }
          : {}),
      }}
    >
      {children}
    </button>
  );
}
