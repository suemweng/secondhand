import { Button, message, Form, Input, InputNumber, Layout } from "antd";
import React from "react";
import AcctInfo from "./AcctInfo";

class ItemUpload extends React.Component {
    uploadRef = React.createRef();

    state = { loading: false, };

    uploadOnClick = () => {
        console.log("Upload Completed!")
    }

    handleSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.uploadRef.current;
     
        if (files.length > 3) {
          message.error("You can upload at most 3 items.");
          return;
        }
     
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
     
        formData.append("Title", values.title);
        formData.append("Price", values.price);
        formData.append("Category", values.category);
        formData.append("Description", values.description);
        formData.append("Pictures", values.picture);
     
        this.setState({loading: true,});

        try {
          await ItemUpload(formData);
          message.success("Successfully Submitted!");
        } catch (error) {
          message.error(error.message);
        } finally {
          this.setState({loading: false,});
        }
    };
    
    render() {
        return(
            <Form
                {...Layout} 
                name="Please Upload Item"
                onFinish={this.handleSubmit}
                style={{maxWidth: 1000, margin: "auto"}}
            >
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
                </Form.Item>
                <Form.Item name="pictures" label="Pictures" rules={[{ required: true }]}>
                    <input type="file" accept="image/png, image/jpeg" ref={this.uploadRef} multiple={true}/>
                    Choose Files
                </Form.Item>
                <Form.Item>
                    <Button shape="default" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.uploadOnClick}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            
        ); 
    } 
}

export default ItemUpload;