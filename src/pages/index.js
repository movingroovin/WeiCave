import * as React from 'react'
import { Link } from 'gatsby';
// import Header from './../components/Header'
// import Footer from './../components/Footer'
import './../assests/style/General.scss'
import './../assests/style/Index.scss'

const IndexPage = () => {
  return (
    <div className="container">
      <div className="inner">
        <div className="main-name">
          <div className="main-name-item">Cheng Wei</div>
          {/* <div className="main-name-item">weei</div>
          <div className="main-name-item">weii</div> */}
        </div>
      </div>
      <div className="tags">
          <div className="tag-name"># JavaScript/React/Vue</div>
          <div className="tag-name"># C#/Python</div>
          <div className="tag-name"># SQL Server</div>
          <div className="tag-name"># Tableau</div>
          <div className="go-button"> <Link to='/blog'>go my blog</Link></div>
      </div>
    </div>
  )
}

export default IndexPage;