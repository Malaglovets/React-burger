import React from "react";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from "../../utils/cookie";
import styles from "./ProfileEdit.module.css";
import { refreshUserInfo } from "../../services/actions/refreshUser";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";


export default function ProfileEdit() {

    const { userInfo } = useAppSelector(state => state.userInfo)
    const { userRefresh, userRefreshRequest } = useAppSelector(state => state.refreshUser)
   
    const [email, setEmail] = React.useState({
        mail: `${userInfo?.user?.email || ""}`,
        disabled: true   
      })
            
      const [name, setName] = React.useState({
        userName: `${userInfo?.user?.name || ""}`,
        disabled: true
      })
      
    const [pass, setPass] = React.useState('')
    const dispatch = useAppDispatch()
    const nameRef = React.useRef<HTMLInputElement>(null)
    const emailRef = React.useRef<HTMLInputElement>(null)
    const onNameClick = () => {
        setTimeout(() => nameRef.current?.focus(), 0)
        setName({ ...name, disabled: false })
    }
    const onEmailClick = () => {
        setTimeout(() => emailRef.current?.focus(), 0)
        setEmail({ ...email, disabled: false })
    }
    const canselChanges = () => {
        if (userInfo?.user) {
            setName({ ...name, userName: userInfo.user.name });
            setEmail({ ...email, mail: userInfo.user.email });
            setPass('')
        }
    }
    
    const confirmChanges = (event: React.FormEvent) => {
        event.preventDefault()
        dispatch(refreshUserInfo(name.userName, email.mail, pass, getCookie('token')))
    }
    React.useEffect(() => {
        if (userRefresh?.success) {
            canselChanges()
        }
    }, [userRefresh])

    return (
        <form className={styles.inputs}>
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
                value={userInfo?.user?.email || ""}
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
            {email.mail !== userInfo?.user?.email || pass !== '' || name.userName !== userInfo?.user?.name && !userRefreshRequest ?
                <div className={styles.buttons}>
                    <Button onClick={canselChanges} htmlType="button" type="secondary" size="medium">
                        Отмена
                    </Button>
                    <Button onClick={confirmChanges} htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
                :
                <></>
            }
            {userRefreshRequest ?
                <p className="text text_type_main-medium mt-8">Обновляю данные...</p>
                :
                <></>
            }
        </form>
    )
}