import React from "react";
import styles from "./styles.module.css";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { passwordReset } from "../services/actions/passwordReset";
import { useNavigate } from 'react-router-dom'

export function PasswordResetPage() {

    const [code, setCode] = React.useState('')
    const [newPass, setNewPass] = React.useState('')
    const dispatch = useDispatch()
    const { isMailSent } = useSelector(state => state.getToken)
    const { res } = useSelector(state => state.passwordReset)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!isMailSent) {
            navigate('/forgot-password')
        }
    })

    React.useEffect(() => {
        if (res.success) {
            navigate('/login')
        }
    },[res])

    return (
        <div className={styles.head}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <PasswordInput
                onChange={e => setNewPass(e.target.value)}
                value={newPass}
                name={'password'}
                extraClass="mb-6"
                placeholder={'Введите новый пароль'}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCode(e.target.value)}
                value={code}
                name={'code'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button onClick={() => dispatch(passwordReset(newPass, code))} htmlType="button" type="primary" size="large" extraClass="mb-20">
                Сохранить
            </Button>
            <div className={styles.signature}>
                <p className="text text_type_main-default">
                    Вспомнили пароль?
                </p>
                <Link to='/login' className={styles.link}>
                    <p className="text text_type_main-default mb-4">
                        Войти
                    </p>
                </Link>
            </div>
        </div>
    )
}