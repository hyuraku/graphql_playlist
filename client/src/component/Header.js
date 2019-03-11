import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <ul>
            <li>
              <Link to="/" className="ml1 no-underline black">
                Home
              </Link>
            </li>
            <li>
              <Link to="/author" className="ml1 no-underline black">
                Author
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
