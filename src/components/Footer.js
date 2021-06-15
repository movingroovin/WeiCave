import React from 'react';
import styled from "styled-components";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

const SiteFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 5%;
  background-color: #3e4441;
  color: #f1defa;
`;

const Icon = styled.div`
  font-size: 30px;
  margin: 0 10%;
`;

const IconLink = styled.a`
  color: #f1defa;
`

const FooterContainer = styled.nav`
  display: flex;
  justify-content: flex-start
`;

const Footer = () => {
  const nowYear = new Date().getFullYear();
    return (
      <SiteFooter>
        <div>
          Wei Chen © {nowYear}
        </div>
        <FooterContainer>
          <Icon>
            <IconLink href="https://github.com/movingroovin" target="_blank" rel="noreferrer" aria-label='GitHub'><FaLinkedin/></IconLink>
          </Icon>
          <Icon>
            <IconLink href="https://www.linkedin.com/in/cheng-wei-wei-chen-179a2a183/" target="_blank" rel="noreferrer" aria-label='LinkedIn'><FaGithub /></IconLink>
          </Icon>
        </FooterContainer>
      </SiteFooter>
    )
  };
  
  export default Footer;