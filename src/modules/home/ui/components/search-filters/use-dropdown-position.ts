import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if(!ref.current) return { top: 0, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // width of dropdown (w-60 = 15rem = 240px)

    // Calculate the position of the dropdown
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // check if the dropdown goes off the right side of the screen
    if (left + dropdownWidth > window.innerWidth) {
      //align to the right side of the button instead
      left = rect.right + window.scrollX - dropdownWidth;

      // if it goes off the left side of the screen, align to the left side of the button
      if (left < 0) {
        left = window.innerWidth - dropdownWidth -16;
      }
    }

    // ensure the dropdown is within the viewport
    if (left < 0 ) {
      left = 16;
    } 
    return { top, left };
  }

  return { getDropdownPosition };
}