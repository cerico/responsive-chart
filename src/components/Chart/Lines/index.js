import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'
import * as d3 from 'd3'

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
    console.log(data)
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const path = d3.line()
      .x((d) => xScale(d.title) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.value) - 20)
      .curve(d3.curveMonotoneX);

    const bars = (
      <path
        className="line"
        d={path(data)}
      />
    )

    return (
      <g>{bars}</g>
    )
  }
}
