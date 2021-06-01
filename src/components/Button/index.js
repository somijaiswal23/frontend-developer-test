import './style.css'
const Button = ({onClick, className, label, type="button"}) =>{
    return <button onClick={onClick} className={`btn ${className}`} type={type}>{label}</button>
}

export default Button