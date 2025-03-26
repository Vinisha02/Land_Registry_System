
export const metadata = {
  title: "Dashboard",
  description: "A sample dashboard with persistent layout",
};

const RootLayout = ({ children }) => {
  return (
    
<html lang="en">
  <body>
    <div className="h-screen flex bg-background text-text">
    
      <aside className="w-64 bg-primary text-text p-6  overflow-hidden">
        <h1 className="text-2xl font-bold mb-6">Saurabh</h1>
        <nav>
          <ul className="space-y-8"> 
            <li>
              <a href="/DahBoard" className="text-lg hover:text-secondary">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/verify-user" className="text-lg hover:text-secondary">
                Verify User
              </a>
            </li>
            <li>
              <a href="/verify-land" className="text-lg hover:text-secondary">
                Verify Land
              </a>
            </li>
            <li>
              <a href="/Transfer" className="text-lg hover:text-secondary">
                Transfer Ownership
              </a>
            </li>
            <li>
              <a href="#" className="text-lg hover:text-secondary">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

   
      <main className="flex-1 p-8 overflow-auto">
       {children}
      </main>
    </div>

  </body>
</html>

  );
};

export default RootLayout;


