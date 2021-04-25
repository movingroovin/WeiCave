import * as React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import styled from 'styled-components';
import './../assests/style/General.scss'

// image
import profile from './../assests/img/IMG_2864.jpg';

const ProfileContainer = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 350px
  }
`;

const AboutPage = () => {
  return (
    <div className='wrapper'>
      <Header />
      <main>
        <title>About</title>
        <ProfileContainer>
          <Img src={profile} alt="Profile"/>
          <div>
            <h1>About Wei</h1>
            <p>Fullstack(Forntend) Engineer @ Taiwan</p>
            <p>Contact: finnbloo@gmail.com</p>
          </div>
        </ProfileContainer>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage;