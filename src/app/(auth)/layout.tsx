const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/main-img.png')] bg-cover bg-center h-screen overflow-hidden w-full">
      <div className="w-full h-full bg-black/75 backdrop-blur-sm flex items-center justify-center">
        <div className="w-full max-w-lg px-4">
          <div className="w-full rounded-xl bg-background backdrop-blur-md p-6 mx-auto border border-border">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
