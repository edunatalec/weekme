const UserCard = () => {
  return (
    <div className="flex items-center gap-4 rounded-md bg-card px-2 py-2 dark:md:bg-zinc-950">
      <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        E
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold">Eduardo</span>
        <span className="text-sm">Admin</span>
      </div>
    </div>
  );
};

export default UserCard;
