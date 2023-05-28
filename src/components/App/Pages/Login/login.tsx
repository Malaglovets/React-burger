import React from "react";
import styles from "./login.module.css";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from "../../../../services/actions/login";
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

export function Login() {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const { loginUserRequest } = useAppSelector(state => state.loginUser)
    const dispatch = useAppDispatch()

    function logIn(event: React.FormEvent) {
        event.preventDefault()
        dispatch(loginUser(email, pass))
    }

    return (
        <form className={styles.form}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={e => setPass(e.target.value)}
                value={pass}
                name={'password'}
                extraClass="mb-6"
            />
            <Button
                disabled={email === "" || pass === "" || loginUserRequest ? true : false}
                onClick={logIn}
                htmlType="submit"
                type="primary"
                size="large"
                extraClass="mb-20">
                Войти
            </Button>
            <div className={styles.signature}>
                <p className="text text_type_main-default">
                    Вы - новый пользователь?
                </p>
                <Link to='/register' className={styles.link}>
                    <p className="text text_type_main-default mb-4">
                        Зарегистрироваться
                    </p>
                </Link>
            </div>
            <div className={styles.signature}>
                <p className="text text_type_main-default">
                    Забыли пароль?
                </p>
                <Link to='/forgot-password' className={styles.link}>
                    <p className="text text_type_main-default text_color_active">
                        Восстановить пароль
                    </p>
                </Link>
            </div>
        </form>
    )
}