import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { scaleBand, scaleLinear } from 'd3-scale'

// import data from '../../data'
import Axis from './Axis'
import Bars from './Bars'
import Circles from './Circles'
import Lines from './Lines'
import ResponsiveWrapper from './ResponsiveWrapper'

const data = [
  { title: 'January', value: 138 },
  { title: 'February', value: 152 },
  { title: 'March', value: 121 },
  { title: 'April', value: 136 },
  { title: 'May', value: 130 },
  { title: 'June', value: 128 },
  { title: 'July', value: 112},
  { title: 'August', value: 115 },
  { title: 'September', value: 123 },
  { title: 'October', value: 144 },
  { title: 'November', value: 147 },
  { title: 'December', value: 141 },
]

const full = { background: 'red' }
const side = { background: 'orange' }

const Div = styled.div`
  display: flex;
  ${props => props.direction && `flex-direction: ${props.direction};`}
  .full-tip {
    background-color: #fff;
    text-align: left;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.35);
    border-radius: 3px;
    margin-left: 30px;
    padding: 8px;
    ${props => props.toolwidth && `width: ${props.toolwidth - 30}px;`}
    .last-bill {
      text-align: right;
      div {
        display: inline;
        padding-right: 5px;
      }
    }
  }
  .side-tip {
    background: #FFFFFF;
    text-align: center;
    ${props => props.toolwidth && `width: ${props.toolwidth}px;`}
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.35);
    border-radius: 3px;
    order: 2;
    padding-top: 24px;
    height: 100%;
    padding-bottom: 24px;
    margin-top: 24px;
    .april { padding-bottom: 24px;}

    &:after {
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.35);
      transform: rotate(45deg);
    }
  }
  .april {
    font-family: Whitney SSm;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #2D3735;
  }
  .last-bill {
    font-family: Whitney SSm;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #E40000;
  }
`

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
    this.state = {
      xTooltip: null,
      yTooltip: null,
      t_opacity: null,
      // containerwidth: 200,
  }
  }

  mouseOut(e) {
    this.setState({
        xTooltip: null,
        yTooltip: null,
        t_opacity: null
    })
}

mouseOver(e) {
    this.setState({
        xTooltip: e.pageX,
        yTooltip: e.pageY,
        t_opacity: 1
    })
}

  render() {
    console.log(69, this.props.full)
    const margins = { top: 50, right: 20, bottom: 10, left: 60 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 200
    }

    const maxValue = Math.max(...data.map(d => d.value))

    const xScale = this.xScale
      .padding(0.2)
      .domain(data.map(d => d.title))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])
    
    const scales={ xScale, yScale }

    const xProps = {
      orient: 'Bottom',
      scale: scales.xScale,
      translate: `translate(0, ${svgDimensions.height - margins.bottom})`,
      tickSize: svgDimensions.height - margins.top - margins.bottom,
      tickValues: ([]),
    }
    
    const yProps = {
      orient: 'Left',
      scale: scales.yScale,
      translate: `translate(${margins.left}, 0)`,
      tickSize: '0px',
      tickValues: ([50, 100, 150]),
    }

    return (
      <Div toolwidth={this.props.toolTipContainerWidth} direction={this.props.full ? 'column' : 'width'}>
        <div className={this.props.full ? 'full-tip' : 'side-tip'} {...this.state}>
          <div className="april">April 2020</div>
          <div className="last-bill">
            <div>Your last bill</div>
            <div>£78.42</div>
          </div>
        </div>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <g>
            <Axis {...xProps} />
            <Axis {...yProps} />
          </g>
          <Bars
            scales={scales}
            margins={margins}
            data={data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
            onMouseOver={this.mouseOver.bind(this)}
            onMouseOut={this.mouseOut.bind(this)}
          />
          <Lines
            scales={scales}
            margins={margins}
            data={data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
          <Circles
            scales={scales}
            margins={margins}
            data={data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
          {/* <line x1="60" y1="190" x2={this.props.fullWidth} y2="190" style={{stroke: 'red'}}/> */}
        </svg>
      </Div>
    )
  }
}

export default ResponsiveWrapper(Chart)
