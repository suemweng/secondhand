import React, { useState, useEffect } from "react";
import { Button, Col, Layout, Menu, message, Row, Tooltip, List, Card } from 'antd';
import { getAllItems, searchItemsByGenreId } from "../utils";

import Shoes from '../assets/images/genre_photos/Shoes.webp';
import Bags from '../assets/images/genre_photos/Bags.jpeg';
import Clothes from '../assets/images/genre_photos/Clothes.jpeg';
import Furnitures from '../assets/images/genre_photos/Furnitures.webp';
import Electronics from '../assets/images/genre_photos/Electronics.jpeg';
import Misc from '../assets/images/genre_photos/Misc.png';


const { Content, Sider } = Layout;
const { Meta } = Card;
const menuItem = [  
  { label: 'Clothes', key: 'Clothes' }, 
  { label: 'Bags', key: 'Bags' }, 
  { label: 'Shoes', key: 'Shoes' }, 
  { label: 'Furnitures', key: 'Furnitures'}, 
  { label: 'Electronics', key: 'Electronics'}, 
  { label: 'Misc', key: 'Misc' } ];

function SearchPage ({list, onSuccess, itemSelected}) {

    const [loading, setLoading] = useState(false);

    const onItemSelect =  (itemId) => {
      setLoading(true);
  
      try {
        //const resp = await searchItemsByItemId(genreId);
        // setData(resp);
        itemSelected(itemId);
        //message.info(`Item selected: item ${itemId}`);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
  
    }

    const onGenreSelect = async ({key}) => {
      setLoading(true);

      try {
        const resp = await searchItemsByGenreId(key);
        // const resp = searchItemsByGenreId(key);
        //const resp = dataAll.filter((item) => item.genreId === key);
        onSuccess(resp);
        //message.info(`Category selected: ${key}`);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }

    }

    const renderCardImage = (item) => {
      if (item.images != null) {
        return <img alt="Product Picture" style={{ height: "100%" }} src={item.images[0]} />;
      }

      if (item.genre_type.genreType === "Clothes") {
        return <img alt="Genre Picture" style={{ height: "100%" }} src={Clothes}/>;
      }

      if (item.genre_type.genreType === "Shoes") {
        return <img alt="Genre Picture" style={{ height: "100%" }} src={Shoes}/>;
      }

      if (item.genre_type.genreType === "Bags") {
        return <img alt="Genre Picture" style={{ height: "100%" }} src={Bags}/>;
      }

      if (item.genre_type.genreType === "Furnitures") {
        return <img alt="Genre Picture" style={{ height: "100%" }} src={Furnitures}/>;
      }

      if (item.genre_type.genreType === "Electronics") {
        return <img alt="Genre Picture" style={{ height: "100%" }} src={Electronics}/>;
      }
      
      return (
          <>
              <img alt="Genre Picture" style={{ height: "100%" }} src={Misc}/>
          </>
      )
    }

    const renderCardGrid = (lsit) => {
      return (
          <List
              grid={{
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 3,
              }}
              dataSource={list}
              renderItem={item => (
                  <List.Item style={{ marginRight: '20px' }}>
                      {/* <Card
                          title={renderCardTitle(item)}
                      >
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <img
                                  alt="Placeholder"
                                  src={processUrl(item.thumbnail_url)}
                              />
                          </a>
                      </Card> */}
                      {/* <div  onClick={onItemSelect(item.itemId)}> */}
                      <div onClick={() => onItemSelect(item.product_id)}>
                        <Card
                            hoverable
                            style={{width: 300, padding: "10px"}}         
                            cover={
                              <div style={{overflow:"hidden", height: 360}}>
                                  {/* <img alt="Product Picture" style={{ height: "100%" }} src={item.image} /> */}
                                  {renderCardImage(item)}
                              </div>
                            } 
                          >
                            <Meta title={`${item.product_name} - $${item.price}`} description={item.description} />
                          </Card>
                        </div>
                  </List.Item>
              )}
          />
      )

    }

    return (
        <Layout>
        <Sider width={300} className="site-layout-background">
          
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                height: 400,
                overflow: 'auto',

              }}
          >
            <div style={{textAlign: 'left',fontWeight:"bold",fontSize:"15px"}}>
              Category
            </div>
              <Menu
              mode="inline"
              onSelect={onGenreSelect}
              style={{ marginTop: '10px' }}
              items={menuItem}
              //items={mapTopGamesToProps(topGames)}
              /> 

            
          </Content>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: 'auto'
            }}
          >
            {renderCardGrid(list)} 
          </Content>
        </Layout>
      </Layout>
    )
}

export default SearchPage;