import React, { useState, useEffect } from 'react';
import { NavLink, Modal, ModalHeader, ModalBody, Label, Button, Alert, Form, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector} from 'react-redux';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';

const LoginModal = () => {
    const [modal, setModal] = useState(false)       //모달이 열려있는지 닫혀있는지 체크
    const [localMsg, setLocalMsg] = useState('')
    const [form, setValues] = useState({
        email: "",
        password: ""
    })
    //redux 간단하게 불러오기?
    const dispatch = useDispatch()
    const {errorMsg} = useSelector((state) => state.auth)
    //errMsg에 변화가 있을 떄 함수를 작동시키는 것? 잘 모르겠다. 
    useEffect(() => {
        try{
            setLocalMsg(errorMsg)
        } catch(e) {
            console.log(e)
        }
    }, [errorMsg])

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        }) 
        setModal(!modal)
    }

    //react에서 input을 다룰 때는 onChange를 사용
    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //작업한 걸 서버로 보낼 떄
    const onSubmit = (e) => {
        e.preventDefault()
        //form 에서 email, password 추출
        const {email, password} = form
        const user = {email, password}
        console.log(user)
        dispatch ({
            type: LOGIN_REQUEST,
            payload: user
        })
    }

    return (
        //로그인 정보 입력하는 모달
        <div>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {localMsg ? 
                        <Alert color="danger">{localMsg}</Alert>
                        :
                        null
                    }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>     
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder = 'Email'
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>     
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder = 'Password'
                                onChange={onChange}
                            />
                            <Button color="dark" style={{marginTop: "2rem"}} block>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
               </ModalBody>
            </Modal>
        </div>
    )
};
 
export default LoginModal;