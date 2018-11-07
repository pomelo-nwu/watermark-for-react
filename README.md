# watermark-for-react

English | [简体中文](./README-zh_CN.md)

>  A simple react component for watermark , [online-demo](https://pomelo-nwu.github.io/watermark-for-react/demo/)

# 1. Install

```sh
npm install --save watermark-for-react
```

# 2. Usage

```jsx
import React from 'react';
import {WaterMarkProvider} from 'watermark-for-react';
const text ='hello world' ;
const options ={};
 <WaterMarkProvider text={text} options={options}>
        <WaterMarkConsumer>
          text
        </WaterMarkConsumer>
 </WaterMarkProvider>
 
```
## options
