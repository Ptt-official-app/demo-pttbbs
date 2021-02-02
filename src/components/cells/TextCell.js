import { Cell } from 'fixed-data-table-2'
import styles from './Cell.module.css'

export default (props) => {
  const {data, fontSize, rowIndex, columnKey, isCategory} = props

  let item = data[rowIndex]
  let text = item[columnKey]
  if (isCategory !== undefined && isCategory === true) {
    text = '[' + text + ']'
  }

  let style = {
    'font-size': fontSize + 'px',
  }

  return(
    <Cell className={styles['text']} style={style}>{text}</Cell>
  )
}