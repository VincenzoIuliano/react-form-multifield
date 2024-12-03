import style from './Button.module.css'

export default function Button({text='Salva'}) {
  return (
    <button className={style.button}>{text}</button>
  )
}