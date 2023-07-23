import "./button.css"

const Button = ({type , className , clickHandler, children}) => {
  return (
    <button onClick={()=>clickHandler?.()} className={`btn ${className}`}>{children}</button>
  )
}

export default Button