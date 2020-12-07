import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from '../../redux/types';
import { NavLink, Modal, ModalHeader, Alert, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const RegisterModal = () => {
    const [modal, setModal] = useState(false)
    const [form, setValue] = useState({
        name: "",
        email: "",
        password: ""
    })
    //메세지 저장할 useState
    const [localMsg, setLocalMsg] = useState('')
    //state.auth는 redux>reducers>index.js의 auth를 의미. 
    //저기서 errorMsg를 가져옴
    const {errorMsg} = useSelector ((state) => state.auth)

    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal)
    }

    useEffect(() => {
        try{
            setLocalMsg(errorMsg)
        } catch(e){
            console.error(e)
        }
    }, [errorMsg]) 

    const onChange = (e) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const {name, email, password} = form;
        const newUser = {name, email, password}
        console.log(newUser, "newUser")
        dispatch({
            type: REGISTER_REQUEST,
            payload: newUser
        })
    }
    //일반적으로 redux를 만든 사람이 추천한, react 구조화 방식 중 하나인데,
    //함수부분을 따로 떼어서 container라 하고
    //return 이하를 Presenter 즉 보여주는 부분이라 하여
    //두개를 구분하여 작성. 파일을 모듈화해서 재사용 가능하다는 점에서 권장됨.
    //하지만, 처음 입문 시에는 이해가 쉽지 않음. 
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color=""></Alert>:null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={onChange}
                            />
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="passwod">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button color="dark" className="mt-2" block>
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RegisterModal