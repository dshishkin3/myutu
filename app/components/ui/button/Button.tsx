import style from './Button.module.scss'

type ButtonProps = {
  text: string;
  className?: string;
  handleClick?: (event: any) => void;
  disabled?: boolean
}

const Button = ({ text, handleClick, disabled, className = '' }: ButtonProps) => {
  return (
    <button 
      className={`${style.btn} ${style[className]}`}
      onClick={handleClick}
      disabled={disabled}>
      <span>{text}</span>
    </button>
  )
}

export default Button