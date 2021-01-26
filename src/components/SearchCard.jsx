import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Note - We could also pull these styles out into a seperate file
// and then export them in for usage, depending on our perference.
const Avatar = styled.div`
  cursor: pointer;
  position: relative;
  width: 200px;
  height: 200px;
`;

const AvatarContent = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  border-radius: inherit;
  overflow: hidden;
`;

const BottomRow = styled.div`
  display: flex,
  justify-content: space-between;
  align-items: baseline;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardShadow = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  box-shadow: 0 3px 6px lightgray, 0 3px 6px;
  overflow: hidden;
`;

const ContentLayout = styled.div`
  margin: 8px;
  display: flex;
  justifuy-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const ContentStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
`;

const Img = styled.img`
  height: 200px;
  width: 200px;
`;

const Name = styled.h6`
  font-size: 16px;
`;

const NameLayout = styled.div`
  display: flex;
  margin-bottom: 4px;
  align-items: center;
`;

const PhotoCount = styled.div`
  margin-right: 4px;
`;

const RightContent = styled.div`
  display: inline-block;
  height: 15px;
`;

export default class Search extends React.PureComponent {
  render() {
    const {
      photoUrl = '',
      handle = '',
      location = '',
      age = 99,
      photoCount = 0,
      openProfile,
    } = this.props;

    return (
      <Card>
        <CardShadow>
          <Link to="/profile">
            <Avatar onClick={openProfile}>
              <Img src={photoUrl} alt="potential date" />
              <AvatarContent>
                <ContentLayout>
                  <ContentStyle>
                    <Name>
                      <NameLayout>{handle}</NameLayout>
                    </Name>
                    <BottomRow>
                      <LeftContent>
                        <span>{location ? `${age} • ${location}` : age}</span>
                      </LeftContent>
                      <RightContent>
                        {photoCount > 1 && (
                          <PhotoCount>
                            <span color="white">{photoCount}</span>
                          </PhotoCount>
                        )}
                      </RightContent>
                    </BottomRow>
                  </ContentStyle>
                </ContentLayout>
              </AvatarContent>
            </Avatar>
          </Link>
        </CardShadow>
      </Card>
    );
  }
}
