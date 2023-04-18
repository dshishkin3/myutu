import style from './ErrorInput.module.scss';

type ErrorInputProps = {
  text: string;
  className?: string;
}

const ErrorInput = ({ text, className = '' }: ErrorInputProps) => <div className={`${style.text} ${style[className]}`}>{ text }</div>

export default ErrorInput