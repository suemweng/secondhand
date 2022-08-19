import React, { Component } from "react";
import { Descriptions, Carousel, Image, Card, List} from 'antd';
import {
    LeftCircleFilled,
    RightCircleFilled,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { CarouselData } from "./CarouselData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";



class ItemPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            paused: false,
        };
    }

    componentDidMount() {
        setInterval(() => {
          if (this.state.paused === false) {
            let newSlide =
              this.state.currentSlide === CarouselData.length - 1
                ? 0
                : this.state.currentSlide + 1;
            this.setState({ currentSlide: newSlide });
          }
        }, 3000);
    }

    nextSlide = () => {
        let newSlide =
          this.state.currentSlide === CarouselData.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
    };

    prevSlide = () => {
        let newSlide =
          this.state.currentSlide === 0
            ? CarouselData.length - 1
            : this.state.currentSlide - 1;
        this.setState({ currentSlide: newSlide });
    };
    
    setCurrentSlide = (index) => {
        this.setState({ currentSlide: index });
    };

    render() {
        const name = this.props.itemInfo.product_name;
        const price = this.props.itemInfo.price;
        const genre = this.props.itemInfo.genre_type.genreType;
        const description = this.props.itemInfo.description;
        const {email, phone, firstName, lastName, reviews} = this.props.itemInfo.user;


        return ( 
            <>
            <div style={{width:'50%', display:'flex', justifyContent:'center'}}>
                {/* <div className="max-w-lg h-72 flex overflow-hidden relative">
                    <AiOutlineLeft
                        onClick={this.prevSlide}
                        className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                    />

                    <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
                        {CarouselData.map((slide, index) => {
                            return (
                                <img
                                    src={slide.image}
                                    alt="This is a carousel slide"
                                    key={index}
                                    className={
                                        index === this.state.currentSlide
                                            ? "block w-full h-auto object-cover"
                                            : "hidden"
                                    }
                                    onMouseEnter={() => {
                                        this.setState({ paused: true });
                                    }}
                                    onMouseLeave={() => {
                                        this.setState({ paused: false });
                                    }}
                                />
                            );
                        })}
                    </Swipe>

                    <div className="absolute w-full flex justify-center bottom-0">
                        {CarouselData.map((element, index) => {
                            return (
                                <div
                                    className={
                                    index === this.state.currentSlide
                                        ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                                        : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                                    }
                                    key={index}
                                    onClick={() => {
                                        this.setCurrentSlide(index);
                                    }}
                                ></div>
                            );
                        })}
                    </div>

                    <AiOutlineRight
                        onClick={this.nextSlide}
                        className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                    />
                </div> */}
                <Card
                    style={{width:'80%', justifyItems:'center'}}
                >
                {
                    <Carousel autoplay
                    dots={true}
                    arrows={true}
                    speed={500}
                    prevArrow={<LeftCircleFilled />}
                    nextArrow={<RightCircleFilled />}
                    >
                        {CarouselData.map((slide, index) => (
                            <div key={index}>
                                <Image src={slide.url} width="100%" />
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
                    <Descriptions.Item label="Title"> {`${name}`}</Descriptions.Item>
                    <Descriptions.Item label="Price">{`$ ${price}`}</Descriptions.Item>
                    <Descriptions.Item label="Category">{genre}</Descriptions.Item>
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