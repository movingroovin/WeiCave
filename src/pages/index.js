import * as React from 'react'
import { Link } from 'gatsby';
// import Header from './../components/Header'
// import Footer from './../components/Footer'
import './../assests/style/General.scss'
import './../assests/style/Index.scss'

const IndexPage = () => {
  return (
    <div className="container">
      <div className="inner-header">
        <div className="inner-header-icon">W</div>
        <div className="inner-header-content">
          <a className="inner-header-content-item" href="https://github.com/movingroovin" target="_blank" rel="noreferrer" aria-label='GitHub'>GITHUB</a>
          <a className="inner-header-content-item" href="https://www.linkedin.com/in/cheng-wei-wei-chen-179a2a183/" target="_blank" rel="noreferrer" aria-label='LinkedIn'>LINKEDIN</a>
        </div>
      </div>
      <div className="inner">
        <div className="main-name">
          <div className="main-name-item">Cheng Wei</div>
          {/* <div className="main-name-item">CHEN</div> */}
          {/* <div className="main-name-item">weii</div> */}
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