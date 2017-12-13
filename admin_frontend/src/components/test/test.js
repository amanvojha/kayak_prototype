import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Test extends React.Component {

  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    initialLayout: generateLayout()
  };

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: {lg: this.props.initialLayout},
  };

  componentDidMount() {
    this.setState({mounted: true});
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? 'static' : ''}>
        {i==1 ?
          <img src="/assets/images/1.png"/> : null
        }{i==2 ?
          <img src="/assets/images/2.png"/> : null
        }{i==3 ?
          <img src="/assets/images/3.png"/> : null
        }{i==4 ?
          <img src="/assets/images/4.png"/> : null
        }{i==5 ?
          <img src="/assets/images/5.png"/> : null
        }{i==6 ?
          <img src="/assets/images/6.png"/> : null
        }{i==7 ?
          <img src="/assets/images/7.png"/> : null
        }{i==8 ?
          <img src="/assets/images/8.png"/> : null
        }
          
        </div>);
    });
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onCompactTypeChange = () => {
    const {compactType: oldCompactType} = this.state;
    const compactType = oldCompactType === 'horizontal' ? 'vertical' :
                        oldCompactType === 'vertical' ? null : 'horizontal';
    this.setState({compactType});
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
    this.setState({
      layouts: {lg: generateLayout()}
    });
  };

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}



function generateLayout() {
  return _.map(_.range(0, 8), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: _.random(0, 5) * 2 % 12,
      y: Math.floor(i / 6) * y,
      w: 5,
      h: 8,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

/*if (require.main === module) {
  require('../test-hook.jsx')(module.exports);
}*/

export default (Test);
