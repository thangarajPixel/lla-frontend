import LinkWidget from "../widgets/LinkWidget";
import Image from "next/image";

const Header = () => {
  return (
    <header>
        <nav>
            <LinkWidget href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </LinkWidget>
        </nav>
    </header>
  )
};

export default Header;