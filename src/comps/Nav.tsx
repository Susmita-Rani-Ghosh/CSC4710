import Link from "next/link";

export default function Nav() {
  return (
    <ul className="flex w-full overflow-x-auto bg-slate-800 p-5 shadow-xl">
      <li className="mr-6">
        <Link className="text-blue-200 hover:text-blue-500" href="/">
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-200 hover:text-blue-500" href="/authors">
          Authors
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-200 hover:text-blue-500" href="/todo">
          TODOs
        </Link>
      </li>
    </ul>
  );
}
