import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { graphql } from 'react-apollo'
import { List, ListItem } from 'material-ui/List'
import LoadingIndicator from './LoadingIndicator'
import channelReadingsQuery from '../graphql/queries/readingsByChannel.graphql'
import { AxisLeft, AxisBottom } from '@vx/axis'

// temp imports
import { appleStock } from '@vx/mock-data'
import { scaleTime, scaleLinear } from '@vx/scale'
import { extent, max } from 'd3-array'
import { AreaClosed, LinePath } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { Group } from '@vx/group'
import { LinearGradient } from '@vx/gradient'

class HistoryChart extends Component {
  foo = (bar) => {
    console.log(bar)
  }
  makeChart = (chartData, yLab, invert=false) => {
    const data = chartData
    const width=1250
    const height = 300
    const margin = {
      top: 60,
      bottom: 60,
      left: 80, right: 80
    }

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const x = d => new Date(d.date)
    const y = d => d.value

    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x)
    })
    const yScale = scaleLinear({
      range: [yMax,0 ],
      // domain: extent(data, y)
      domain: [0, max(data, y)]
    })
    return (
      <div>
          <svg width={width} height={height}>
            <LinearGradient
              from='#fbc2eb'
              to='#a6c1ee'
              id='gradient'
            />
            <Group top={margin.top} left={margin.left}>
              <AreaClosed
                data={data}
                xScale={xScale}
                yScale={yScale}
                x={x}
                y={y}
                fill={"url(#gradient)"}
                stroke={""}
              />
              <AxisLeft
                scale={yScale}
                top={0}
                left={0}
                label={ yLab }
                stroke={'#1b1a1e'}
                tickTextFill={'#1b1a1e'}
              />

              <AxisBottom
                scale={xScale}
                top={yMax}
                label={'Date'}
                stroke={'#1b1a1e'}
                tickTextFill={'#1b1a1e'}
              />
            </Group>
          </svg>
        </div>
    )
  }
  render() {
    console.log(this.props)
    let { loading, readingDateRange } = this.props.channelReadingsQuery
    if ( loading ) {
      return <LoadingIndicator message="Loading chart" />
    }
    let chartData = []
    let readings = readingDateRange.map( (reading, idx ) => {
        let r = { 'date': reading.monitorTime, 'value': reading.finalValue }
        chartData.push(r)
    })

    let invert = this.props.channel.channelType.commonName === 'Signal Strength' ? true : false
    let chart = this.makeChart(chartData, this.props.channel.channelType.units.unitImperial, invert)
    return (
      <Grid style={{ paddingLeft: '0rem', paddingRight: '0rem'}} fluid>
        <Row>
          <Col sm={12}>
            <h3>{ this.props.channel.name }</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            { chart }
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default graphql(channelReadingsQuery, {
    name: 'channelReadingsQuery',
    options: ( props ) => ({
      variables: {
        channel: props.channel.id,
        startDate: props.startDate,
        endDate: props.endDate
      }
    })
  })(HistoryChart)
