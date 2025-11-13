
import Link from "next/link"

const LinkWidget = ({ children, href, ...props }: { children: React.ReactNode, href: string } & React.ComponentProps<typeof Link>) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export default LinkWidget