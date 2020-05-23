import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

// import data from '../../data'
import Axis from './Axis'
import Bars from './Bars'
import Circles from './Circles'
import Lines from './Lines'
import ResponsiveWrapper from './ResponsiveWrapper'

const data = [
  { title: 'January', value: 61 },
  { title: 'February', value: 52 },
  { title: 'March', value: 121 },
  { title: 'April', value: 156 },
  { title: 'May', value: 81 },
  { title: 'June', value: 44 },
  { title: 'July', value: 88},
  { title: 'August', value: 122 },
  { title: 'September', value: 91 },
  { title: 'October', value: 129 },
  { title: 'November', value: 112 },
  { title: 'December', value: 124 },
]


class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 500
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
      </svg>
    )
  }
}

export default ResponsiveWrapper(Chart)
