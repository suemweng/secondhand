import { Button, Form, message, Descriptions, Avatar, List  } from "antd";
import React from "react";
import ItemUpload from "./ItemUpload";
import { dataAll } from "../testData";
import { getAllItems, getMyItems } from "../utils";

const testData = {
    username:'user123',
    firstName:'User',
    lastName:'123',
    email:'user123@gmail.com',
    phone:'123-456-888',
    review:[{
        id: 11,
        review_content: "review contents 2",
        created_at: "2022-08-14T23:21:47"
    },
    {
        id: 12,
        review_content: "review contents 1",
        created_at: "2022-08-14T23:21:57"
    }]
}



class AcctInfo extends React.Component {
    formRef = React.createRef();
    state = {
        loading: false,
        itemsList: [],
        user: null,
    };

    onFinish = () => {
        console.log("Completed!");
    };

    onClick = () => {
        return <ItemUpload />;
    }

    // DidMount to getAllItems
    componentDidMount() {
        //alert('component did mount');
        this.loadData();
    }

    loadData = async () => {
        //alert('loadData()');
        this.setState({
            loading: true,
        });

    
        try {
           // const resp = await getAllItems();
            const resp = await getMyItems();
         
            this.setState({
                itemsList: resp,
                user: resp[0].user,
            });
           // console.log(this.state.itemsList);
            //console.log(this.state.itemsList[0]);
          //  const item = this.state.itemsList[0];
            //console.log(this.state.user);
          // console.log(this.state.itemsList[0].user.username);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }

    };
               

    render() {

        const user = this.state.user;
        return (
            <>
            { user !== null ?
                <div style={{width: '100%', margin: "50px"}}>
                    {/* <Form
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
                    </Form> */}
                    <Descriptions title="Account Information" bordered>
                        <Descriptions.Item label="Username"> {user.username}</Descriptions.Item>
                        <Descriptions.Item label="Name"> {`${user.firstName} ${user.lastName}`}</Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
                        <Descriptions.Item label="Reviews">{user.reviews.length == 0 ? "(no review)" : user.reviews[0].review_content}</Descriptions.Item>
                    </Descriptions>
                {/* <Button
                    onClick={this.onClick}
                    disabled={this.state.loading}
                    shape="default"
                    type="primary"
                >
                    Add Item
                </Button> */}

                </div> : 
                <div style={{width: '100%', margin: "50px"}}>
                 <Descriptions title="Account Information" bordered></Descriptions>
                </div>
            }

            <div style={{
                    width: '100%', 
                    margin: "50px 100px", }}>
                <div style={{
                    width:'100%', 
                    display:'flex',
                    justifyContent:'flex-start'
                }}>
                
                <Descriptions title="Items Posted" bordered style={{
                    width: '80%', 
                   }}>
                   </Descriptions>
                   <ItemUpload />
                 </div>

                
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.itemsList}
                    style={{
                        width: '80%', 
                       }}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={item.image} />}
                        title={`Item ${item.product_id} - ${item.product_name}`}
                        description={item.description}
                        />
                    </List.Item>
                    )}
                />
                    {/* <ItemUpload /> */}
            </div>
            
            </>
        );
    }
}

export default AcctInfo;