import { useState } from "react";

function useDropdown(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle
  };
}

export default useDropdown;