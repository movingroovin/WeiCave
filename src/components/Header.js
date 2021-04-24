import React from 'react'
import { Link } from 'gatsby';
import styled from "styled-components";

const SiteName = styled.span`
  font-size: 1.875rem;
  text-decoration: none;
`;

const SiteHeader = styled.header`
  margin: 0 5%;
  padding: 1rem 0;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: flex-start
`;

const NavLink = styled(Link)`
  margin: 10px;
`;

const Header = () => {
  return (
    <SiteHeader>
      <div>
        <Link to="/">
          {/* <SiteName>Rules of world</SiteName> */}
          <SiteName>wweiweiiweii</SiteName>
        </Link>
      </div>
      <div>
        <NavContainer>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Articles</NavLink>
        </NavContainer>
      </div>
    </SiteHeader>
  )
};

export default Header;