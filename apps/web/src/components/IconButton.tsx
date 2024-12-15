"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const IconButton = ({ children, onClick, className }: Props) => {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

export default IconButton;
