import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const Img = styled.img`
  height: 250px;
  padding: 12px;
  width: 250px;
`;

const ProfileContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 3px 6px lightgray, 0 3px 6px;
  margin: 40px 40px;
  overflow: hidden;
  position: relative;

  @media (min-width: 1200px) {
    margin: 40px auto;
    width: 75%;
  }
`;

const ProfileContent = styled.div`
  display: inline-block;
  padding: 8px 24px;
  position: absolute;
  top: 0;

  @media (max-width: 800px) {
    position: relative;
  }
`;

class ProfileDetails extends React.Component {
  render() {
    const { data } = this.props;
    const bioContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique feugiat enim eget elementum. Pellentesque vitae dolor est. Suspendisse eget enim mattis purus pellentesque maximus sed sed eros.';

    return (
      <>
        <Header />
        {data && (
          <ProfileContainer>
            <Img src={data.picture.large} alt="Profile image" />
            <ProfileContent>
              <h1>
                {data.name.first} {data.name.last}
              </h1>
              <p>{data.dob.age} years old</p>
              <p>
                {data.location.city} {data.location.state}, {data.location.country}
              </p>
              <p>Bio: {bioContent}</p>
              <button disabled>Message user!</button>
            </ProfileContent>
          </ProfileContainer>
        )}
        {!data && <p>Error: Please return home to search for more profiles</p>}
      </>
    );
  }
}

export default ProfileDetails;
