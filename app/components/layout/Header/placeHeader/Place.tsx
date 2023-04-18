import Link from 'next/link';
import Router from 'next/router';
import { useRecoilValue, useRecoilState } from 'recoil';
import { logged, showAuthModal, showRegForm } from 'app/store/atoms';

import style from './Place.module.scss';

const Place = () => {
  const isLogged = useRecoilValue(logged);
  const [ showModal, setShowModal ] = useRecoilState(showAuthModal);

  const handleClick = () => {
    if (isLogged) {
      Router.push('/category')
    } else {
      setShowModal(true);
    }
  }

  return (
    <button className={style.place} onClick={handleClick}>
      <span>Разместить объявление</span>
    </button>
  )
}

export default Place;