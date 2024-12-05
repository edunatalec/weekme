interface Props {
  readonly children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex h-full items-center justify-center">{children}</main>
  );
};

export default AuthLayout;
