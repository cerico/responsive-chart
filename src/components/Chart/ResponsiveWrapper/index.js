import React, { Component } from 'react'

export default ChartComponent => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
    }

    componentDidMount() {
      this.fitParentContainer()
      window.addEventListener('resize', this.fitParentContainer)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {
      const { containerWidth } = this.state
      const currentContainerWidth = this.chartContainer
        .getBoundingClientRect().width
        console.log(currentContainerWidth)

      const shouldResize = containerWidth !== currentContainerWidth

      let useThisWidth = currentContainerWidth >= 768 ? (currentContainerWidth * 0.8) : currentContainerWidth
      let toolTipContainerWidth = currentContainerWidth === useThisWidth ? (currentContainerWidth - 30) : ((currentContainerWidth * 0.2) - 30)
      let full = useThisWidth === currentContainerWidth 

      if (shouldResize) {
        this.setState({
          containerWidth: useThisWidth,
          toolTipContainerWidth: toolTipContainerWidth,
          full: full,
          fullWidth: containerWidth,
        })
      }
    }

    renderChart() {
      const parentWidth = this.state.containerWidth
      const toolTipContainerWidth = this.state.toolTipContainerWidth
      const full = this.state.full
      const fullWidth = this.state.fullWidth

      return (
        <ChartComponent {...this.props} fullWidth={fullWidth}  full={full} parentWidth={parentWidth} toolTipContainerWidth={toolTipContainerWidth} />
      )
    }

    render() {
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null

      return (
        <div
          ref={(el) => { this.chartContainer = el }}
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }
  }
)
