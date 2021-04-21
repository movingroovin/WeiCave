import React from 'react'
import { Link } from 'gatsby';
import styled from "styled-components";

const SiteName = styled.div`
  font-size: 1.875rem;
  text-decoration: none;
`;

const SiteHeader = styled.header`
  padding: 1rem;
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
          <SiteName>Rules of world</SiteName>
        </Link>
      </div>
      <div>
        <NavContainer>
          <NavLink to="/blog">Posts</NavLink>
          <NavLink to="/about">About</NavLink>
        </NavContainer>
      </div>
    </SiteHeader>
  )
};

export default Header;