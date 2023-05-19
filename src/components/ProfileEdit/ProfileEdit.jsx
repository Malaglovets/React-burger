import React from "react";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from "../../utils/cookie";
import styles from "./ProfileEdit.module.css"
import { refreshUserInfo } from "../../services/actions/refreshUser";

export default function ProfileEdit() {

    const { user } = useSelector(state => state.userInfo.userInfo)

    const [email, setEmail] = React.useState({
        mail: `${user.email}`,
        disabled: true
    })
    const [name, setName] = React.useState({
        userName: `${user.name}`,
        disabled: true
    })
    const [pass, setPass] = React.useState('')
    const dispatch = useDispatch()
    const nameRef = React.useRef(null)
    const emailRef = React.useRef(null)
    const onNameClick = () => {
        setTimeout(() => nameRef.current.focus(), 0)
        setName({ ...name, disabled: false })
    }
    const onEmailClick = () => {
        setTimeout(() => emailRef.current.focus(), 0)
        setEmail({ ...email, disabled: false })
    }

    const canselChanges = () => {
        setName({ ...name, userName: user.name });
        setEmail({ ...email, mail: user.email });
    }

    return (
        <div className={styles.inputs}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onIconClick={onNameClick}
                onChange={e => setName({ ...name, userName: e.target.value })}
                value={name.userName}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                icon={'EditIcon'}
                ref={nameRef}
                onBlur={() => setName({ ...name, disabled: true })}
                disabled={name.disabled ? true : false}
            />
            <Input
                type={'email'}
                placeholder={'Логин'}
                onIconClick={onEmailClick}
                onChange={e => setEmail({ ...email, mail: e.target.value })}
                value={email.mail}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                icon={'EditIcon'}
                ref={emailRef}
                onBlur={() => setEmail({ ...email, disabled: true })}
                disabled={email.disabled ? true : false}
            />
            <PasswordInput
                onChange={e => setPass(e.target.value)}
                value={pass}
                name={'password'}
                icon="EditIcon"
            />
            {email.mail !== user.email || pass !== '' || name.userName !== user.name ?
                <div className={styles.buttons}>
                    <Button onClick={canselChanges} htmlType="button" type="secondary" size="medium">
                        Отмена
                    </Button>
                    <Button onClick={() => dispatch(refreshUserInfo(name.userName, email.mail, pass, getCookie('token')))} htmlType="button" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
                :
                <></>
            }
        </div>
    )
}