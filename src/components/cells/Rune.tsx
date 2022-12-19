import styles from './ContentRenderer.module.css'
import { MouseEvent } from 'react'
import { getClassNamesFromRune } from './utils'

type Props = {
    rune: any
    rowIndex?: number
    idx: number
    onMouseDown?: (e: MouseEvent, rowIndex: number, idx: number) => void
    [key: string]: any
}

export default (props: Props) => {
    let { rune, rowIndex, idx, onMouseDown } = props
    let [classNames0, isTwoColor] = getClassNamesFromRune(rune)
    let classNamesGroup = rune.pullright ? [styles['pull-right']] : []
    let runeKey = 'rune-' + rowIndex + '-' + idx
    let _onMouseDown = (e: MouseEvent) => {
        if (!onMouseDown) {
            return
        }

        rowIndex = rowIndex || 0
        onMouseDown(e, rowIndex, idx)
    }
    if (isTwoColor) {
        classNamesGroup.push(styles['halves-group'])
        let classNameGroup = classNamesGroup.join(' ')
        let className0 = classNames0.join(' ')
        return (
            <span className={classNameGroup}>
                {[...rune.text].map((ch, idx) => (
                    <span key={`${runeKey}-${idx}`} className={className0} onMouseDown={_onMouseDown} data-text={ch}>{ch}</span>
                ))}
            </span>
        )
    } else {
        classNames0.push(...classNamesGroup)
        let className0 = classNames0.join(' ')
        return (
            <span key={runeKey} className={className0} onMouseDown={_onMouseDown}>{rune.text}</span>
        )
    }
}