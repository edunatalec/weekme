interface Props {
  item: string;
}

export const Badge = ({ item }: Props) => {
  return (
    <div className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
      {item}
    </div>
  );
};
