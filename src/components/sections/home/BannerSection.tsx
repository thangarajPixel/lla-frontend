import ButtonWidget from "@/components/widgets/ButtonWidget"
import LinkWidget from "@/components/widgets/LinkWidget"
import { Fragment } from "react/jsx-runtime"

const BannerSection = () => {
  return (
    <Fragment>
        <ButtonWidget>
            banner button
        </ButtonWidget>
        <LinkWidget href="/" className="text-red-500">
            banner link
        </LinkWidget>
    </Fragment>
  )
}

export default BannerSection