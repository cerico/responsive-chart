import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['rgb(246, 246, 246)', 'rgb(246, 246, 246)'])
      .interpolate(interpolateLab)
  }

  triggerOut(e) {
    this.props.onMouseOut(e)
  }

  triggerOver(e) {
    const {
        xScale,
        yScale
    } = this.props

    this.props.onMouseOver(e, xScale, yScale)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.title}
          x={xScale(datum.title)}
          y={yScale(datum.value)}
          height={height - margins.bottom - scales.yScale(datum.value)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.value)}
          onClick={() => alert(datum.value)}
          onMouseOver={this.triggerOver.bind(this)}
          onMouseOut={this.triggerOut.bind(this)}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}
