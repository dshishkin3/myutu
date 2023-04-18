import style from './CreatedAdUI.module.scss';

type LabelUIPRops = {
  id?: string;
  title: string;
  required: boolean;
  className?: string;
}

const LabelUICustom = ({ id, title, required, className = '' }: LabelUIPRops) => {
  return (
    <label htmlFor={id} className={`${style.label} ${style[className]}`}>
      { title }

      {required ? <span>*</span> : null}
    </label>
  )
}

export default LabelUICustom;