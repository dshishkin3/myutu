
type HeadingProps = {
  title: string;
  classNames?: string;
}

import style from './Heading.module.scss';

const LogoWrapper = ({ title, classNames = '' }: HeadingProps) => {
  return (
    <h2 className={`${style.logo} ${style[classNames]}`}>{title}</h2>  
  )
};

export default LogoWrapper;