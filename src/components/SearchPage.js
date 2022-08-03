import React from "react";
import { Button, Col, Layout, Menu, message, Row, Tooltip, List, Card } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from "antd/lib/skeleton/Title";

const { Header, Content, Sider } = Layout;
const { Meta } = Card;
const menuItem = [  
  { label: 'Clothes', key: 'Clothes' }, // remember to pass the key prop
  { label: 'Bags', key: 'Bags' }, 
  { label: 'Shoes', key: 'Shoes' }, 
  { label: 'Books', key: 'Books' }, 
  { label: 'Misc', key: 'Misc' }, ];

  function SearchPage () {

  const processUrl = (url) => url
    .replace('%{height}', '480')
    .replace('%{width}', '480')
    .replace('{height}', '480')
    .replace('{width}', '480');

  const data = [
    {
      title:'item 1',
      thumbnail_url:'https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg'
    },
    {
      title:'item 2',
      thumbnail_url:'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-{width}x{height}.jpg'
    }
  ]
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

  const renderCardGrid = (data) => {
    return (
        <List
            grid={{
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
            }}
            dataSource={data}
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
                      <Card
                          hoverable
                          style={{width: 240,}}
                          cover={<img alt="example" src={processUrl(item.thumbnail_url)} />}
                        >
                          <Meta title={item.title} description="price" />
                        </Card>
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
            onSelect={() => { }}
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
          {/* {renderCardGrid(data)} */}
          {renderCardGrid(data)} 
        </Content>
      </Layout>
    </Layout>
  )
}

export default SearchPage;