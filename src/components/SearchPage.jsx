import React from 'react';
import { ProfileContext } from './ProfilesContextProvider';
import MinimalButton from './MinimalButton';
import Header from './Header';
import SearchCard from './SearchCard';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SearchMargin = styled.div`
  margin: 24px;
`;

class SearchPage extends React.Component {
  static contextType = ProfileContext;

  handleSortAscending = () => {
    this.context.dispatch({ type: 'ascending' });
  };

  handleSortDescending = () => {
    this.context.dispatch({ type: 'descending' });
  };

  handleToggleRefresh = (event) => {
    this.props.toggleRefresh(event.target.checked);
  };

  render() {
    const { autoRefresh, timer } = this.props;
    const { profiles = [] } = this.context;

    return (
      <React.Fragment>
        <Header autoRefresh={autoRefresh} timer={timer} />

        <SearchMargin>
          <Controls>
            <FormControlLabel
              control={
                <Switch
                  checked={autoRefresh}
                  onChange={this.handleToggleRefresh}
                  color="primary"
                  name="refreshSwitch"
                />
              }
              label="Auto Refresh"
            />
            <MinimalButton disabled>
              <img src="filter.svg" width={22} alt="filter" />
            </MinimalButton>

            <MinimalButton onClick={this.handleSortAscending}>
              <img src="./ascending.svg" width={22} alt="Sort ascending" />
            </MinimalButton>

            <MinimalButton onClick={this.handleSortDescending}>
              <img src="./descending.svg" width={22} alt="Sort descending" />
            </MinimalButton>
          </Controls>

          <Grid>
            {profiles.map((profile) => (
              <SearchCard
                key={profile.id.value}
                photoUrl={profile.picture.large}
                handle={profile.name.first}
                location={profile.location.city}
                age={profile.dob.age}
                photoCount={1}
                openProfile={() => this.props.openProfile(profile)}
              />
            ))}
          </Grid>
        </SearchMargin>
      </React.Fragment>
    );
  }
}

export default SearchPage;
