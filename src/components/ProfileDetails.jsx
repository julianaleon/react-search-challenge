import React from 'react';
import Header from './Header';

class ProfileDetails extends React.Component {
  render() {
    const { dob, location, name, picture } = this.props.data;
    const bioContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique feugiat enim eget elementum. Pellentesque vitae dolor est. Suspendisse eget enim mattis purus pellentesque maximus sed sed eros.';

    return (
      <>
        <Header />
        {this.props.data.picture && (
          <div
            style={{
              border: '1px solid lightgray',
              borderRadius: '8px',
              boxShadow: '0 3px 6px lightgray, 0 3px 6px',
              margin: '40px 40px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              style={{
                height: '250px',
                width: '250px',
                padding: '12px',
              }}
              src={picture.large}
              alt="Profile image"
            />
            <div
              style={{
                display: 'inline-block',
                padding: '8px 24px',
                position: 'absolute',
                top: 0,
              }}
            >
              <h1>
                {name.first} {name.last}
              </h1>
              <p>{dob.age} years old</p>
              <p>
                {location.city} {location.state}, {location.country}
              </p>
              <p>Bio: {bioContent}</p>
              <button disabled>Message user!</button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ProfileDetails;
