import { Button, message, Form, Input, InputNumber, Layout, Modal } from "antd";
import React from "react";
import AcctInfo from "./AcctInfo";
import { uploadItem } from "../utils";


class ItemUpload extends React.Component {


    state = { 
        loading: false, 
        displayModal: false,
    };

    uploadRef = React.createRef();

    uploadOnClick = () => {
        console.log("Upload Completed!")
    }

    handleSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.uploadRef.current;
     
        if (files.length > 3) {
          message.error("You can upload at most 3 pictures.");
          return;
        }
     
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
     
        formData.append("product_name", values.product_name);
        formData.append("price", values.price);
        formData.append("genre_type", values.genre_type);
        formData.append("description", values.description);
     
        this.setState({loading: true,});

        console.log(formData);

        try {
          await uploadItem(formData);
          message.success("Successfully Submitted!");
        } catch (error) {
          message.error(error.message);
        } finally {
          this.setState({
            loading: false,
            displayModal: false,});
        }
    };

    addOnClick = () => {
        this.setState({
          displayModal: true,
        })
      }

    handleCancel = () => {
        this.setState({
            displayModal: false,
        })
    }
    
    render() {
        return(
            <>
            <Button
            onClick={this.addOnClick}
            disabled={this.state.loading}
            shape="round"
            type="primary"
            style={{ marginLeft: '40px' }}
        >
            Add Item
        </Button>
        <Modal
          title="Upload Item"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
            <Form
                {...Layout} 
                name="Please Upload Item"
                onFinish={this.handleSubmit}
                style={{maxWidth: 1000, margin: "auto"}}
            >
                <Form.Item name="product_name" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="genre_type" label="Category" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
                </Form.Item>
                <Form.Item name="images" label="Pictures" rules={[{ required: true }]}>
                    <input type="file" accept="image/png, image/jpeg" ref={this.uploadRef} multiple={true}/>
                    Choose Files
                </Form.Item>
                <Form.Item>
                    {/* <Button shape="default" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.uploadOnClick}> */}
                    <Button shape="default" type="primary" htmlType="submit" loading={this.state.loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>    
        </>); 
    } 
}

export default ItemUpload;