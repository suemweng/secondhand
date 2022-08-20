import { Button, message, Form, Input, InputNumber, Layout, Modal, Select } from "antd";
import React from "react";
import AcctInfo from "./AcctInfo";
import { uploadItem } from "../utils";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig.js";

const genreTypes = [
    { label: 'Clothes', value: 'Clothes' }, // remember to pass the key prop
    { label: 'Bags', value: 'Bags' }, 
    { label: 'Shoes', value: 'Shoes' }, 
    { label: 'Furnitures', value: 'Furnitures'}, 
    { label: 'Electronics', value: 'Electronics'}, 
    { label: 'Misc', value: 'Misc' } ];

class ItemUpload extends React.Component {

  
    uploadRef = React.createRef();
    

    state = { 
        loading: false, 
        displayModal: false,
        //percent: 0,
    };


    handleSubmit = async (values) => {
        const formData = new FormData();

        const { files } = this.uploadRef.current;
     
        if (files.length > 3) {
          message.error("You can upload at most 3 pictures.");
          return;
        }

        this.setState({loading: true,});

        // upload images files to firebase
        const uploadPromises =[];
        const urlPromises = [];
             
        for (let i = 0; i < files.length; i++) {

            const storageRef = ref(storage, `/files/${files[i].name}`)
        
            const uploadTask = uploadBytesResumable(storageRef, files[i]);
            uploadPromises.push(uploadTask);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // const curPercent = Math.round(
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // );
         
                    // // update progress
                    // //setPercent(percent);
                    // this.setState({
                    //     percent: curPercent})
                },
                (err) => console.log(err),
                 () => {
                    // download url
                   
                    const urlPromise = getDownloadURL(uploadTask.snapshot.ref);
                    // .then((fburl) => {
                    //     //console.log("completed uploading...")
                    //     console.log(`url-${i}:`);
                    //     console.log(fburl);                       
                    //     const obj = {url: `${fburl}`};  
                    //     return obj;
                    // });
                    urlPromises.push(urlPromise);                    
                }
            );            
          
        }

        // console.log(uploadPromises.length);
        // console.log(uploadPromises);
        // console.log(urlPromises.length);
        // console.log(urlPromises);
        await Promise.all(uploadPromises).then(async (resp)=>{
            console.log("upload resp:")
            console.log(resp);
            const urls = await Promise.all(urlPromises).then((urlResp) => {
                console.log("urlPromises:");
                console.log(urlPromises);
                console.log("urlResp:");
                console.log(urlResp);
                console.log("urlPromises end");
                return urlResp.join(',');
            });
            console.log("urls:");
            console.log(urls);
            formData.append("images", urls);           
            console.log("uploadPromises end");        
        })


            formData.append("product_name", values.Title);
            formData.append("price", values.Price);
            formData.append("genre_type", values.Category);
            formData.append("description", values.Description);
            console.log("formData append done");

            console.log("form data:");
            console.log(formData.get('product_name'));
            console.log(formData.get('price'));
            console.log(formData.get('genre_type'));
            console.log(formData.get('description'));
            console.log(formData.get('images'));
            message.info(formData.get('images'));
            
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

        console.log("Submit function end");

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
                disabled={this.state.loading}
                style={{maxWidth: 1000, margin: "auto"}}
            >

                <Form.Item name="Title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="Category" label="Category" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option options={genreTypes} />
                    </Select>
                </Form.Item>
                <Form.Item name="Description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
                </Form.Item>
                <Form.Item name="Picture" label="Pictures" rules={[{ required: true }]}>
                    <input type="file" accept="image/*" ref={this.uploadRef} multiple={true}/>
                </Form.Item>
                {this.state.loading? <div style={{color: 'red'}}>Uploading pictures ...</div> : <br />}
                <br />
                <Form.Item>
                    <Button shape="default" type="primary" htmlType="submit" loading={this.state.loading} style={{alignContent:'center'}}>
                        Submit
                    </Button>
                    
                </Form.Item>
            </Form>
        </Modal>    
        </>); 
    } 
}

export default ItemUpload;