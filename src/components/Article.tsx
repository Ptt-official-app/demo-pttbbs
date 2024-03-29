import React, { useState } from 'react'

import { Cell } from 'fixed-data-table-2'

import screenStyles from './Screen.module.css'

import RowHighlightedCell from './cells/RowHighlightedCell'
import Runes from './cells/Runes'

import Screen from './Screen'

import { CHAR_WIDTH } from './utils'
import { Line, TableData } from '../types'

const _COLUMNS = [
    { Header: '', accessor: '', width: 0, fixed: true, type: 'rest' },
    { Header: 'text', accessor: 'runes', width: CHAR_WIDTH * 90, fixed: true },
    { Header: '', accessor: '', width: 0, fixed: true, type: 'rest' },
]

type Props = {
    lines: Line[]
    width: number
    height: number
    loadPre: Function
    loadNext: Function
    scrollToRow?: number
    onVerticalScroll?: (scrollPos: number) => boolean
    scrollTop: number
}

export default (props: Props) => {
    const { lines, width, height, loadPre, loadNext, scrollToRow, onVerticalScroll, scrollTop } = props

    const [selectedRow, setSeletedRow] = useState(-1)

    // assume that we will need to use different highlight for different cell
    let defaultHighlight = {
        backgroundColor: '#333',
    }

    let renderCell = (column: any, data: TableData<any>, fontSize: number) => {

        let renderer = null

        switch (column.accessor) {
            case 'runes':
                renderer = Runes
                break
            default:
                return <Cell className={screenStyles['default']}></Cell>
        }
        return <RowHighlightedCell
            column={column}
            data={data}
            fontSize={fontSize}
            content={renderer}
            setRowNum={setSeletedRow}
            highlightRow={selectedRow}
            highlightStyle={defaultHighlight}
            loadPre={loadPre}
            loadNext={loadNext} />
    }

    if (lines.length === 0) {
        return (
            <div className="container">(目前無法看到文章喔～)</div>
        )
    }

    return (
        <Screen width={width} height={height} columns={_COLUMNS} data={lines} renderCell={renderCell} scrollToRow={scrollToRow} onVerticalScroll={onVerticalScroll} scrollTop={scrollTop} />
    )
}
