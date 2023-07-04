import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styleSheet from './table.module.css';

function Row(props) {
  return (<>
    {/* symbol: 'MAINIDX31AUG2316450PE',
    LTP: 1325,
    LTQ: 0,
    totalTradedVolume: 0,
    bestBid: 0,
    bestAsk: 0,
    bestBidQty: 0,
    bestAskQty: 0,
    openInterest: 0,
    timestamp: '09:16:00',
    prevClosePrice: 0,
    prevOpenInterest: 0,
    strikePrice: 16450,
    expiryDate: '2023-08-31',
    impliedVolatility: 7.888609052210118e-32 */}
        <TableRow>
        <TableCell id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{props.originalDataFrame ? props.originalDataFrame.openInterest?props.originalDataFrame.openInterest:"-" : "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{props.originalDataFrame ?  props.originalDataFrame.totalTradedVolume?props.originalDataFrame.totalTradedVolume:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{props.originalDataFrame ? props.originalDataFrame.impliedVolatility?props.originalDataFrame.impliedVolatility:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.prevClosePrice:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.prevOpenInterest:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.bestBid:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.bestAsk:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.bestBidQT:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.bestAskQTY:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.LTP:"-": "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.LTQ:"-": "no data"}</TableCell>
{/* 
        <TableCell   id={styleSheet.tableBodyCell} align="center"   size="small" >{props.originalDataFrame.strikePrice}</TableCell>

        <TableCell  id={styleSheet.tableBodyCell} align="center"size="small"  hover={true}>{props.originalDataFrame ? props.originalDataFrame.lastPrice?props.originalDataFrame.lastPrice:'-': "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{props.originalDataFrame ? props.originalDataFrame.impliedVolatility?props.originalDataFrame.impliedVolatility:'-': "no data"}</TableCell>
        <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{props.originalDataFrame ? props.originalDataFrame.totalTradedVolume?props.originalDataFrame.totalTradedVolume:'-': "no data"}</TableCell>
        <TableCell id={styleSheet.tableBodyCell}  align="center"size="small" hover={true}>{props.originalDataFrame ? props.originalDataFrame.openInterest?props.originalDataFrame.openInterest:'-': "no data"}</TableCell> */}
      
       
        </TableRow>

      </>
  )
}

export default Row