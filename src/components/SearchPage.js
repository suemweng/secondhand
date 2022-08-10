import React, { useState, useEffect } from "react";
import { Button, Col, Layout, Menu, message, Row, Tooltip, List, Card } from 'antd';

import item1 from '../assets/images/item1.webp';
import item2 from '../assets/images/item2.jpeg';
import item3 from '../assets/images/item3.jpeg';
import { getAllItems, searchItemsByGenreId } from "../utils";


const { Content, Sider } = Layout;
const { Meta } = Card;
const menuItem = [  
  { label: 'Clothes', key: 'Clothes' }, // remember to pass the key prop
  { label: 'Bags', key: 'Bags' }, 
  { label: 'Shoes', key: 'Shoes' }, 
  { label: 'Books', key: 'Books'}, 
  { label: 'Misc', key: 'Misc' } ];

  function SearchPage ({list, onSuccess}) {

    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState([]);

    const dataAll = [
      {
        itemId: 1,
        genreId: 'Shoes',
        title:'item 1',
        image: item1
      },
      {
        itemId: 2,
        genreId: 'Bags',
        title:'item 2',
        image: item2
      },
      {
        itemId: 3,
        genreId: 'Clothes',
        title:'item 3',
        image: item3
      }
    ]

    useEffect(() =>{
      setLoading(true);

      try {
        //const resp = await getAllItems();
        // onSuccess(resp);
        onSuccess(dataAll);

      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }

    },[]);

    const onItemSelect = async (itemId) => {
      setLoading(true);
  
      try {
        //const resp = await searchItemsByItemId(genreId);
        // setData(resp);
        message.info(`Item selected: item ${itemId}`);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
  
    }

  const onGenreSelect = async ({key}) => {
    setLoading(true);

    try {
      //const resp = await searchItemsByGenreId(key);
      // setData(resp);
      const resp = dataAll.filter((item) => item.genreId === key);
      onSuccess(resp);
      message.info(`Category selected: ${key}`);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }

  }

  const renderCardTitle = (item) => {
    const title = `${item.title}`;

    return (
        <>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 450 }}>
                <Tooltip title={title}>
                    <span>{title}</span>
                </Tooltip>
            </div>
        </>
    )
  }

  const renderCardGrid = (lsit) => {
    return (
        <List
            grid={{
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
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
                    <div onClick={() => onItemSelect(item.itemId)}>
                      <Card
                          hoverable
                          style={{width: 300}}         
                          cover={
                            <div style={{overflow:"hidden", height: 360}}>
                                <img alt="example" style={{ height: "100%" }} src={item.image} />
                            </div>
                          } 
                        >
                          <Meta title={item.title} description="price" />
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
             Categories
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