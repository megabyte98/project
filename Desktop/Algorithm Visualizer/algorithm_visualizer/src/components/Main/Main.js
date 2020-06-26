import React, { Component } from "react"
import Node from "../Node/Node"

const start_Node_row = 10
const start_Node_col = 10
const finish_Node_row = 10
const finish_Node_col = 40

const getInitialGrid = () => {
  const grid = []
  for (let i = 0; i < 20; i++) {
    const currentRow = []
    for (let j = 0; j < 50; j++) {
      currentRow.push(createNode(i, j))
    }
    grid.push(currentRow)
  }
  return grid
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: start_Node_row === row && start_Node_col === col,
    isFinish: finish_Node_col === col && finish_Node_row === row,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  const newNode = {
    ...node,
    isWall: !node.isWall,
  }
  newGrid[row][col] = newNode
  return newGrid
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      mouseIsPressed: false,
    }
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
    this.setState({ grid: newGrid })
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
    this.setState({ grid: newGrid })
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false })
  }

  componentDidMount() {
    const grid = getInitialGrid()
    this.setState({ grid })
  }

  render() {
    const { grid, mouseIsPressed } = this.state
    return (
      <div className="container">
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
