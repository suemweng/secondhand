import React, { Component } from "react";
import { Descriptions, Carousel, Image, Card, List} from 'antd';
import {
    CaretLeftOutlined,
    CaretRightOutlined,
    InfoCircleOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { CarouselData } from "./CarouselData";


import Shoes from '../assets/images/genre_photos/Shoes.webp';
import Bags from '../assets/images/genre_photos/Bags.jpeg';
import Clothes from '../assets/images/genre_photos/Clothes.jpeg';
import Furnitures from '../assets/images/genre_photos/Furnitures.webp';
import Electronics from '../assets/images/genre_photos/Electronics.jpeg';
import Misc from '../assets/images/genre_photos/Misc.png';

class ItemPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            //currentSlide: 0,
            paused: false,
        };
    }
    

    render() {

        const {product_name, price, genre_type, description, images} = this.props.itemInfo;
        const {email, phone, firstName, lastName, reviews} = this.props.itemInfo.user;

        if (images.length === 0) {
            if (genre_type.genreType == "Clothes") {
                images.push({image_url:Clothes});
            }

            if (genre_type.genreType == "Shoes") {
                images.push({image_url:Shoes});
            }

            if (genre_type.genreType == "Bags") {
                images.push({image_url:Bags});
            }

            if (genre_type.genreType == "Furnitures") {
                images.push({image_url:Furnitures});
            }

            if (genre_type.genreType == "Electronics") {
                images.push({image_url:Electronics});
            } 
            
            images.push({image_url:Misc});                     
        }

        return ( 
            <>
            <div style={{width:'50%', display:'flex', justifyContent:'center'}}>

                <Card
                    style={{width:'80%', justifyItems:'center'}}
                >
                {
                    <Carousel autoplay
                    dots={true}
                    arrows={true}
                    speed={500}
                    prevArrow={<CaretLeftOutlined />}
                    nextArrow={<RightOutlined />}
                    >
                        {images.map((slide, index) => (
                            <div key={index}>
                                <Image src={slide.image_url} width="100%" />
                            </div>
                        ))}
                    </Carousel>}
                </Card>
            </div>
            <div className="mt-8" style={{
                    width:'50%', 
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'space-around',
                    padding:'0px 30px'
                }}>
                <Descriptions title="Product Information" bordered>
                    <Descriptions.Item label="Title"> {product_name}</Descriptions.Item>
                    <Descriptions.Item label="Price">{`$ ${price}`}</Descriptions.Item>
                    <Descriptions.Item label="Category">{genre_type.genreType}</Descriptions.Item>
                    <Descriptions.Item label="Description">{description}</Descriptions.Item>
                </Descriptions>

                <Descriptions title="Seller Information" bordered>
                    <Descriptions.Item label="Seller Name"> {`${firstName} ${lastName}`}</Descriptions.Item>
                    <Descriptions.Item label="Email">{email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
                    <Descriptions.Item label="Reviews">
                        {reviews.length == 0 ? "(no review)" : 
                            <List
                                dataSource={reviews}
                                renderItem={review => (
                                    <List.Item>{review.review_content}</List.Item>
                                )}
                            />
                        }
                    </Descriptions.Item>
                </Descriptions>
            </div>
            </>
        );
    }
      
}

export default ItemPage;