import React from 'react';
import PropTypes from 'prop-types';
import * as session from '../session';

class UpdateTeamNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      teamName: props.teamName,
      error: ''
    };
  }

  _handleUpdateInput(e) {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  }

  async _handleSubmit(e) {
    e.preventDefault();

    const { teamId, onUpdate } = this.props;
    const { teamName } = this.state;

    this.setState({ loading: true });

    try {
      await session.changeTeamName(teamId, teamName);
      await onUpdate();
    } catch (err) {
      alert(`Failed to update team: ${err.message}`);
    }

    this.setState({ loading: false });
  }

  render() {
    const { teamName } = this.props;
    const { loading, error } = this.state;
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <div className="form-row">
          <div className="form-control">
            <label>
              Team Name
              <input
                type="text"
                name="teamName"
                placeholder="Mud Dogs"
                defaultValue={teamName}
                onChange={this._handleUpdateInput.bind(this)}
                required
              />
            </label>
          </div>

          {error ? (
            <small className="form-control error">({error})</small>
          ) : null}

          <div className="form-control form-control--no-label width--auto">
            {loading ? (
              <button type="button" className="button" disabled>
                Updating...
              </button>
            ) : (
              <button type="submit" className="button">
                Update
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

UpdateTeamNameForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired
};

export default UpdateTeamNameForm;
