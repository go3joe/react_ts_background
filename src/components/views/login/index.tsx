import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import style from './login.module.scss'
import './login.less'
import initLoginBg from './init.ts'
import { Input,Space,Button } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
const view = () => {

    useEffect(() => {
        initLoginBg()
        //窗口改变时重新初始化
        window.onresize = function(){initLoginBg()}
    },[])
    //获取用户输入信息
    const [usernameVal,setUsernameVal] = useState('')
    const [passwordVal,setPasswordVal] = useState('')
    const [captchaVal,setCaptchaVal] = useState('')
    const usernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value);
        setUsernameVal(e.target.value);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value);
    }
    const captchaChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value);
    }

    const login = () => {
        console.log(usernameVal,passwordVal,captchaVal);
        
    }

    return(
        <div className={style.loginPage}>
            {/* 存放背景 */}
            <canvas id='canvas' style={{display:'block'}}></canvas>
            {/* 登陆盒子 */}
            <div className={style.loginBox + " loginbox"}>
                {/* title */}
                <div className={style.title}>
                    <h1>后台管理系统</h1>
                    <p>Strive Everyday</p>
                </div>
                {/* form */}
                <div className='form'>
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Input placeholder="用户名" onChange={usernameChange}/>
                    <Input.Password
                        placeholder="密码"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={passwordChange}
                    />
                    <div className="captchaBox">
                        <Input placeholder="请输入验证码" onChange={captchaChange}/>
                        <div className="captchaImg">
                            <img height='38' src="https://pic.616pic.com/ys_bnew_img/00/29/79/9UMK4fzdwr.jpg" alt="" />
                        </div>
                    </div>
                    <Button type="primary" className='loginBtn' block onClick={login}>登陆</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}
export default view