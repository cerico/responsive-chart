import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#F3E5F5', '#7B1FA2'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <circle
          key={datum.title}
          cx={xScale(datum.title) + xScale.bandwidth() / 2}
          cy={yScale(datum.value) - 20}
          r="5"
          className="dot"
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}
