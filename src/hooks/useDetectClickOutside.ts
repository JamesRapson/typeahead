/**
 * The hook is designed to handle click event triggered outside the component
 * which provides component ability to determine if they have lost focus
 */
import React from "react";

export const useDetectClickOutside = (
  isVisible: boolean,
  elementRef: React.RefObject<any>
) => {
  const [hasFocus, setHasFocus] = React.useState(isVisible);

  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        elementRef.current &&
        !(elementRef.current! as HTMLElement).contains(
          event.target as HTMLElement
        )
      ) {
        setHasFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elementRef]);

  return { hasFocus, setHasFocus };
};
