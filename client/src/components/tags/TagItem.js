import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateSelectedTag } from '../../actions/tagActions';

const TagItem = ({ tag: { _id, name }, selectedTag, updateSelectedTag }) => {
  return (
    <div>
      <input
        type='radio'
        key={_id}
        checked={selectedTag === _id}
        onChange={() => updateSelectedTag(_id)}
      />
      <label htmlFor='name'>{name}</label>
    </div>
  );
};

///////////////////////////// propTypes //////////////////////////////////
TagItem.propTypes = {
  tag: PropTypes.object.isRequired
  // selectedTag: PropTypes.object.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  selectedTag: state.tag.selectedTag
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  updateSelectedTag: id => dispatch(updateSelectedTag(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagItem);
