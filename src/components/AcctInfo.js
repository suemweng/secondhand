import { Button, Form, message } from "antd";
import React from "react";
import ItemUpload from "./ItemUpload";

class AcctInfo extends React.Component {
    formRef = React.createRef();
    state = {loading: false,};

    onFinish = () => {
        console.log("Completed!");
    };

    onClick = () => {
        return ItemUpload;
    }

    render() {
        return (
            <div style={{width: 1500, margin: "auto"}}>
                <Form
                    name="Account Information" 
                    onFinish = {this.onFinish} 
                    style={{margin: "auto"}}
                >
                    <Form.Item name="Username:" rules={[{required: true,}]}>
                    </Form.Item>
                    <Form.Item name="Alias:" rules={[{required: true,}]}>
                    </Form.Item>
                    <Form.Item name="Location:" rules={[{required: true,}]}>
                    </Form.Item>
                </Form>
                <Form 
                    name="Uploaded Items" 
                    ref = {this.formRef} 
                    onFinish = {this.onFinish}
                    style={{margin: "auto"}}
                >
                    <Form.Item name="Item1:" rules={[{required: true,}]}>
                    </Form.Item>
                    <Form.Item name="Item2:" rules={[{required: true,}]}>
                    </Form.Item>
                    <Form.Item name="Item3:" rules={[{required: true,}]}>
                    </Form.Item>
                </Form>
            <Button
                onClick={this.onClick}
                disabled={this.state.loading}
                shape="default"
                type="primary"
            >
                Add Item
            </Button>
            </div>
        );
    }
}

export default AcctInfo;