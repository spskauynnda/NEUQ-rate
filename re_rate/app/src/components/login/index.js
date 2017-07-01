import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
import API from './../../url'

import './index.less'

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {userName, password} = values
        const body = {
          user: userName,
          password: password
        }
        fetch( API.login, {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(body)
        }).then((res)=>res.json()
        ).then((data)=> {
          console.log(data)
          if (data.status === 0) {
            window.localStorage.setItem('userName', userName)
            window.localStorage.setItem('password', password)
            window.localStorage.setItem('is_login', 1)
            window.history.go(0)
          } else if (data.status === 1) {
            alert('用户名密码错误，请重新输入！')
          }
        }).catch(function(e) {
          console.log("Oops, error");
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-title">
          <span>欢迎使用东秦网络艺术大赛评分系统</span>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login