import React, {Component} from 'react';
import { Form, Table, Button, InputNumber, Modal } from 'antd';
const confirm = Modal.confirm;
import API from './../../url'

import './index.less'

let value = [0, 0, 0, 0, 0]

class ListForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 1,
      id: '1001',
      xuhao: '01',
      leader: '从聪',
      name: '校庆ps作品',
    }
    this.showConfirm = this.showConfirm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit () {
    const body = {
      user: window.localStorage.getItem('userName'),
      password: window.localStorage.getItem('password'),
      student: this.state.id,
      vector: value
    }
    console.log(body)
    fetch( API.submit, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res)=>res.json()
    ).then((data)=> {
      console.log(data)
      if (data.status === 0) {
        window.history.go(0)
      } else if (data.status === 2) {
        console.log('用户名密码错误')
      } else {
        console.log('未知错误！')
      }
    }).catch((e)=>
      console.log(e)
    )
  }

  error () {
    Modal.error({
      title: '登陆失效',
      content: '请您再次登陆',
    });
  }

  success() {
    Modal.success({
      title: '所有选手均打分结束',
      content: '感谢您参与第八届网络艺术大赛！',
      okText: '好的'
    });
  }

  showConfirm () {
    let submit = this.handleSubmit
    let sum = 0
    console.log(sum, 0)
    console.log(value)
    value.forEach((item) => {
      sum += item
    })
    confirm({
      title: '请您核对——',
      content: `您给出的总分为${sum}分，点击确认将提交分数`,
      onOk() {
        submit()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  setValue = (mark, index) => value[index] = mark

  componentDidMount () {
    const body = {
      user: window.localStorage.getItem('userName'),
      password: window.localStorage.getItem('password'),
    }
    fetch( API.getInfo, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res)=>res.json()
    ).then((data)=> {
      console.log(data)
      if (data.status === 0) {
        this.setState({
          id: data.id,
          xuhao: data.xuhao,
          leader: data.leader,
          name: data.name,
          type: data.type === 'ps' ? 0 : (data.type === 'web' ? 2 : 1)
        })
        // window.history.go(0)
      } else if (data.status === 1) {
        this.error()
        window.localStorage.clear()
        window.history.go(0)
      } else if (data.status === 2) {
        this.success()
      }
    }).catch((e)=>
      console.log(e)
    )
  }

  render() {
    class Num extends Component {
      onChange = (num) => {
        if (num < 0 || num > 10) {
          num = 10
        }
        this.props.setValue(num, this.props.record.key - 1)
      }
      render (){
        return (
          <div className="Num-wrapper">
            <InputNumber min={0} max={10} onChange={this.onChange} />
          </div>
        )
      }
    }
    const { getFieldDecorator } = this.props.form;
    const webData = [{
      key: '1',
      number: '1',
      content: '紧扣主题 （10分）',
      score: 32,
    }, {
      key: '2',
      number: '2',
      content: '色调和谐 （10分）',
      score: 23,
    }, {
      key: '3',
      number: '3',
      content: '技术手段 （10分）',
      score: 42,
    }, {
      key: '4',
      number: '4',
      content: '可读性良好 （10分）',
      score: 64
    }, {
      key: '5',
      number: '5',
      content: '结构完整、健全 （10分）',
      score: 42,
    }];
    const pptData = [{
      key: '1',
      number: '1',
      content: '主题表意明确 （10分）',
      score: 32,
    }, {
      key: '2',
      number: '2',
      content: '作品流畅度 （10分）',
      score: 23,
    }, {
      key: '3',
      number: '3',
      content: '创意创新 （10分）',
      score: 42,
    }, {
      key: '4',
      number: '4',
      content: '表现手法 （10分）',
      score: 64
    }, {
      key: '5',
      number: '5',
      content: '技术手法 （10分）',
      score: 42,
    }];
    const psData = [{
      key: '1',
      number: '1',
      content: '思想内容积极（10分）',
      score: 23
    }, {
      key: '2',
      number: '2',
      content: '主题表意明确（10分）',
      score: 23,
    }, {
      key: '3',
      number: '3',
      content: '图形表现力 （10分）',
      score: 42,
    }, {
      key: '4',
      number: '4',
      content: '表现手法 （10分）',
      score: 64
    }, {
      key: '5',
      number: '5',
      content: '技术手法 （10分）',
      score: 42,
    }];

    const columns = [{
      title: '序号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '评分标准及分值',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '打分',
      render: record => (
        <Num record={record} setValue={this.setValue}/>
      ),
      key: 'score',
    }];

    const groupType = [
      '平面设计',
      '视频PPT',
      '网站(web)'
    ]
    const dataType = [
      psData,
      pptData,
      webData,
    ]

    return (
      <div className="list">
        <div className="list-title">
          <span>2017东秦网络艺术大赛</span>
        </div>
        <div className="list-info">
          <Button type="primary">组别：{groupType[this.state.type]}&nbsp;{this.state.xuhao}组</Button>
          {/*<Button>队号：{this.state.id}</Button>*/}
          <Button type="dashed">队长姓名：{this.state.leader}</Button>
        </div>
        <div className="list-info">
          <Button>作品名称&nbsp;&nbsp;——&nbsp;&nbsp;<b>{this.state.name}</b></Button>
        </div>
        <Table dataSource={dataType[this.state.type]} columns={columns} pagination={false}/>
        <div className="list-button">
          <Button type="primary" onClick={this.showConfirm}>打分</Button>
        </div>
      </div>
    );
  }
}

const List = Form.create()(ListForm)
export default List