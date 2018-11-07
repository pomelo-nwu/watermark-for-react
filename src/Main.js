import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Slider from "@material-ui/lab/Slider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { WaterMarkProvider, WaterMarkConsumer } from "watermark-for-react";
import "./index.css";
import Controller from "./Controller";

const styles = {
  root: {
    display: "block",
    width: "80%",
    padding: 20,
    margin: "20px auto"
  },
  color: {
    input: {
      width: "50%"
    },
    label: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "12px",
      marginBottom: "10px"
    }
  },
  demo: {
    height: "300px",
    lineHeight: "300px",
    fontSize: "20px",
    textAlign: "center"
  }
};
const INIT_STATE = {
  text: "你好世界 - hello world",
  color: "#ddd",
  rotate: 30,
  fontSize: 12,
  offsetX: 10,
  offsetY: 10
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "CHANGE_text":
      return {
        ...state,
        text: action.payload.text
      };
    case "CHANGE_offsetX":
      return {
        ...state,
        offsetX: action.payload.offsetX
      };
    case "CHANGE_offsetY":
      return {
        ...state,
        offsetY: action.payload.offsetY
      };
    case "CHANGE_rotate":
      return {
        ...state,
        rotate: action.payload.rotate
      };
    case "CHANGE_color":
      return {
        ...state,
        color: action.payload.color
      };
    case "CHANGE_fontSize":
      return {
        ...state,
        fontSize: action.payload.fontSize
      };

    default:
      return state;
  }
};
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = reducer(INIT_STATE, {});
  }
  dispatch = action => {
    this.setState(prevState => reducer(prevState, action));
  };
  handleChange = (type, value) => {
    //dispatch 也就是重新改变当前状态
    this.dispatch({
      type: `CHANGE_${type}`,
      payload: value
    });
  };

  render() {
    const { color, rotate, fontSize, offsetX, text, offsetY } = this.state;

    return (
      <div>
        <WaterMarkProvider
          text={text}
          options={{
            color,
            rotate,
            fontSize,
            offsetX,
            offsetY
          }}
        >
          <Paper elevation={1} style={styles.root}>
            <h3 style={{ textAlign: "center" }}>
              watermark-for-react props configuration
            </h3>

            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextField
                  label="水印文本"
                  style={{ width: "100%" }}
                  value={this.state.text}
                  onChange={e => {
                    this.handleChange("text", { text: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <div style={styles.color.label}>文本颜色</div>

                <input
                  type="color"
                  style={styles.color.input}
                  onChange={e => {
                    this.handleChange("color", { color: e.target.value });
                  }}
                />
                <span style={{ color: color, margin: "0px 5px" }}>{color}</span>
              </Grid>
            </Grid>

            <Controller
              title="options.offsetX"
              subTitle="在X轴上的偏移"
              value={offsetX}
              min={0}
              max={200}
              step={1}
              onChange={(e, val) => {
                this.handleChange("offsetX", { offsetX: val });
              }}
            />

            <Controller
              title="options.offsetY"
              subTitle="在Y轴上的偏移"
              value={offsetY}
              min={0}
              max={200}
              step={1}
              onChange={(e, val) => {
                this.handleChange("offsetY", { offsetY: val });
              }}
            />
            <Controller
              title="options.rotate"
              subTitle="逆时针旋转角度"
              unit="deg"
              value={rotate}
              min={0}
              max={50}
              step={1}
              onChange={(e, val) => {
                this.handleChange("rotate", { rotate: val });
              }}
            />
            <Controller
              title="options.fontSize"
              subTitle="字体大小"
              value={fontSize}
              min={12}
              max={100}
              step={1}
              onChange={(e, val) => {
                this.handleChange("fontSize", { fontSize: val });
              }}
            />
          </Paper>

          <Paper elevation={1} style={styles.root}>
            <WaterMarkConsumer>
              <div style={styles.demo}>watermark-for-react</div>
            </WaterMarkConsumer>
          </Paper>
        </WaterMarkProvider>
      </div>
    );
  }
}
export default hot(module)(Main);
