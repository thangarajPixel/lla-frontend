import { Button } from "../ui/button"

const ButtonWidget = ({ children, ...props }) => {
  return (
   <Button {...props}>
    {children}
   </Button>
  )
}
export default ButtonWidget