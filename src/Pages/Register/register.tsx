import React from "react";
import styles from "./register.module.css";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { userRegister } from "../../services/actions/register";
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export function Register() {

    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [pass, setPass] = React.useState('')
    const dispatch = useAppDispatch()
    const { res, userRegisterRequest } = useAppSelector(state => state.userRegister)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (res?.success) {
            navigate('/')
        }
    }, [res])

    function register(event: React.FormEvent) {
        event.preventDefault()
        dispatch(userRegister(name, email, pass))
    }

    return (
        <form className={styles.form}>
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setName(e.target.value)}
                value={name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
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
                disabled={email === '' || name === '' || pass === '' || userRegisterRequest ? true : false}
                onClick={register}
                htmlType="submit"
                type="primary"
                size="large"
                extraClass="mb-20">
                Зарегистрироваться
            </Button>
            <div className={styles.signature}>
                <p className="text text_type_main-default">
                    Уже зарегистрированы?
                </p>
                <Link to='/login' className={styles.link}>
                    <p className="text text_type_main-default mb-4">
                        Войти
                    </p>
                </Link>
            </div>
        </form>
    )
}