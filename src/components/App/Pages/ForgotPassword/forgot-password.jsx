import React from "react";
import styles from "./forgot-password.module.css";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from "../../../../services/actions/forgotPassword";

export function ForgotPasswordPage() {

    const [email, setEmail] = React.useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { res } = useSelector(state => state.getToken)

    React.useEffect(() =>{
        if (res.success) {
        navigate('/reset-password');
    }
    },[res])

    return (
        <div className={styles.head}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <Button onClick={() => dispatch(getToken(email))} htmlType="button" type="primary" size="large" extraClass="mb-20">
                Восстановить
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