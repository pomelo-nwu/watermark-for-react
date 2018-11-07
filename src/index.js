import React from "react";
import PropTypes from "prop-types";
const { Consumer, Provider } = React.createContext("");

const shallowCompare = (newObj, prevObj) => {
  for (let key in newObj) {
    if (newObj[key] !== prevObj[key]) return true;
  }
  return false;
};
const propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.any
};

class WaterMarkProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }
  componentDidMount() {
    this.drawerWatermark(this.props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.text !== this.props.text ||
      shallowCompare(nextProps.options, this.props.options)
    ) {
      this.drawerWatermark(nextProps);
    }
  }

  drawerWatermark = props => {
    const canvas = document.createElement("canvas");
    const defaultOptions = {
      rotate: 30,
      color: "rgba(0, 0, 0, 0.1)",
      width: 200,
      height: 120,
      fontSize: 12,
      fontAjust: 1.2,
      offsetX: 0,
      offsetY: 0
    };
    const { text, options = defaultOptions } = props;
    const {
      rotate = defaultOptions.rotate,
      color = defaultOptions.color,
      width = defaultOptions.width,
      height = defaultOptions.height,
      fontSize = defaultOptions.fontSize,
      fontAjust = defaultOptions.fontAjust,
      offsetX = defaultOptions.offsetX,
      offsetY = defaultOptions.offsetY
    } = options;
    const ctx = canvas.getContext("2d");
    const textLength = text.length * fontSize * fontAjust;
    const rotatePI = (Number(rotate) / 180) * Math.PI;
    const calcWidth = parseInt(textLength * Math.cos(rotatePI)) + offsetX;
    const calcHeight = parseInt(textLength * Math.sin(rotatePI)) + offsetY;

    const textAlign = {
      x: 0,
      y: calcHeight
    };

    canvas.width = calcWidth;
    canvas.height = calcHeight;

    if (!canvas.getContext) {
      //你的浏览器不支持canvas!
      return;
    }

    ctx.font = `${fontSize}px serif`;
    ctx.rotate((-`${rotate}` * Math.PI) / 180); // 逆时针方向
    ctx.fillStyle = color;
    ctx.fillText(`${text}`, textAlign.x, textAlign.y);
    const url = ctx.canvas.toDataURL();
    this.setState({
      url
    });
  };

  render() {
    return <Provider value={this.state.url}>{this.props.children}</Provider>;
  }
}
WaterMarkProvider.propTypes = propTypes;

const WaterMarkConsumer = props => {
  return (
    <Consumer>
      {url => {
        return React.cloneElement(props.children, {
          ...props,
          style: Object.assign({}, props.style, {
            backgroundImage: `url(${url})`,
            backgroundRepeat: "repeat"
          })
        });
      }}
    </Consumer>
  );
};

export { WaterMarkProvider, WaterMarkConsumer, Consumer };
