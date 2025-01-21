"use client";

import { Button } from "@/components/ui/button";

interface Props {
  text: string;
  loading: boolean;
}

export const ConfirmButton = ({ text, loading }: Props) => {
  return (
    <Button
      className="w-full"
      type="submit"
      variant="success"
      loading={loading}
    >
      {text}
    </Button>
  );
};
