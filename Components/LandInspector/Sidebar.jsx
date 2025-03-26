import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <h1 className="text-xl font-bold p-4">Land Inspector Dashboard</h1>
      <nav className="flex flex-col mt-4">
        <Link href="/dashboard" className="px-4 py-2 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link href="/verifyuser" className="px-4 py-2 hover:bg-gray-700">
          Verify User
        </Link>
        <Link href="/verifyland" className="px-4 py-2 hover:bg-gray-700">
          Verify Land
        </Link>
        <Link href="/transferownership" className="px-4 py-2 hover:bg-gray-700">
          Transfer Ownership
        </Link>
        <Link href="/logout" className="px-4 py-2 hover:bg-gray-700">
          Logout
        </Link>
      </nav>
    </div>
  );
}