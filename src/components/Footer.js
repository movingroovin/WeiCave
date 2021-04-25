import React from 'react';
import styled from "styled-components";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

const SiteFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: #3e4441;
  color: #f1defa
`;

const Icon = styled.div`
  font-size: 30px;
  margin: 0 10%;
`;

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
            <FaLinkedin />
          </Icon>
          <Icon>
            <FaGithub />
          </Icon>
        </FooterContainer>
      </SiteFooter>
    )
  };
  
  export default Footer;