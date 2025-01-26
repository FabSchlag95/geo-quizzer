

/**
 * A button component that displays text and can be styled as active or disabled.
 * It has no bg color and no border.
 *
 * @component
 */
import { useEffect, useState } from "react";
import "./components.css";

export default function TextButton({
  activeWhen,
  children,
  onClick,
  disabled,
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(activeWhen);
  }, [activeWhen]);
  return (
    <button
      disabled={disabled}
      onClick={
        disabled
          ? undefined
          : () => {
              onClick();
            }
      }
      className="text-button"
      style={{
        ...(active && !disabled && {
          textDecoration: "underline",
          textDecorationColor: "var(--font-color)",
          textDecorationThickness: 3,
        }),
      }}
    >
      {children}
    </button>
  );
}
