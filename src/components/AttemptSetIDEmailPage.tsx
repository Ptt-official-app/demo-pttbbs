import React, { useEffect, useState } from 'react'
import pageStyles from './Page.module.css'

import * as errors from './errors'

import { useWindowSize } from 'react-use'

import { useParams } from 'react-router-dom'

import { useReducer, getRoot, genUUID, getRootID } from 'react-reducer-utils'

import * as DoAttemptSetIDEmailPage from '../reducers/attemptSetIDEmailPage'
import * as DoHeader from '../reducers/header'

import Header from './Header'
import Empty from './Empty'

type Props = {

}

export default (props: Props) => {
    const [stateAttemptSetIDEmailPage, doAttemptSetIDEmailPage] = useReducer(DoAttemptSetIDEmailPage)
    const [stateHeader, doHeader] = useReducer(DoHeader)

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')

    //init
    let { userid } = useParams()

    useEffect(() => {
        let headerID = genUUID()
        doHeader.init(headerID,)

        let attemptSetIDEmailPageID = genUUID()
        doAttemptSetIDEmailPage.init(attemptSetIDEmailPageID, userid)
    }, [])

    //get data
    let attemptSetIDEmailPage = getRoot(stateAttemptSetIDEmailPage)
    if (!attemptSetIDEmailPage) {
        attemptSetIDEmailPage = { theDate: new Date(0), userID: '', isDone: false }
    }
    let myID = getRootID(stateAttemptSetIDEmailPage)
    let userID = attemptSetIDEmailPage.userID
    let errmsg = attemptSetIDEmailPage.errmsg || ''
    let isDone = attemptSetIDEmailPage.isDone

    useEffect(() => {
        if (!isDone) {
            return
        }

        doAttemptSetIDEmailPage.SleepAndRedirect(myID, userid)

    }, [isDone])

    //render
    const { height: innerHeight } = useWindowSize()
    let style = {
        height: innerHeight + 'px',
    }

    let cleanErr = () => {
        setErrMsg('')
        doAttemptSetIDEmailPage.CleanErr(myID)
    }

    let changePassword = (password: string) => {
        setPassword(password)
        cleanErr()
    }

    let changeEmail = (email: string) => {
        setEmail(email)
        cleanErr()
    }

    let submit = () => {
        if (!email) {
            setErrMsg('您是忘記您的 email 了？～')
            return
        }
        if (!password) {
            setErrMsg('您是忘記您的密碼了？～')
            return
        }
        doAttemptSetIDEmailPage.SetIDEmail(myID, userID, password, email)
        cleanErr()
    }

    let renderData = () => {
        if (!isDone) {
            return (<Empty />)
        }

        return (
            <label className=''>已經成功送出確認信囉～請您到您設定的信箱確認～</label>
        )
    }

    let allErrMsg = errors.mergeErr(errMsg, errmsg)

    return (
        <div className={pageStyles['root']} style={style}>
            <div className={'container'}>
                <Header title='我想換認證 Email' stateHeader={stateHeader} />
                <div className='row'>
                    <div className='col'>
                        <label>我是 {userID}</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <input className="form-control" type="text" placeholder="新的認證 Email:" aria-label="email" value={email} onChange={(e) => changeEmail(e.target.value)} />
                    </div>
                    <div className='col'></div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <input className="form-control" type="password" placeholder="我的密碼:" aria-label="password" value={password} onChange={(e) => changePassword(e.target.value)} />
                    </div>
                    <div className='col'></div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className="btn btn-primary" onClick={submit}>我確定要換認證 Email～</button>
                    </div>
                    <div className='col'>
                        {renderData()}
                    </div>
                    <div className='col'>
                        <label className={pageStyles['errMsg']}>{allErrMsg}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
