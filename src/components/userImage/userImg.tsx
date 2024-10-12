import styles from './UserImg.module.css'

interface PropsUserImage {
  img: string
  hasBorder?: boolean
}

export function UserImage({ img, hasBorder = true }: PropsUserImage) {
  return (
    <img
      src={img}
      alt="user profile image"
      className={hasBorder ? styles.userImage : styles.noBorder}
    />
  )
}
