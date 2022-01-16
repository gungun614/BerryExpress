import React from 'react'
import Label from '../widgets/Label'
import Button from '../widgets/Button'

const Modal = (props) => {

    const { header, body, data, isHide } = props
    const { buttonConfirm, buttonSave, buttonCancel, buttonOK, buttonDone, buttonClose } = props

    const confirm = (button) => button ? <Button text="ยืนยัน" onClick={buttonConfirm} /> : ''
    const save = (button) => button ? <Button text="บันทึก" onClick={buttonSave} /> : ''
    const cancel = (button) => button ? <Button text="ยกเลิก" onClick={buttonCancel} /> : ''
    const ok = (button) => button ? <Button text="ตกลง" onClick={buttonOK} /> : ''
    const done = (button) => button ? <Button text="เสร็จสิ้น" onClick={buttonDone} /> : ''
    const close = (button) => button ? <Button text="ปิด" onClick={buttonClose} /> : ''

    const style = {
        display: isHide ? 'none' : 'block'
    }

    return (
        <div style={style}>
            <div>
                <b><Label text={header} /></b>
            </div>
            <div>
                {body}
            </div>
            <div>
                <span style={{ display: 'inline-block' }}>
                    {confirm(buttonConfirm)}
                    {save(buttonSave)}
                    {cancel(buttonCancel)}
                    {ok(buttonOK)}
                    {done(buttonDone)}
                    {close(buttonClose)}
                </span>
            </div>
        </div>
    )
}

export default Modal