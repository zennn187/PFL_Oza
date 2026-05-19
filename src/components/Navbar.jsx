import Avatar from "./Avatar";
import InputField from "./InputField";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-100 fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between">
      <div className="w-80">
        <InputField type="text" placeholder="Search here..." />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">Oza Admin</p>
          <p className="text-xs text-gray-400">Manager</p>
        </div>
        <Avatar name="Oza Admin" />
      </div>
    </header>
  );
}