import Link from "next/link";
import NavItem from "./NavItem";
import SandwichMenu from "./SandwichMenu";


const NavItems = [
  { name: "Home", href: "" },
  { name: "Profile", href: "/profile" },
  { name: "Transactions", href: "/transactions" },
  {name: "Logout", href: "/logout"}
];

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-4 w-full bg-white dark:bg-gray-800 sticky top-0 left-0 z-10">
      <div className="flex items-center container">
        <Link href="" className="text-lg font-semibold" prefetch={false}>
          BITES Bank
        </Link>
      </div>
      <div className="hidden lg:flex gap-6">
        {NavItems.map((item, idx) => (
          <NavItem item={item} key={idx} />
        ))}
      </div>
      <div className="lg:hidden">
        <SandwichMenu items={NavItems} />
      </div>
    </div>
  );
};

export default Navbar;
