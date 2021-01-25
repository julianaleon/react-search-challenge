import React from 'react';

export const ProfileContext = React.createContext({
  profiles: [],
});

function ProfilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case 'ascending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name.first > profileB.name.first ? 1 : -1));
      return { profiles };

    case 'descending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name.first < profileB.name.first ? 1 : -1));
      return { profiles };

    default:
      throw new Error();
  }
}

function ProfilesContextProvider({ children, profileData }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: profileData,
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
